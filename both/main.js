Names = new Mongo.Collection('names3000');

NamesIndex = new EasySearch.Index({
    collection: Names,
    fields: ['full'],
    engine: //new EasySearch.Minimongo()  // without elasticsearch
        new EasySearch.ElasticSearch({
            client: {
                host: 'localhost:9200',  // this is the default, but inserted here so it's clear where elasticsearch is hosted
                log: 'info'
            },
            sort: function sort(searchObject, options) {
                return ["_score", "full"];    // sorting on _score, the field generated by elasticsearch
            },
            query: function query(searchObject, options) {

                var query = {
                    "filtered": {
                        //"filter": {                // use filter to query specific fields, without scoring
                        //    bool: {
                        //        should: []
                        //    }
                        //},
                        "query": {
                            bool: {
                                should: []
                            }   //Will be replaced by searchString query if exists
                        }
                    },
                    //"sort": ["_score"]
                };

                _.each(searchObject, function (searchString, field) {
                    var q     = {};
                    var q2    = {};
                    q[field]  = "*" + searchString + "*";
                    q2[field] = {
                        "query": searchString,
                        //"operator": "and",
                        "zero_terms_query": "all",
                        "fuzziness": "AUTO"
                    };
                    query.filtered.query.bool.should.push({
                        "wildcard": q
                    });
                    query.filtered.query.bool.should.push({
                        "match": q2
                    });
                });
                //console.log(JSON.stringify(query));
                return query;
            }
        })
});