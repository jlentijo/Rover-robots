(function (ng) {
  
  'use strict';
  
  var runProgramUiComponent = {
    templateUrl: 'scripts/ui-run-program/ui-run-program.template.html',
    controller: 'RunProgramUiController',
    controllerAs: 'runCtrl',
    bindings: {
      $router: '<'
    }
  };
  
  ng.module('roversRobotsApp').component('runProgramUi', runProgramUiComponent);
  
})(window.angular);