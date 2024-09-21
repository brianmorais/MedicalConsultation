using Microsoft.AspNetCore.Mvc;
using TokenValidator.Attributes;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/reports")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;

        public ReportController(ILogger<ReportController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{doctorId}/{startDate}/{endDate}")]
        [Authorization("admin, doctor")]
        public IActionResult GenerateReport(string doctorId, DateTime startDate, DateTime endDate)
        {
            return Ok();
        }
    }
}
