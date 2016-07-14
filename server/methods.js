var engine = require('./lib/elasticsearch');

Meteor.methods({
    'search': function (searchString) {

        let query = {
            "index": "easysearch",
            "type": "names3000",
            body: {
                "size": 20,
                "_source": ['first', 'last', 'full'],
                query: {
                    "filtered": {
                        "query": {
                            bool: {
                                should: [
                                    {"wildcard": {"full": "*" + searchString + "*"}},
                                    {
                                        "match": {
                                            "full": {
                                                "query": searchString,
                                                //"operator": "and",
                                                "zero_terms_query": "all",
                                                "fuzziness": "AUTO"
                                            }
                                        }
                                    }
                                ]
                            }
                            //match_all: {}   //Will be replaced by searchString query if exists
                        }
                    }
                },
                "sort": ["_score", "full"]
            }
        };

        let async_search = Async.wrap(engine.search, engine);
        let results      = async_search(query);

        if (results && results.hits && results.hits.hits) {
            var data = [];
            results.hits.hits.forEach(function (r) {
                data.push(r['_source']);
            });
        }
        return data;
    },
    'aggregation': function () {

        var query = {
            index: "easysearch",
            type: 'names', //the full 150k names
            body: {
                "size": 0,
                _source: ["first"],
                query: {
                    "filtered": {
                        "query": {match_all: {}}
                    }
                },
                "aggregations": {
                    "by_first_name": {
                        "terms": {
                            "field": "first",
                            "size": 20,
                            "order" : { "_count" : "desc" }
                        }
                    }
                }
            }
        };


        let async_search = Async.wrap(engine.search, engine);
        let results      = async_search(query);

        if (results) {
            var buckets = results.aggregations['by_first_name'].buckets;
            var data    = [];
            buckets.forEach(function (bucket) {
                data.push({name: bucket.key, count: bucket.doc_count});
            });
        }
        return data;
    }
});