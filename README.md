# Elasticsearch and Meteor

## Fuzzy search: using Elasticsearch as a search backend for Meteor

# Elasticsearch

Elasticsearch is a mature noSQL database with powerful full text search capability
- Powered by Apache Lucene
- Supports RegEx, Lucene and various parametrable fuzzy search methods

MongoDB is not so suited for fuzzy search:
### Fuzzy search and data export from MongoDB to ES:
http://blog.mongodb.org/post/95839709598/how-to-perform-fuzzy-matching-with-mongo-connector

# Easy:search meteor package

- Provides a way to do fuzzy search in Elasticsearch
- Suggestion and type ahead templates


github: https://github.com/matteodem/meteor-easy-search
docs: http://matteodem.github.io/meteor-easy-search/
es plugin: https://github.com/matteodem/meteor-easy-search/tree/master/packages/easysearch:elasticsearch

# 

### Elasticsearch: fuzziness documentation:
https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness

### import bulk data into meteor mongo with shell:

```javascript
use meteor
var file = cat('private/first_last.json');
var json = JSON.parse(file);
db.names.insert(json)
```

### Notes:

```shell
# install easysearch package:
meteor add easy:search

# install elasticsearch plugin
meteor add easysearch:elasticsearch

# remove autopublish, otherwise the whole dataset will be pushed to the client automatically.
meteor remove autopublish
```

