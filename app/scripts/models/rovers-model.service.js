(function (ng) {
  
  'use strict';
  
  function RoversModelService(){
    
    var _DEFAULT_NAME = 'Rover', 
      _DIRECTIONS = {N: 0, E: 1, S: 2, W: 3},
      _DIRECTIONS_ARRAY = Object.keys(_DIRECTIONS),
      _LAST_INDEX_DIRECTION = _DIRECTIONS_ARRAY.length - 1,
      _ROTATION = 90;
    
    var model = function (id, name, instructions, active, position, distance) {
      var vm = this;
      
      // Public attributes
      vm.id = id || 1;
      vm.name = name || _DEFAULT_NAME + ' ' + vm.id;
      vm.instructions = instructions || '';
      vm.active = active || false;
      vm.position = position || {x: 0, y: 0, dir: 'N', rotation: 0};
      vm.distance = distance || {h: 0, v: 0};
      vm.cssSyle = {};
      vm.isLast = false;
      
      // Public methods
      vm.rotateLeft = function () {
        vm.position.rotation -= _ROTATION;
        vm.position.dir = _newDirection(-1, vm.position.dir);
        return vm.position;
      };
      vm.rotateRight = function () {
        vm.position.rotation += _ROTATION;
        vm.position.dir = _newDirection(1, vm.position.dir);
        return vm.position;
      };
      vm.move = function (marsDimensions) {
        var hasError = false;
        switch(vm.position.dir) {
          case 'N':
            if(vm.position.y + vm.distance.v > marsDimensions.height) {
              hasError = true;
            } else {
              vm.position.y += vm.distance.v;
            }
            break;
          case 'E':
            if(vm.position.x + vm.distance.h > marsDimensions.width) {
              hasError = true;
            } else {
              vm.position.x += vm.distance.h;
            }
            break;
          case 'S':
            if(vm.position.y - vm.distance.v < 0) {
              hasError = true;
            } else {
              vm.position.y -= vm.distance.v;
            }
            break;
          case 'W':
            if(vm.position.x - vm.distance.h < 0) {
              hasError = true;
            } else {
              vm.position.x -= vm.distance.h;
            }
            break;
        }
        return hasError;
      };
    };
    
    return model;
    
    function _newDirection(increment, actualDir){
      var nextDir = _DIRECTIONS[actualDir] + increment;
      if(nextDir < 0) {
        nextDir = _LAST_INDEX_DIRECTION;
      } else if(nextDir > _LAST_INDEX_DIRECTION) {
        nextDir = 0;
      }
      return _DIRECTIONS_ARRAY[nextDir];
    }

  }
  
  ng.module('roversRobotsApp').service('RoversModel', [
    RoversModelService
  ]);
  
})(window.angular);
