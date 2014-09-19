require.config({
    paths: {
        jasmine: "../jasmine/jasmine",
        jasmineHtml: "../jasmine/jasmine-html",
        jasmineBoot: "../jasmine/boot",
        jasmineHelpers: "../tests/jasmineHelpers"
    },
    shim: {
        jasmine: {
            exports: "jasmine"
        },
        jasmineHtml: {
            deps: ["jasmine"],
            exports: "jasmine"
        },
        jasmineBoot: {
            deps: ["jasmine", "jasmineHtml"],
            exports: "jasmine"
        }
    }
});

// Things needed for Jasmine script runner
// Uses main.js config, and adds the stuff above to it
define(function () {
        "use strict";

        // Add additional test files here...
        var specs = [
            "home-tests"];

        // Prefix with path and suffix with .js
        for (var i = 0; i < specs.length; i++) {
            specs[i] = "/Scripts/tests/" + specs[i] + ".js";
        }

        // Load Jasmine and set it up, then load the specs and manually fire window.onload, which fires up Jasmine.
        require(["jasmineBoot"],
            function () {

                // Set default timeout for async to 30 seconds
                //window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

                require(specs,
                    function () {
                        window.onload();
                    }
                );
            }
        );
    }
);