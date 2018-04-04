import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
});


Router.map(function() {

  this.route('home', {
    template: 'home',
    path: '/',
    loadingTemplate: 'loading',
  });

  this.route('authorize', {
    template: 'authorize',
    path: '/oauth/authorize',
    loadingTemplate: 'loading',
    data: function () {
      return {
      client_id: this.params.query.client_id,
			redirect_uri: this.params.query.redirect_uri,
			response_type: this.params.query.response_type,
			state: this.params.query.state,
      }
    }
  });

  this.route('oauth404', {
    template: 'oauth404',
    path: '/oauth/error/:error',
    loadingTemplate: 'loading',
    data: function () {
      return {
        error: this.params.error,
      }
    }
  });

});
