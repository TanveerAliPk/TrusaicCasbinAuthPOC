using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PoliciesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PoliciesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/policies/PayParity
        [HttpGet("{product_name}")]
        public async Task<ActionResult<IEnumerable<CasbinPolicy>>> GetPolicies(string product_name)
        {
            return await _context.CasbinPolicies.Where(p => p.Domain == product_name).ToListAsync();
        }

        // POST: api/policies
        [HttpPost]
        public async Task<ActionResult<CasbinPolicy>> PostPolicy(CasbinPolicy policy)
        {
            _context.CasbinPolicies.Add(policy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPolicies", new { product_name = policy.Domain }, policy);
        }

        // DELETE: api/policies
        [HttpDelete]
        public async Task<IActionResult> DeletePolicy([FromBody] CasbinPolicy policy)
        {
            var casbinPolicy = await _context.CasbinPolicies.SingleOrDefaultAsync(p => p.Domain == policy.Domain && p.Subject == policy.Subject && p.Object == policy.Object && p.Action == policy.Action);
            if (casbinPolicy == null)
            {
                return NotFound();
            }

            _context.CasbinPolicies.Remove(casbinPolicy);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
