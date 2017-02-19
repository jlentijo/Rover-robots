(function (ng) {
  
  'use strict';
  
  function RoverRobotService (InstructionsModel, PlateauMarsService, $timeout, $q) {
    
    var _ANIMATION_DELAY = 1000;
    
    return {
      initializeRover: initializeRover, 
      showRover: showRover,
      hideRover: hideRover,
      applyIntruction: applyIntruction,
      disableAllInstructions: disableAllInstructions
    };
    
    function initializeRover (rover) {
      rover.active = true;
      rover.cssStyle = _generateCssStyle(rover);
      return _sleep(0);
    }
    
    function showRover(rover) {
      rover.cssStyle.opacity = 100;
      return _sleep(_ANIMATION_DELAY);
    }
    
    function hideRover(rover) {
      rover.cssStyle.opacity = 0;
      return _sleep(_ANIMATION_DELAY);
    }
    
    function applyIntruction(instruction, rover) {
      switch (instruction.value) {
        case 'L':
          rover.rotateLeft();
          break;
        case 'R':
          rover.rotateRight();
          break;
        case 'M':
          var hasError = rover.move(PlateauMarsService.MARS_DIMENSIONS);
          if(hasError) instruction.error = true;
          break;
      }
      rover.cssStyle = _generateCssStyle(rover, true);
      return _sleep(_ANIMATION_DELAY);
    }
    
    function disableAllInstructions(instructions){
      ng.forEach(instructions, function (instruction) {
        instruction.active = false;
      });
    }
    
    function _generateCssStyle(rover, show){
      var cssStyle = {
        left: rover.position.x,
        top: PlateauMarsService.MARS_DIMENSIONS.height - rover.position.y,
        transform: 'rotate(' + rover.position.rotation + 'deg)',
        width: rover.distance.h + 'px',
        height: rover.distance.v + 'px',
        opacity: show ? 100 : 0
      };
      return cssStyle
    }
    
    function _sleep(milliseconds) {
      return $timeout(ng.noop, _ANIMATION_DELAY);
    }
  }
  
  ng.module('roversRobotsApp').service('RoverRobotService', [
    'InstructionsModel',
    'PlateauMarsService',
    '$timeout',
    '$q',
    RoverRobotService
  ]);
  
})(window.angular);

