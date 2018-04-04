import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { moment } from 'meteor/momentjs:moment';
import { TAPi18n } from 'meteor/tap:i18n';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';

Meteor.startup(function () {
  window.HTML.isConstructedObject = function(x) {
    return _.isObject(x) && !$.isPlainObject(x);
  };

  Template.registerHelper('equals', (v1, v2) => (v1 === v2));

  Template.registerHelper('nequals', (v1, v2) => (v1 !== v2));

  Template.registerHelper('diffInText', (start, end) => {
    const a = moment(start);
    const b = moment(end);
    const diffInMs = b.diff(a); // 86400000 milliseconds
    // const diffInDays = b.diff(a, 'days'); // 1 day
    const diffInDayText = moment.duration(diffInMs).humanize();
    return diffInDayText;
  },
  );

  Template.registerHelper('i18npref', (prefix, text) => TAPi18n.__(`${prefix}.${text}`));

  Template.registerHelper('currentFieldValue', function (fieldName) {
    return AutoForm.getFieldValue(fieldName) || false;
  });

  Template.registerHelper('equalFieldValue', function (fieldName, value) {
    return AutoForm.getFieldValue(fieldName) === value;
  });

  Template.registerHelper('urlImageCommunecter', function () {
    return Meteor.settings.public.urlimage;
  });

  Template.registerHelper('urlModuleCommunecter', function () {
    return Meteor.settings.public.module;
  });

  Template.registerHelper('urlImageDesktop', function () {
    // console.log(Meteor.settings.public.remoteUrl);
    return Meteor.isDesktop ? Meteor.settings.public.remoteUrl : '';
  });


});
