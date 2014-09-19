/**
 * Created by Jonas on 9/17/2014.
 */
describe("Matchers", function() {
    describe("toBe or not toEqual", function() {
        it("Should use toBe", function(){
            // Arrange
            var x = 1,
                y = 1;

            // Assert
            expect(x).toBe(y);
        });

        it("Should also work with toEqual", function(){
            // Arrange
            var x = 1,
                y = 1;

            // Assert
            expect(x).toEqual(y);
        });

        it("Should also work with objects", function(){
            // Arrange
            var x = { prop1: 1 },
                y = { prop1: 1 };

            // Assert
            expect(x).toEqual(y);
        });

        it("Should not work with objects if they are different", function(){
            // Arrange
            var x = { prop1: 1 },
                y = { prop1: 2 };

            // Assert
            expect(x).not.toEqual(y);
        });

        it("Should not work when using toBe on two different objects", function() {
            // Arrange
            var x = { prop1: 1 },
                y = { prop1: 1 };

            // Assert
            expect(x).not.toBe(y);
        });

        it("Should work when using toBe on two objects with same reference", function() {
            // Arrange
            var x = { prop1: 1 },
                y = x;

            // Assert
            expect(x).toBe(y);
        });
    });

    describe("Other", function() {
        it("Should match", function() {
            // Arrange
            var x = "123",
                y = "123";

            // Assert
            expect(x).toMatch(y);
        });

        it("Should match regular expression", function() {
            // Arrange
            var x = "foo bar baz";

            // Assert
            expect(x).toMatch(/bar/);
        });

        it("Should be defined", function() {
            // Arrange
            var x = {},
                y;

            // Assert
            expect(x).toBeDefined();
            expect(y).not.toBeDefined();
            expect(y).toBeUndefined();
        });

        it("Should not be defined", function() {
            // Arrange
            var x = {},
                y;

            // Assert
            expect(x).not.toBeUndefined();
            expect(y).toBeUndefined();
        });

        it("Should be null", function() {
            // Arrange
            var x = {},
                y = null;

            // Assert
            expect(x).not.toBeNull();
            expect(y).toBeNull();
        });

        it("Should be truthy", function() {
            //
            // Arrange
            var x = true,
                y = "12345",
                z = 1,
                a = "false";

            // Assert
            expect(x).toBeTruthy();
            expect(y).toBeTruthy();
            expect(z).toBeTruthy();
            expect(a).toBeTruthy();
        });

        it("Should be falsy", function() {
            // Arrange
            var x = false,
                y = 0,
                z = "",
                a = null,
                b,
                c = NaN;

            // Assert
            expect(x).toBeFalsy();
            expect(y).toBeFalsy();
            expect(z).toBeFalsy();
            expect(a).toBeFalsy();
            expect(b).toBeFalsy();
            expect(c).toBeFalsy();
        });

        it("Should contain", function() {
            // Arrange
            var x = "123456",
                y = [1,2,3,4,5,6];

            // Assert
            expect(x).toContain("2");
            expect(y).toContain(2);
        });

        it("Should be less than", function() {
            // Arrange
            var x = 10;

            // Assert
            expect(x).toBeLessThan(20);
        });

        it("Should be greater than", function() {
            // Arrange
            var x = 10;

            // Assert
            expect(x).toBeGreaterThan(1);
        });

        it("Should throw", function() {
            // Arrange
            //var error = new Error();
            var x = function() { throw new Error(); };

            // Assert
            expect(x).toThrow();
        });
    });
});