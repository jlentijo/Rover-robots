(function (ng) {
  
  'use strict';

  function InstructionsValidationDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$validators.instructionsValidation = function (modelValue) {
          var instructions = modelValue ? modelValue.split(' ') : [],
            possibleInstructions = ['R', 'L', 'M'], isValid = true;
          
          ng.forEach(instructions, function (instruction) {
            if(possibleInstructions.indexOf(instruction) === -1) {
              isValid = false;
            }
          });
          return isValid;
        };
      }
    };
  }

  ng.module('roversRobotsApp').directive('instructionsValidation', [
    InstructionsValidationDirective
  ]);

})(window.angular);