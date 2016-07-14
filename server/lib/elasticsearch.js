var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: "localhost:9200", //process.env.ELASTICSEARCH_URL,
    log: 'info'
});

var search = function search(query, callback) {
    return (client.search(query, callback));
};

module.exports = {
    search: search
};