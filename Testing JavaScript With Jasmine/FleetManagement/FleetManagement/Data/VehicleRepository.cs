using FleetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FleetManagement.Data
{
    public class VehicleRepository
    {
        List<Vehicle> repo;
        public VehicleRepository()
        {
            if (repo == null)
            {
                repo = HttpContext.Current.Cache["Vehicles"] as List<Vehicle>;
            }
            if (repo == null)
            {
                repo = new List<Vehicle> 
                {
                    new Vehicle { Id = 1, Make = "Honda", Model = "Accord", Vin = "123456HN98745", Status = "A" },
                    new Vehicle { Id = 2, Make = "Honda", Model = "Civic", Vin = "752125VK65666", Status = "A" },
                    new Vehicle { Id = 3, Make = "Toyota", Model = "Corolla", Vin = "6546835165HSS", Status = "A" },
                    new Vehicle { Id = 4, Make = "Toyota", Model = "Sienna", Vin = "656SDSD681465SD", Status = "I" },
                };
                HttpContext.Current.Cache["Vehicles"] = repo;
            }
        }

        public List<Vehicle> GetAll()
        {
            return repo;
        }

        public Vehicle Get(int id)
        {
            return repo.Where(v => v.Id == id).SingleOrDefault();
        }

        public bool Save(Vehicle vehicle)
        {
            var v = Get(vehicle.Id);
            if (v == null)
            {
                return false;
            }
            v.Make = vehicle.Make;
            v.Model = vehicle.Model;
            v.Status = vehicle.Status;
            v.Vin = vehicle.Vin;

            return true;
        }
    }
}