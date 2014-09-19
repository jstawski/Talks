define(["jquery", "ko", "data", "bootstrap", "customBindingHandlers/modal"],
    function ($, ko, data) {
        "use strict";
        var HomeViewModel = function () {
            var self = this;

            // properties
            self.vehicles = ko.observableArray([]);
            self.vehicleDetails = ko.observable();
            self.isEmpty = ko.computed(function () {
                return self.vehicles().length === 0;
            });
            self.vehicleCount = ko.computed(function () {
                return self.vehicles().length;
            });

            // functions
            self.getVehicles = function () {
                data.getVehicles().done(function (data) {
                    var newVehicles = ko.utils.arrayMap(data, function (vehicle) {
                        return new Vehicle(vehicle);
                    });

                    self.vehicles(newVehicles);
                });
            };
            self.hideDetails = function () {
                self.vehicleDetails(null);
            };
            self.showDetails = function (vehicle) {
                self.vehicleDetails(vehicle);
            };
            self.saveDetails = function () {
                data.saveVehicle(self.vehicleDetails().toJSON())
                        .done(function (result) {
                            if (!result) {
                                alert("An error occurred saving the vehicle");
                                return;
                            }
                            alert("Vehicle saved!");
                            for (var i = 0; i < self.vehicles().length; i++) {
                                if (self.vehicles()[i].id() === self.vehicleDetails().id()) {
                                    self.vehicles()[i] = self.vehicleDetails();
                                }
                            }
                        }).always(function () {
                            self.hideDetails();
                        });
            };
        };
        var Vehicle = function (data) {
            var self = this;
            self.id = ko.observable(data ? data.id : null);
            self.make = ko.observable(data ? data.make : null);
            self.model = ko.observable(data ? data.model : null);
            self.vin = ko.observable(data ? data.vin : null);
            self.status = ko.observable(data ? data.status : null);
            self.canEdit = ko.computed(function () {
                if (self.status() === "A") {
                    return true;
                }
                return false;
            });
            self.toJSON = function () {
                var json = {
                    id: self.id(),
                    make: self.make(),
                    model: self.model(),
                    vin: self.vin(),
                    status: self.status()
                };

                return json;
            };
        };

        var init = function (target) {
            var vm = new HomeViewModel();
            vm.getVehicles();
            ko.applyBindings(vm, target);
        };

        return {
            init: init,
            HomeViewModel: HomeViewModel,
            Vehicle: Vehicle
        };
});