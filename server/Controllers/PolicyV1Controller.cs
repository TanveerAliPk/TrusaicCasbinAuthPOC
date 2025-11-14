using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Security;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/v1/policies")]
    [ApiKey]
    public class PolicyV1Controller : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PolicyV1Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/v1/policies/PayParity
        [HttpGet("{product_name}")]
        public async Task<ActionResult> GetPolicies(string product_name)
        {
            var model = await System.IO.File.ReadAllTextAsync("casbin_model.conf");
            var policies = await _context.CasbinPolicies.Where(p => p.Domain == product_name).ToListAsync();

            return Ok(new { model, policies });
        }
    }
}
