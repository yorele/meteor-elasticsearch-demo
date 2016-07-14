Template.aggregation.onCreated(function(){
    let self = this;
    self.names = new ReactiveVar([]);
    self.autorun(function(){
        Meteor.call('aggregation',function(err, result) {
            if (result) {
                self.names.set(result);
            }
        })
    })

});

Template.aggregation.helpers({
    'names': function(){
        return Template.instance().names.get()
    }
});