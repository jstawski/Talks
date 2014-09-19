/**
 * Created by Jonas on 9/17/2014.
 */
describe("Spies", function() {
    var car;
    beforeEach(function() {
        car = {
            started: false,
            running: false,
            start: function() {
                this.started = true;
            },
            stop: function() {
                if (!this.started) {
                    throw new Error("car is not started");
                }
                this.started = false;
                this.running = false;
            },
            run: function(time) {
                this.start();
                this.running = true;
            },
            connectToXM: function() {
                //does some connection logic

                return true;
            }
        };
    });

    it("Should spy on a function", function() {
        // Arrange
        spyOn(car, 'start');

        // Act
        car.start();

        // Assert
        expect(car.start).toHaveBeenCalled();
        expect(car.started).toBe(false);
    });

    it("Should spy on a function and verify it has been called with appropriate params", function() {
        // Arrange
        spyOn(car, 'run');
        var minutes = 10;

        // Act
        car.run(minutes);

        // Assert
        expect(car.run).toHaveBeenCalledWith(minutes);
    });

    describe("and", function() {
        it("Should callThrough", function() {
            // Arrange
            spyOn(car, 'start').and.callThrough(); //delegate to actual implementation

            // Act
            car.start();

            // Assert
            expect(car.start).toHaveBeenCalled();
            expect(car.started).toBe(true);
        });

        it("Should returnValue", function() {
            // Arrange
            spyOn(car, 'connectToXM').and.returnValue(false);

            // Act
            var connected = car.connectToXM();

            // Assert
            expect(car.connectToXM).toHaveBeenCalled();
            expect(connected).toBe(false);
        });

        it("Should callFake", function() {
            // Arrange
            spyOn(car, 'connectToXM').and.callFake(function() {
                //change the actual implementation to do something else
                return false;
            });

            // Act
            var connected = car.connectToXM();

            // Assert
            expect(car.connectToXM).toHaveBeenCalled();
            expect(connected).toBe(false);
        });

        it("Should throwError", function() {
            // Arrange
            spyOn(car, 'connectToXM').and.throwError("error");

            // Assert
            expect(function() { car.connectToXM() }).toThrowError("error");
        });

        it("Should stub", function() {
            // Arrange
            spyOn(car, 'start').and.callThrough();
            car.start.and.stub();

            //Act
            car.start();

            // Assert
            expect(car.started).toBe(false); //this should be true if not stubbed
            expect(car.start).toHaveBeenCalled();
        });

        it("Should any", function() {
            // Arrange
            spyOn(car, 'start');

            //Act and Assert
            expect(car.start.calls.any()).toBe(false);
            car.start();
            expect(car.start.calls.any()).toBe(true);
        });

        it("Should count", function() {
            // Arrange
            spyOn(car, 'start');


            // Act
            car.start();
            car.start();

            // Assert
            expect(car.start.calls.count()).toBe(2);
        });

        it("Should argsFor", function() {
            // Arrange
            spyOn(car, 'run');


            // Act
            car.run(10);
            car.run(5, 5);

            // Assert
            expect(car.run.calls.argsFor(0)).toEqual([10]);
            expect(car.run.calls.argsFor(1)).toEqual([5, 5]);
        });

        it("Should allArgs", function() {
            // Arrange
            spyOn(car, 'run');


            // Act
            car.run(10);
            car.run(5, 5);

            // Assert
            expect(car.run.calls.allArgs()).toEqual([[10],[5, 5]]);
        });

        it("Should clear", function() {
            // Arrange
            spyOn(car, 'run');


            // Act
            car.run(10);
            car.run.calls.reset();

            // Assert
            expect(car.run.calls.any()).toBe(false);
        });
    });
});