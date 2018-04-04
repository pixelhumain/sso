import { Meteor } from 'meteor/meteor';
import { oauthClients } from '../collection.js';

Meteor.publish('oauthClient', function (clientId) {
    if (!this.userId) {
        return this.ready();
    }
    return oauthClients.find({
        clientId,
        active: true
    }, {
            fields: {
                name: 1
            }
        });
});