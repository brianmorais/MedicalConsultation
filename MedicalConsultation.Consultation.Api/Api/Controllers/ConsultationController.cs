using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/consultations")]
    public class ConsultationController : ControllerBase
    {
        private readonly ILogger<ConsultationController> _logger;

        public ConsultationController(ILogger<ConsultationController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{speciality}")]
        public IActionResult GetConsultations(string speciality)
        {
            return Ok();
        }

        [HttpPost]
        public IActionResult AddConsultation()
        {
            return Ok();
        }
    }
}
