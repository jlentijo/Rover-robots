(function (ng) {
  
  'use strict';
  
  var roverRobotComponent = {
    controller: 'RoverRobotController',
    controllerAs: 'roverCtrl',
    templateUrl: 'scripts/components/rover-robot/rover-robot.template.html',
    require: {
      marsCtrl: '^plateauMars'
    },
    bindings: {
      rover: '=data'
    }
  };
  
  ng.module('roversRobotsApp').component('roverRobot', roverRobotComponent);
  
})(window.angular);