(function (ng) {
  
  'use strict';
  
  function InstructionsModelService(){
    
    var model = function (value) {
      var vm = this;
      vm.value = value;
      vm.active = false;
      vm.error = false;
    };
    
    return model;
  }
  
  ng.module('roversRobotsApp').service('InstructionsModel', [
    InstructionsModelService
  ]);
  
})(window.angular);