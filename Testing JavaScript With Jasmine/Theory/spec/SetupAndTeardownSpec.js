/**
 * Created by Jonas on 9/17/2014.
 */
describe("Setup and Teardown", function() {
    var y = 0;
    beforeEach(function() {
        y++;
    });
    it("Should", function() {
        expect(y).toBe(1);
    });
    describe("beforeEach", function() {
        var x = 0;
        beforeEach(function() {
            x = 1;
        });

        it("Should be 2", function() {
            // Arrange
            x++;

            // Assert
            expect(x).toBe(2);
            expect(y).toBe(2);
        });

        it("Should be 1", function() {
            // Assert
            expect(x).toBe(1);
            expect(y).toBe(3);
        });
    });

    describe("afterEach", function() {
        var x = 0;
        afterEach(function() {
            x = 1;
        });

        it("Should be 0", function() {
            // Assert
            expect(x).toBe(0);
        });

        it("Should be 1", function() {
            // Assert
            expect(x).toBe(1);
        });
    });
});