(function (ng) {
  
  'use strict';
  
  function RoverRobotController (RoverRobotService, $q) {
    var vm = this;
    
    vm.$onInit = function () {
      RoverRobotService.initializeRover(vm.rover).then(function () {
        vm.startMission().then(function () {
          RoverRobotService.disableAllInstructions(vm.rover.instructions);
          RoverRobotService.hideRover(vm.rover).then(function () {
            if(vm.rover.isLast){
              vm.rover.active = false;
            } else {
              vm.marsCtrl.launchRobotOnMars(vm.rover.position);
            }
          });
        });
      });
    };
    
    vm.startMission = function () {
      var deferred = $q.defer(),
        instructionsPromise = _populateInstructions(vm.rover.instructions),
        initialPromise = RoverRobotService.showRover(vm.rover);
      
      instructionsPromise.reduce(function (prev, curr, iterator) {
        return prev.then(function () {
          var nextIntruction = vm.rover.instructions[iterator];
          RoverRobotService.disableAllInstructions(vm.rover.instructions);
          nextIntruction.active = true;
          return curr(nextIntruction, deferred).then(function () {
            if(iterator == vm.rover.instructions.length - 1){
              deferred.resolve();
            }
          });
        });
      }, initialPromise);
      
      return deferred.promise;
    };
    
    function _populateInstructions(instructions) {
      var instructionsPromise = [];
      ng.forEach(instructions, function () {
        instructionsPromise.push(function (instruction) {
          return RoverRobotService.applyIntruction(instruction, vm.rover);
        });
      });
      return instructionsPromise;
    }
  }
  
  ng.module('roversRobotsApp').controller('RoverRobotController', [
    'RoverRobotService',
    '$q',
    RoverRobotController
  ]);
  
})(window.angular);