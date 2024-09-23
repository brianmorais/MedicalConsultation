using Application.Interfaces;
using Application.Models;
using MedicalConsultation.Token.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/reports")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;
        private readonly IReportHandler _reportHandler;

        public ReportController(ILogger<ReportController> logger, IReportHandler reportHandler)
        {
            _logger = logger;
            _reportHandler = reportHandler;
        }

        [HttpGet("{doctorId}/{startDate}/{endDate}")]
        [Authorization("admin", "doctor")]
        public async Task<ActionResult<ResponseModel<ReportModel>>> GenerateReport(string doctorId, DateTime startDate, DateTime endDate)
        {
            try
            {
                _logger.LogInformation($"[ReportController][GenerateReport] - Start report generation - DoctorId: {doctorId}, StartDate: {startDate}, EndDate: {endDate}");
                var report = await _reportHandler.GetReport(doctorId, startDate, endDate);
                if (report.Notifications.Any())
                {
                    _logger.LogWarning($"[ReportController][GenerateReport] - {string.Join(", ", report.Notifications)}");
                    return BadRequest(report);
                }

                return Ok(report);
            }
            catch (Exception ex)
            {
                var response = new ResponseModel<ReportModel>();
                response.SetNotification(ex.Message);
                _logger.LogError($"[ReportController][GenerateReport] - {string.Join(", ", response.Notifications)}");
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}
