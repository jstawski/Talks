/**
 * Created by Jonas on 9/17/2014.
 */
describe("Helper", function() {
    describe("Divide", function() {
        it("Should return 2 when pass 6, 3", function() {
            // Arrange
            var dividend = 6,
                divisor = 3,
                expectedResult = 2;

            // Act
            var result = Divide(dividend, divisor);

            // Assert
            expect(result).toBe(expectedResult);

        });

        it("Should return infinite when dividing by 0", function() {
            // Arrange
            var dividend = 6,
                divisor = 0;

            // Act
            var result = Divide(dividend, divisor);

            // Assert
            expect(isFinite(result)).not.toBe(true); //you can negate by chaining with not
            // or
            expect(isFinite(result)).toBe(false);
        });

        it("Should return dividend when divisor is 1", function() {
            // Arrange
            var dividend = 6,
                divisor = 1;

            // Act
            var result = Divide(dividend, divisor);

            // Assert
            expect(result).toBe(dividend);
        });

        it("Should return 0 when dividend is 0", function() {
            // Arrange
            var dividend = 0,
                divisor = 6,
                expectedResult = 0;

            // Act
            var result = Divide(dividend, divisor);

            // Assert
            expect(result).toBe(expectedResult);
        });
   });
});