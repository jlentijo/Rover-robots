(function (ng) {
  
  'use strict';
  
  function ConfigRobotsUiService (RoversModel, StorageHelper) {
    
    return {
      generateNewRover: generateNewRover,
      saveRovers: saveRovers
    };
    
    function generateNewRover(id) {
      var roverRobot = new RoversModel(id);
      return roverRobot;
    }
    
    function saveRovers(rovers) {
      StorageHelper.setRovers(rovers);
    }
  }
  
  ng.module('roversRobotsApp').service('ConfigRobotsUiService', [
    'RoversModel',
    'StorageHelper',
    ConfigRobotsUiService
  ]);
  
})(window.angular);