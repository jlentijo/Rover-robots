(function (ng) {
  
  'use strict';
  
  function PlateauMarsController (PlateauMarsService, $element, $timeout, $compile, $scope) {
    var vm = this;
    
    var indexRoverInAction = 0;
    
    vm.$onInit = function () {
      vm.plateau = PlateauMarsService.generatePlateau(vm.rows, vm.columns);
    };
    
    vm.$postLink = function () {
      $timeout(function () {
        var tdEl = $element.find('table td.fragment');
        vm.widthFragment = tdEl.outerWidth();
        vm.heightFragment = tdEl.outerHeight();
        PlateauMarsService.MARS_DIMENSIONS.width = (vm.columns - 1) * vm.widthFragment;
        PlateauMarsService.MARS_DIMENSIONS.height = (vm.rows - 1) * vm.heightFragment;
        vm.launchRobotOnMars({x: 0, y: 0, dir: 'N', rotation: 0});
      });
    };
    
    vm.launchRobotOnMars = function (initialRoverPosition) {
      if (ng.isDefined(vm.robotComponent)){
        vm.robotComponent.remove();
      }
      
      PlateauMarsService.disableAllRovers(vm.rovers);
      
      vm.roverInAction = vm.rovers[indexRoverInAction];
      vm.roverInAction.position = initialRoverPosition;
      vm.roverInAction.distance.h = vm.widthFragment;
      vm.roverInAction.distance.v = vm.heightFragment;
      vm.roverInAction.isLast = indexRoverInAction === vm.rovers.length - 1;
      
      vm.robotComponent = ng.element('<rover-robot></rover-robot>');
      vm.robotComponent.attr({
        'class': 'rover-in-action',
        'data': 'marsCtrl.roverInAction'
      });
      $element.append(vm.robotComponent);
      $compile(vm.robotComponent)($scope);
      
      indexRoverInAction += 1;
    };
  }
  
  ng.module('roversRobotsApp').controller('PlateauMarsController', [
    'PlateauMarsService',
    '$element',
    '$timeout',
    '$compile',
    '$scope',
    PlateauMarsController
  ]);
  
})(window.angular);

