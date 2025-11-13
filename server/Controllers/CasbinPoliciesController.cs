using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "admin")]
    public class CasbinPoliciesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CasbinPoliciesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/casbinpolicies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CasbinPolicy>>> GetCasbinPolicies()
        {
            return await _context.CasbinPolicies.ToListAsync();
        }

        // GET: api/casbinpolicies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CasbinPolicy>> GetCasbinPolicy(int id)
        {
            var casbinPolicy = await _context.CasbinPolicies.FindAsync(id);

            if (casbinPolicy == null)
            {
                return NotFound();
            }

            return casbinPolicy;
        }

        // POST: api/casbinpolicies
        [HttpPost]
        public async Task<ActionResult<CasbinPolicy>> PostCasbinPolicy(CasbinPolicy casbinPolicy)
        {
            _context.CasbinPolicies.Add(casbinPolicy);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCasbinPolicy", new { id = casbinPolicy.Id }, casbinPolicy);
        }

        // PUT: api/casbinpolicies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCasbinPolicy(int id, CasbinPolicy casbinPolicy)
        {
            if (id != casbinPolicy.Id)
            {
                return BadRequest();
            }

            _context.Entry(casbinPolicy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.CasbinPolicies.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/casbinpolicies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCasbinPolicy(int id)
        {
            var casbinPolicy = await _context.CasbinPolicies.FindAsync(id);
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
