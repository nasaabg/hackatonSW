Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('game', {
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {

                alert("Zaloguj się!");
                pause();
            }
        }
    });
    this.route('results');
});