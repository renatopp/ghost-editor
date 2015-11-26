/** @module b3e */

(function () {
  "use strict";

  b3e.property.create = function(name, html, title, description) {
    var property = {};

    property.name = name;
    property.title = title || null;
    property.description = description || null;
    property.html = html || '';

    return property;
  };
})();