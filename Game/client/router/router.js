Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {
        path: '/'
    });
    this.route('game', {
        onBeforeAction: function(pause) {
            if(!Meteor.user()){
                pause();   
            }
        }
    });
    this.route('results');
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});