import { Meteor } from 'meteor/meteor';
import { OAuth2Server } from 'meteor/rocketchat:oauth2-server';
import { oauthClients } from '../collection.js';

const oauth2server = new OAuth2Server({
  // You can change the collection names, the values
  // below are the default values.
  accessTokensCollectionName: 'oauth_access_tokens',
  refreshTokensCollectionName: 'oauth_refresh_tokens',
  clientsCollection: oauthClients,
  authCodesCollectionName: 'oauth_auth_codes',
  // You can pass the collection object too
  // accessTokensCollection: new Meteor.Collection('custom_oauth_access_tokens'),
  // refreshTokensCollection: new Meteor.Collection('custom_oauth_refresh_tokens'),
  // clientsCollection: new Meteor.Collection('oauth_clients'),
  // authCodesCollection: new Meteor.Collection('custom_oauth_auth_codes'),
  // You can enable some logs too
  debug: true,
});

// Add the express routes of OAuth before the Meteor routes
WebApp.rawConnectHandlers.use(oauth2server.app);

oauth2server.routes.get('/oauth/userinfo', function (req, res) {
  if (req.headers.authorization == null) {
    return res.sendStatus(401).send('No token');
  }
  const accessToken = req.headers.authorization.replace('Bearer ', '');
  const token = oauth2server.oauth.model.AccessTokens.findOne({
    accessToken
  });
  if (token == null) {
    return res.sendStatus(401).send('Invalid Token');
  }
  const user = Meteor.users.findOne({ _id: token.userId });
  if (user == null) {
    return res.sendStatus(401).send('Invalid Token');
  }

  /* {
  "sub": "00uid4BxXw6I6TV4m0g3",
  "name" :"John Doe",
  "nickname":"Jimmy",
  "given_name":"John",
  "middle_name":"James",
  "family_name":"Doe",
  "profile":"https://example.com/john.doe",
  "zoneinfo":"America/Los_Angeles",
  "locale":"en-US",
  "updated_at":1311280970,
  "email":"john.doe@example.com",
  "email_verified":true,
  "address" : { "street_address":"123 Hollywood Blvd.", "locality":"Los Angeles", "region":"CA", "postal_code":"90210", "country":"US" },
  "phone_number":"+1 (425) 555-1212"
} */

  
  return res.send({
    sub: user._id,
    name: user.profile.pixelhumain.name,
    username: user.profile.pixelhumain.username,
    email: user.profile.pixelhumain.email,
    email_verified : true,
    picture: `${Meteor.settings.urlimage}${user.profile.pixelhumain.profilThumbImageUrl}`
  });
});