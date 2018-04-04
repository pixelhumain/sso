import { Meteor } from 'meteor/meteor';
import { oauthClients } from '../../api/collection.js';

Meteor.startup(function () {
  // ajout communecter config client
  if (!oauthClients.findOne('communecter')) {
    // const CLIENT_ID = '4JZxkcThcKT5FHJnk';
    // const CLIENT_SECRET = 'qkdWS8jJjVzQR5gHUFRikX10SHxVjiOv3vZGAZkSnvl';
    // const REDIRECT_URI = 'http://communecter.org/connect/co/oauth';
    // const AUTH_URI = 'http://localhost:3000/oauth/authorize';
    // const TOKEN_URI = 'http://localhost:3000/oauth/token';
    // grant_type=authorization_code
    oauthClients.insert({
      _id: 'communecter',
      name: 'communecter',
      active: true,
      clientId: '4JZxkcThcKT5FHJnk',
      clientSecret: 'qkdWS8jJjVzQR5gHUFRikX10SHxVjiOv3vZGAZkSnvl',
      redirectUri: 'http://localhost:3003/_oauth/oidc',
    });
  }
});