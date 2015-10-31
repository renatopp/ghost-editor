(function() {
  'use strict';

  var Connection = function() {
    this.inNode = null;
    this.outNode = null;

    this.display = new b3e.connection.DisplayComponent(this);
  };
  var p = Connection.prototype;
  
  p._applySettings = function(settings) {
    this.display._applySettings(settings);
  };

  b3e.connection.Connection = Connection;
})();