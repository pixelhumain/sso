import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

/*
si j'utilise telle quel je suis obliger d'être connecté à la même base de données
*/
// collection
/* const Citoyens = new Mongo.Collection('citoyens', { idGeneration: 'MONGO' });

Accounts.onLogin(function (user) {
    // console.log(user.user._id)
    const userC = Citoyens.findOne({ _id: new Mongo.ObjectID(user.user._id) }, { fields: { pwd: 0 } });

    if (!userC) {
        // throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Communecter Login Failed');
    } else {
        // ok valide
        const userM = Meteor.users.findOne({ _id: userC._id._str });
        // console.log(userM);
        if (userM && userM.profile && userM.profile.pixelhumain) {
            // Meteor.user existe
            const userId = userM._id;
            Meteor.users.update(userId, { $set: { 'profile.pixelhumain': userC } });
        } else {
            // username ou emails
            const userId = userM._id;
            Meteor.users.update(userId, { $set: { 'profile.pixelhumain': userC } });
        }
    }
}); */