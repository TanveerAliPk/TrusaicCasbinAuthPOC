using Casbin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AccessController : ControllerBase
    {
        private readonly IEnforcer _enforcer;
        private readonly ILogger<AccessController> _logger;

        public AccessController(IEnforcer enforcer, ILogger<AccessController> logger)
        {
            _enforcer = enforcer;
            _logger = logger;
        }

        [HttpPost("check")]
        public async Task<IActionResult> CheckAccess([FromBody] PolicyRequest request)
        {
            // If request.Subject is empty, use the current user from JWT
            var subject = request.Subject;
            if (string.IsNullOrEmpty(subject))
            {
                subject = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value
                          ?? User.Identity?.Name;
            }

            if (string.IsNullOrEmpty(subject))
            {
                return BadRequest("Subject could not be determined from token or request.");
            }

            // Default domain to "global" or empty if not provided
            var domain = request.Domain ?? "";

            var allowed = await _enforcer.EnforceAsync(subject, domain, request.Object, request.Action);

            // Audit Log
            _logger.LogInformation("Access Check: Sub={Subject}, Dom={Domain}, Obj={Object}, Act={Action}, Result={Result}",
                subject, domain, request.Object, request.Action, allowed ? "Allowed" : "Denied");

            return Ok(new { allowed });
        }
    }
}
