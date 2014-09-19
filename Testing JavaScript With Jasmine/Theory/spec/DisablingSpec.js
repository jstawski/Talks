/**
 * Created by Jonas on 9/17/2014.
 */
describe("Disabling", function() {
    xdescribe("disabled", function() {
        it("Should be 2", function() {
            // Arrange
            var x = 2;

            // Assert
            expect(x).toBe(2);
        });

        it("Should be 1", function() {
            // Arrange
            var x = 1;

            // Assert
            expect(x).toBe(1);
        });
    });

    describe("Enabled", function() {

        xit("Should be disabled", function() {
            // Arrange
            var x = 0;

            // Assert
            expect(x).toBe(0);
        });

        it("Should be 1 and enabled", function() {
            // Arrange
            var x = 1;

            // Assert
            expect(x).toBe(1);
        });
    });
});