(function (ng) {
  
  'use strict';
  
  function PlateauMarsService () {
    
    return {
      generatePlateau: generatePlateau,
      disableAllRovers: disableAllRovers,
      MARS_DIMENSIONS: {width: 0, height: 0}
    };
    
    function generatePlateau(rows, columns){
      var plateau = [];
      for(var i = 0; i < rows; i++){
        var column = [];
        for(var j = 0; j < columns; j++){
          column.push(j);
        }
        plateau.push(column);
      }
      return plateau;
    }
    
    function disableAllRovers(rovers) {
      ng.forEach(rovers, function (rover) {
        rover.active = false;
      });
    }
    
  }
  
  ng.module('roversRobotsApp').service('PlateauMarsService', [
    PlateauMarsService
  ]);
  
})(window.angular);