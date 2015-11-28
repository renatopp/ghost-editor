/** @module b3e */

(function () {
  "use strict";

  var Property = new JS.Class('Property', {
    name: null,
    title: null,
    category: null,
    description: null,

    initialize: function(title, description) {
      this.title = title;
      this.description = description;
    },

    getTitle: function() {
      return (this.title? this.title : b3e.toTitleCase(this.name));
    },

    html: function() {
      return 'prop-'+this.category.replace(/\s/g, '').toLowerCase(); 
    },

    fromJson: function(data) {

    },

    toJson: function() {

    }
  });
  b3e.property.Property = Property;

  b3e.property.create = function(name, kwargs) {
    kwargs = kwargs || {};
    kwargs.category = name;

    var Cls = new JS.Class(name, Property, kwargs);
    return Cls;
  };
})();