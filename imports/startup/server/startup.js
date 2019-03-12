import { Meteor } from 'meteor/meteor';
import { oauthClients } from '../../api/collection.js';

Meteor.startup(function () {
  // ajout communecter config client
  if (!oauthClients.findOne(Meteor.settings.sso._id)) {
    // const CLIENT_ID = '4JZxkcThcKT5FHJnk';
    // const CLIENT_SECRET = 'qkdWS8jJjVzQR5gHUFRikX10SHxVjiOv3vZGAZkSnvl';
    // const REDIRECT_URI = 'http://communecter.org/connect/co/oauth';
    // const AUTH_URI = 'http://localhost:3000/oauth/authorize';
    // const TOKEN_URI = 'http://localhost:3000/oauth/token';
    // grant_type=authorization_code
    oauthClients.insert({
      _id: Meteor.settings.sso._id,
      name: Meteor.settings.sso.name,
      active: true,
      clientId: Meteor.settings.sso.clientId,
      clientSecret: Meteor.settings.sso.clientSecret,
      redirectUri: Meteor.settings.sso.redirectUri,
    });
  }
});
