/**
 * Created by Jonas on 9/17/2014.
 */
describe("Pending", function() {
    xit("Should be pending with xit", function() {
        // Assert
        expect(true).toBe(false);
    });

    it("Should be pending without a function");

    it("Should be pending when using the pending() function", function() {
        // Assert
        expect(true).toBe(false);
        pending();
    });
});