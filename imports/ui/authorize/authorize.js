import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
// localStorage
import { Router } from 'meteor/iron:router';
import { $ } from 'meteor/jquery';

import { oauthClients } from '../../api/collection.js';
import { pageSession } from '../../api/client/reactive.js';

import '../login/login.js';
import './authorize.html';

Template.authorize.onCreated(function () {
  const data = Router.current().params.query;
  console.log(data);
  this.subscribe('authorizedOAuth');
  this.subscribe('oauthClient', data.client_id);
  pageSession.set('viewlog', 'login');
});

// Get the login token to pass to oauth
// This is the best way to identify the logged user
Template.authorize.helpers({
  getToken () {
    return localStorage.getItem('Meteor.loginToken');
  },
  getClient: function () {
    return oauthClients.findOne();
  },
  viewlog() {
    return pageSession.get('viewlog');
  },
});

Template.authorize.events({
  'click #logout-oauth' () {
    return Meteor.logout();
  },
  'click #cancel-oauth' () {
    return window.close();
  }
});

// Auto click the submit/accept button if user already
// accepted this client
Template.authorize.onRendered(function () {
  // const data = Router.current().params.query;
  console.log(this.data);
 /* this.autorun(function (c) {
    const user = Meteor.user();
    if (user && user.oauth && user.oauth.authorizedClients && user.oauth.authorizedClients.indexOf(data.client_id) > -1) {
      c.stop();
      $('button').click();
    }
  }); */

  this.autorun(c => {
    const user = Meteor.user();
    if (user && user.oauth && user.oauth.authorizedClients && user.oauth.authorizedClients.includes(this.data.client_id)) {
      c.stop();
      
      Meteor.setTimeout(() => {
        $("#form").submit();
      }, 2000);
    }
  });
});

