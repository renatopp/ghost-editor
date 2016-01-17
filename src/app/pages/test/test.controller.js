(function() {
  'use strict';

  angular
    .module('app')
    .controller('TestController', TestController);

  TestController.$inject = [];
  function TestController() {

    // HEAD //
    var self = this;
    self.data = {
      xDomain : [-1, 1],
      data    : [{x:-1, y:0}, {x:0, y:1}, {x:1, y:0}],
    };
    _activate();

    // BODY //
    function _activate() {
    }
  }
})();