(function (ng) {
  
  'use strict';
  
  function ConfigRobotsUiController (ConfigRobotsUiService, StorageHelper) {
    var vm = this;
    
    vm.$onInit = function () {
      vm.robots = StorageHelper.getRovers(false);
      if(vm.robots.length === 0){
        var firstRover = ConfigRobotsUiService.generateNewRover(1);
        vm.robots.push(firstRover);
      }
    };
    
    vm.addNewRover = function () {
      var lastRover = vm.robots[vm.robots.length - 1],
        rover = ConfigRobotsUiService.generateNewRover(lastRover.id + 1);
      vm.robots.push(rover);
    };
    
    vm.removeRover = function (roverIndex) {
      vm.robots.splice(roverIndex, 1);
    };
    
    vm.runProgram = function ($formController) {
      if($formController.$valid){
        ConfigRobotsUiService.saveRovers(vm.robots);
        vm.$router.navigate(['RunProgram']);
      }
    };
  }
  
  ng.module('roversRobotsApp').controller('ConfigRobotsUiController', [
    'ConfigRobotsUiService',
    'StorageHelper',
    ConfigRobotsUiController
  ]);
  
})(window.angular);

