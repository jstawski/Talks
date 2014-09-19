define(["home", "data", "jasmineHelpers"],
    function (module, data, helpers) {
        describe("home", function () {
            describe("Vehicle", function () {
                it("Should default when new", function () {
                    // Arrange and Act
                    var v = new module.Vehicle();

                    // Assert
                    expect(v.id()).toBeNull();
                    expect(v.make()).toBeNull();
                    expect(v.model()).toBeNull();
                    expect(v.vin()).toBeNull();
                    expect(v.status()).toBeNull();
                });

                //it("Should default when passed in data", function ());

                it("Should not be able to edit when status is not A", function () {
                    // Arrange
                    var data = {
                        status: "X"
                    };
                    var v = new module.Vehicle(data);

                    // Act
                    

                    // Assert
                    expect(v.canEdit()).toBe(false);
                });

                it("Should be able to edit when status is A", function () {
                    // Arrange
                    var data = {
                        status: "A"
                    };
                    var v = new module.Vehicle(data);

                    // Act


                    // Assert
                    expect(v.canEdit()).toBe(true);
                });

                it("Should return right object when toJSON is called", function () {
                    // Arrange
                    var data = {
                        id: 1,
                        make: "Honda",
                        model: "Civic",
                        vin: "1234567",
                        status: "A"
                    };
                    var v = new module.Vehicle(data);

                    // Act
                    var json = v.toJSON();

                    // Assert
                    expect(json).toEqual(data);
                });
            });
            
            describe("HomeViewModel", function () {
                it("Should default when new", function () {
                    // Arrange and Act
                    var vm = new module.HomeViewModel();

                    // Assert
                    expect(vm.vehicles()).toEqual([]);
                    expect(vm.vehicleDetails()).toBeUndefined();
                });

                it("Should be empty when there are no vehicles", function () {
                    // Arrange and Act
                    var vm = new module.HomeViewModel();

                    // Assert
                    expect(vm.isEmpty()).toBe(true);
                });

                it("Should not be empty when there is at least one vehicle", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();

                    // Act
                    vm.vehicles([{}]);

                    // Assert
                    expect(vm.isEmpty()).toBe(false);
                });

                it("Should return right vehicle count", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicles = [{}, {}];

                    // Act
                    vm.vehicles(vehicles);

                    // Assert
                    expect(vm.vehicleCount()).toBe(vehicles.length);
                });

                it("Should return right vehicle count", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicles = [{}, {}];

                    // Act
                    vm.vehicles(vehicles);

                    // Assert
                    expect(vm.vehicleCount()).toBe(vehicles.length);
                });

                it("Should get vehicles", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicles = [{
                        id: 1,
                        make: "Honda",
                        model: "Civic",
                        vin: "1234567",
                        status: "A"
                    }, {
                        id: 2,
                        make: "Toyota",
                        model: "Corolla",
                        vin: "7654321",
                        status: "I"
                    }];

                    spyOn(data, "getVehicles").and.callFake(function () { return helpers.deferredSuccess(vehicles); });

                    // Act
                    vm.getVehicles();

                    // Assert
                    expect(data.getVehicles).toHaveBeenCalled();
                    expect(vm.vehicles().length).toBe(vehicles.length);
                    expect(vm.vehicles()[0].id()).toBe(vehicles[0].id);
                    expect(vm.vehicles()[0].make()).toBe(vehicles[0].make);
                    expect(vm.vehicles()[0].model()).toBe(vehicles[0].model);
                    expect(vm.vehicles()[0].vin()).toBe(vehicles[0].vin);
                    expect(vm.vehicles()[0].status()).toBe(vehicles[0].status);

                    expect(vm.vehicles()[1].id()).toBe(vehicles[1].id);
                    expect(vm.vehicles()[1].make()).toBe(vehicles[1].make);
                    expect(vm.vehicles()[1].model()).toBe(vehicles[1].model);
                    expect(vm.vehicles()[1].vin()).toBe(vehicles[1].vin);
                    expect(vm.vehicles()[1].status()).toBe(vehicles[1].status);
                });

                it("Should not have any vehicles if it getVehicles fails", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    
                    spyOn(data, "getVehicles").and.callFake(helpers.deferredFailure);

                    // Act
                    vm.getVehicles();

                    // Assert
                    expect(data.getVehicles).toHaveBeenCalled();
                    expect(vm.vehicles().length).toBe(0);
                });

                it("Should nullify vehicleDetails when hiding", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    vm.vehicleDetails({});

                    // Act
                    vm.hideDetails();

                    // Assert
                    expect(vm.vehicleDetails()).toBeNull();
                });

                it("Should set vehicleDetails when showing details", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicle = {
                        id: 1,
                        make: "Toyota"
                    };

                    // Act
                    vm.showDetails(vehicle);

                    // Assert
                    expect(vm.vehicleDetails()).toEqual(vehicle);
                });

                it("Should save vehicle, set the new values on the array, and hide modal", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicles = [{
                        id: 1,
                        make: "Honda",
                        model: "Civic",
                        vin: "1234567",
                        status: "A"
                    }, {
                        id: 2,
                        make: "Toyota",
                        model: "Corolla",
                        vin: "7654321",
                        status: "I"
                    }];
                    spyOn(data, "getVehicles").and.callFake(function () {
                        return helpers.deferredSuccess(vehicles);
                    });
                    vm.getVehicles();
                    
                    vm.vehicleDetails(vm.vehicles()[1]);
                    vm.vehicleDetails().make("Honda 2");

                    spyOn(data, "saveVehicle").and.callFake(function () {
                        return helpers.deferredSuccess(true);
                    });
                    spyOn(window, "alert");
                    spyOn(vm, "hideDetails");

                    // Act
                    vm.saveDetails();

                    // Assert
                    expect(data.saveVehicle).toHaveBeenCalledWith(vm.vehicles()[1].toJSON());
                    expect(window.alert).toHaveBeenCalledWith("Vehicle saved!");
                    expect(vm.hideDetails).toHaveBeenCalled();
                    expect(vm.vehicles()[1].toJSON()).toEqual(vm.vehicleDetails().toJSON());
                });

                it("Should show error when save vehicle returns false", function () {
                    // Arrange
                    var vm = new module.HomeViewModel();
                    var vehicle = {
                        id: 1,
                        make: "Honda",
                        model: "Civic",
                        vin: "1234567",
                        status: "A"
                    };
                    vm.vehicleDetails(new module.Vehicle(vehicle));
                    vm.vehicleDetails().make("Honda 2");

                    spyOn(data, "saveVehicle").and.callFake(function () {
                        return helpers.deferredSuccess(false);
                    });
                    spyOn(window, "alert");
                    spyOn(vm, "hideDetails");

                    // Act
                    vm.saveDetails();

                    // Assert
                    expect(data.saveVehicle).toHaveBeenCalled();
                    expect(window.alert).toHaveBeenCalledWith("An error occurred saving the vehicle");
                    expect(vm.hideDetails).toHaveBeenCalled();
                });
            });
        });
    });