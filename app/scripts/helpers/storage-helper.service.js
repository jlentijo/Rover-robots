(function (ng) {
  
  'use strict';
  
  function StorageHelperService(RoversModel, InstructionsModel, $localStorage) {
    
    return {
      getRovers: getRovers,
      setRovers: setRovers
    };
    
    function getRovers(convertToInstructionModel) {
      var roversStorage = $localStorage.rovers || [], rovers = [];

      ng.forEach(roversStorage, function (roverData) {
        var roverModel = new RoversModel(
          roverData.id,
          roverData.name, 
          roverData.instructions,
          roverData.active,
          roverData.position,
          roverData.distance
        );
        if(convertToInstructionModel){
          roverModel.instructions = _generateInstructions(roverModel.instructions);
        }
        rovers.push(roverModel);
      });
      
      return rovers;
    }
    
    function setRovers(rovers) {
      $localStorage.rovers = rovers;
    }
    
    function _generateInstructions(instructions) {
      var instructionsArray = instructions.split(' '), instructionsObj = [];
      ng.forEach(instructionsArray, function (instruction) {
        instructionsObj.push(new InstructionsModel(instruction));
      });
      return instructionsObj;
    }
    
  }
  
  ng.module('roversRobotsApp').service('StorageHelper', [
    'RoversModel',
    'InstructionsModel',
    '$localStorage',
    StorageHelperService  
  ]);
  
})(window.angular);