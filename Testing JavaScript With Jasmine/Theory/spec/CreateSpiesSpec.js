/**
 * Created by Jonas on 9/17/2014.
 */
describe("Create Spies", function() {
    var car;
    beforeEach(function(done) {
        car = {
            connectToXM: function(station, callBack) {
                setTimeout(function() {
                    callBack();
                    done();
                }, 100);
            }
        };
        done();
    });

    it("Should create spy", function(done) {
        // Arrange
        var cbSpy = jasmine.createSpy("callback");

        // Act
        car.connectToXM(103, cbSpy);

        // Assert
        setTimeout(function() {
            expect(cbSpy).toHaveBeenCalled();
            done();
        }, 150)
    });

    it("Should create spyObj", function() {
        // Arrange
        var truck = jasmine.createSpyObj("truck", ["go", "break"]);

        // Act
        truck.go();
        truck.break();

        // Assert
        expect(truck.go).toBeDefined();
        expect(truck.break).toBeDefined();

        expect(truck.go).toHaveBeenCalled();
        expect(truck.break).toHaveBeenCalled();
    });
});