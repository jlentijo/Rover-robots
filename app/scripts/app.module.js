(function (ng) {
  
  'use strict';

  ng.module('roversRobotsApp', [
    'ngComponentRouter',
    'ngMessages',
    'ngStorage'
  ]);
  
  /**
   * Define Root App Component
   */
  ng.module('roversRobotsApp')
    .value('$routerRootComponent', 'nasa')
    .component('nasa', {
      template: '<ng-outlet></ng-outlet>',
      $routeConfig: [
        {path: '/', name: 'Home', component: 'homeUi', useAsDefault: true},
        {path: '/config', name: 'ConfigRobots', component: 'configRobotsUi'},
        {path: '/run', name: 'RunProgram', component: 'runProgramUi'}
      ]
    });
  
})(window.angular);
