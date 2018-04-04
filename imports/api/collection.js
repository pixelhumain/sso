import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const oauthClients = new Mongo.Collection('oauth_clients');