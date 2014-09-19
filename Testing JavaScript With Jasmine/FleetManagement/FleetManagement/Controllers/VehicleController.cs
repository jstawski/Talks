using FleetManagement.Data;
using FleetManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FleetManagement.Controllers
{
    public class VehicleController : ApiController
    {
        VehicleRepository repo;

        public VehicleController()
        {
            repo = new VehicleRepository();
        }

        // GET: api/Vehicle
        public IEnumerable<Vehicle> Get()
        {
            return repo.GetAll();
        }

        // GET: api/Vehicle/5
        public Vehicle Get(int id)
        {
            return repo.Get(id);
        }

        // POST: api/Vehicle
        public bool Post([FromBody]Vehicle vehicle)
        {
            return repo.Save(vehicle);
        }

    }
}
