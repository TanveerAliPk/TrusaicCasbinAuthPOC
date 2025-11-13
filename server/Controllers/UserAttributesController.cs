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
    public class UserAttributesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserAttributesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/userattributes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAttribute>>> GetUserAttributes()
        {
            return await _context.UserAttributes.ToListAsync();
        }

        // GET: api/userattributes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAttribute>> GetUserAttribute(int id)
        {
            var userAttribute = await _context.UserAttributes.FindAsync(id);

            if (userAttribute == null)
            {
                return NotFound();
            }

            return userAttribute;
        }

        // POST: api/userattributes
        [HttpPost]
        public async Task<ActionResult<UserAttribute>> PostUserAttribute(UserAttribute userAttribute)
        {
            _context.UserAttributes.Add(userAttribute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAttribute", new { id = userAttribute.Id }, userAttribute);
        }

        // PUT: api/userattributes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAttribute(int id, UserAttribute userAttribute)
        {
            if (id != userAttribute.Id)
            {
                return BadRequest();
            }

            _context.Entry(userAttribute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.UserAttributes.Any(e => e.Id == id))
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

        // DELETE: api/userattributes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAttribute(int id)
        {
            var userAttribute = await _context.UserAttributes.FindAsync(id);
            if (userAttribute == null)
            {
                return NotFound();
            }

            _context.UserAttributes.Remove(userAttribute);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
