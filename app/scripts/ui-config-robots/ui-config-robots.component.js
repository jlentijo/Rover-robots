(function (ng) {
  
  'use strict';
  
  var configRobotsUiComponent = {
    templateUrl: 'scripts/ui-config-robots/ui-config-robots.template.html',
    controller: 'ConfigRobotsUiController',
    controllerAs: 'configCtrl',
    bindings: {
      $router: '<'
    }
  };
  
  ng.module('roversRobotsApp').component('configRobotsUi', configRobotsUiComponent);
  
})(window.angular);