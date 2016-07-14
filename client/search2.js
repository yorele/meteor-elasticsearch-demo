Template.search2.onCreated(function(){
    this.names = new ReactiveVar([]);
});

Template.search2.helpers({
    names: function() {
        return Template.instance().names.get();
    }
});

Template.search2.events({
    'keyup input#es_search': function(e,t) {
        let value = e.currentTarget.value;
        Meteor.call('search', value,function(err, result) {
            if (result) {
                t.names.set(result);
            }
        })
    }
});