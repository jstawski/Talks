define(["jquery"],
    function ($) {
        "use strict";

        var getVehicles = function () {
            return $.getJSON("/api/vehicle");
        };

        var getVehicle = function (id) {
            return $.getJSON("/api/vehicle/" + id);
        };

        var saveVehicle = function (vehicle) {
            return $.post("/api/vehicle", vehicle);
        };
        return {
            getVehicles: getVehicles,
            getVehicle: getVehicle,
            saveVehicle: saveVehicle
        };
    });