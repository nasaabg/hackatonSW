Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('game', {
        onBeforeAction: function(pause) {
            if(!Meteor.loggingIn() && !Meteor.user()){
                alert("Zaloguj się!");
                pause();   
            }
        }
    });
    this.route('results');
});