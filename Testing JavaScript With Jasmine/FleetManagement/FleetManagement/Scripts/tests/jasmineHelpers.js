define(["jquery"],
    function ($) {
        "use strict";

        var deferredSuccess = function (args) {
            var d = $.Deferred();
            d.resolve(args);
            return d.promise();
        };

        var deferredFailure = function (args) {
            var d = $.Deferred();
            d.reject(args);
            return d.promise();
        };

        return {
            deferredSuccess: deferredSuccess,
            deferredFailure: deferredFailure
        };
    }
);