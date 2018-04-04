import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Mongo } from 'meteor/mongo';
import { TAPi18n } from 'meteor/tap:i18n';

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const encodeString = str => encodeURIComponent(str).replace(/\*/g, '%2A');

if (Meteor.isClient) {

  export const userLanguage = () => {
  // If the user is logged in, retrieve their saved language
    if (Meteor.user()) {
      return Meteor.user().profile.language;
    }
    return undefined;
  };

  export const languageBrowser = () => {
    const localeFromBrowser = window.navigator.userLanguage || window.navigator.language;
    let locale = 'en';

    if (localeFromBrowser.match(/en/)) locale = 'en';
    if (localeFromBrowser.match(/fr/)) locale = 'fr';

    return locale;
  };
}


