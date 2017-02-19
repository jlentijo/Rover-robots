
(function (inject, expect) {
  
  'use strict';
  
  describe('RoversModelService', function () {
  
    // load the controller's module
    beforeEach(module('roversRobotsApp'));
  
    var RoversModel, rover;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($injector) {
      RoversModel = $injector.get('RoversModel');
      rover = new RoversModel();
    }));
    
    it('should have the robot rover all default values', function () {
      expect(rover.id).toEqual(1);
      expect(rover.name).toEqual('Rover 1');
      expect(rover.instructions).toEqual('');
      expect(rover.position).toEqual({x: 0, y: 0, dir: 'N', rotation: 0});
      expect(rover.distance).toEqual({h: 0, v: 0});
      expect(rover.cssSyle).toEqual({});
      expect(rover.isLast).toBeFalsy();
    });
    
    describe('Rotation ->', function () {
      
      it('should rotate the robot rover 90 degrees to the right from the north', function () {
        rover.position.dir = 'N';
        rover.position.rotation = 0;
        var newPosition = rover.rotateRight();
        expect(newPosition.rotation).toEqual(90);
        expect(newPosition.dir).toEqual('E');
      });
      
      it('should rotate the robot rover 90 degrees to the left from the sud', function () {
        rover.position.dir = 'S';
        rover.position.rotation = 180;
        var newPosition = rover.rotateLeft();
        expect(newPosition.rotation).toEqual(90);
        expect(newPosition.dir).toEqual('E');
      });
    
    });
    
    describe('Move forward ->', function () {
      
      var marsDimensions;
      
      beforeEach(function () {
        marsDimensions = {width: 300, height: 300};
        rover.distance = {h: 100, v: 100};
      });
    
      it('should move forward the rover robot in the direction North', function () {
        rover.position = {x: 0, y: 0, dir: 'N'};
        var hasError = rover.move(marsDimensions);
        expect(hasError).toBeFalsy();
        expect(rover.position).toEqual({x: 0, y: 100, dir: 'N'});
      });
      
      it('should move forward the rover robot in the direction East', function () {
        rover.position = {x: 100, y: 100, dir: 'E'};
        var hasError = rover.move(marsDimensions);
        expect(hasError).toBeFalsy();
        expect(rover.position).toEqual({x: 200, y: 100, dir: 'E'});
      });
      
      it('should move forward the rover robot in the direction Sud', function () {
        rover.position = {x: 100, y: 100, dir: 'S'};
        var hasError = rover.move(marsDimensions);
        expect(hasError).toBeFalsy();
        expect(rover.position).toEqual({x: 100, y: 0, dir: 'S'});
      });
      
      it('should move forward the rover robot in the direction West', function () {
        rover.position = {x: 100, y: 100, dir: 'W'};
        var hasError = rover.move(marsDimensions);
        expect(hasError).toBeFalsy();
        expect(rover.position).toEqual({x: 0, y: 100, dir: 'W'});
      });
    
      describe('Borders ->', function () {
      
        it('should not to overcome the north limit with robot rover', function () {
          rover.position = {x: 0, y: 300, dir: 'N'};
          var hasError = rover.move(marsDimensions);
          expect(hasError).toBeTruthy();
          expect(rover.position).toEqual({x: 0, y: 300, dir: 'N'});
        });
        
        it('should not to overcome the east limit with robot rover', function () {
          rover.position = {x: 300, y: 300, dir: 'E'};
          var hasError = rover.move(marsDimensions);
          expect(hasError).toBeTruthy();
          expect(rover.position).toEqual({x: 300, y: 300, dir: 'E'});
        });
        
        it('should not to overcome the sud limit with robot rover', function () {
          rover.position = {x: 300, y: 0, dir: 'S'};
          var hasError = rover.move(marsDimensions);
          expect(hasError).toBeTruthy();
          expect(rover.position).toEqual({x: 300, y: 0, dir: 'S'});
        });
        
        it('should not to overcome the west limit with robot rover', function () {
          rover.position = {x: 0, y: 0, dir: 'W'};
          var hasError = rover.move(marsDimensions);
          expect(hasError).toBeTruthy();
          expect(rover.position).toEqual({x: 0, y: 0, dir: 'W'});
        });
        
      });
      
    });
    
  });
  
})(window.inject, window.expect);
