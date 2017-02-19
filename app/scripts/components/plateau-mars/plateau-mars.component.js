(function (ng) {
  
  'use strict';
  
  var plateauMarsComponent = {
    transclude: true,
    controller: 'PlateauMarsController',
    controllerAs: 'marsCtrl',
    templateUrl: 'scripts/components/plateau-mars/plateau-mars.template.html',
    bindings: {
      rows: '@',
      columns: '@',
      rovers: '='
    }
  };
  
  ng.module('roversRobotsApp').component('plateauMars', plateauMarsComponent);
  
})(window.angular);