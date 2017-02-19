(function (ng) {
  
  'use strict';
  
  function RunProgramUiController (StorageHelper) {
    var vm = this;
    
    vm.$onInit = function () {
      vm.robots = StorageHelper.getRovers(true);
      if(vm.robots.length === 0){
        vm.$router.navigate(['ConfigRobots']);
      }
    };
  }
  
  ng.module('roversRobotsApp').controller('RunProgramUiController', [
    'StorageHelper',
    RunProgramUiController
  ]);
  
})(window.angular);

