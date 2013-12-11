using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;

using Breeze.WebApi;
using Breeze.WebApi.EF;

using MvcApplication1.Models;
namespace MvcApplication1.Controllers {
  
    [BreezeController]
    public class BreezeSampleController : ApiController {

        readonly EFContextProvider<BreezeSampleContext> _contextProvider =
            new EFContextProvider<BreezeSampleContext>();

        [HttpGet]
        public string Metadata() {
            return _contextProvider.Metadata();
        }
        
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle) {
            return _contextProvider.SaveChanges(saveBundle);
        }
        
        [HttpGet]
        public IQueryable<BreezeSampleTodoItem> Todos() {
            return _contextProvider.Context.Todos;
        }

    }
}