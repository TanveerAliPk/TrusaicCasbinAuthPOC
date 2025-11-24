using Casbin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IEnforcer _enforcer;

        public CasbinPoliciesController(IEnforcer enforcer)
        {
            _enforcer = enforcer;
        }

        // GET: api/casbinpolicies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<List<string>>>> GetPolicies()
        {
            // Returns raw policies from the enforcer
            return Ok(_enforcer.GetPolicy());
        }

        // POST: api/casbinpolicies
        [HttpPost]
        public async Task<ActionResult> AddPolicy([FromBody] PolicyRequest request)
        {
            if (string.IsNullOrEmpty(request.Subject) || string.IsNullOrEmpty(request.Object) || string.IsNullOrEmpty(request.Action))
            {
                return BadRequest("Subject, Object, and Action are required.");
            }

            // Using domain if present, otherwise assume 3-tuple (or handle based on model)
            bool result;
            if (!string.IsNullOrEmpty(request.Domain))
            {
                result = await _enforcer.AddPolicyAsync(request.Subject, request.Domain, request.Object, request.Action);
            }
            else
            {
                 // If model expects domain (4 args) but user sent empty, we might need to send a placeholder or fail.
                 // Given our new model `p = sub, dom, obj, act`, we MUST provide 4 arguments.
                 // If domain is empty, we pass it as empty string or "global".
                 result = await _enforcer.AddPolicyAsync(request.Subject, request.Domain ?? "", request.Object, request.Action);
            }

            if (result)
            {
                return Ok(new { message = "Policy added successfully." });
            }
            return Conflict(new { message = "Policy already exists." });
        }

        // DELETE: api/casbinpolicies
        [HttpDelete]
        public async Task<ActionResult> RemovePolicy([FromBody] PolicyRequest request)
        {
            bool result = await _enforcer.RemovePolicyAsync(request.Subject, request.Domain ?? "", request.Object, request.Action);

            if (result)
            {
                return Ok(new { message = "Policy removed successfully." });
            }
            return NotFound(new { message = "Policy not found." });
        }
    }
}
