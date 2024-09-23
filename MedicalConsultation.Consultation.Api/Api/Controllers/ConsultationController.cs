using Application.Interfaces;
using Application.Models;
using MedicalConsultation.Token.Attributes;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/v1/consultations")]
    public class ConsultationController : ControllerBase
    {
        private readonly ILogger<ConsultationController> _logger;
        private readonly IConsultationHandler _consultationHandler;

        public ConsultationController(ILogger<ConsultationController> logger, IConsultationHandler consultationHandler)
        {
            _logger = logger;
            _consultationHandler = consultationHandler;
        }

        [HttpGet("{speciality}/{dateTime}")]
        [Authorization("admin", "patient", "doctor")]
        public async Task<ActionResult<ResponseModel<IEnumerable<DoctorModel>>>> GetDoctorsAgendaBySpecialityAndDate(string speciality, DateTime dateTime)
        {
            try
            {
                _logger.LogInformation($"[ConsultationController][GetDoctorsAgendaBySpecializationAndDate] - Start get agendas - Speciality: {speciality}, DateTime: {dateTime}");
                var agendas = await _consultationHandler.GetDoctorsAgendaBySpecialityAndDate(speciality, dateTime);
                if (agendas.Notifications.Any())
                {
                    _logger.LogWarning($"[ConsultationController][GetDoctorsAgendaBySpecializationAndDate] - {string.Join(", ", agendas.Notifications)}");
                    return BadRequest(agendas);
                }

                return Ok(agendas);
            }
            catch (Exception ex)
            {
                var response = new ResponseModel<IEnumerable<DoctorModel>>();
                response.SetNotification(ex.Message);
                _logger.LogError($"[ConsultationController][GetDoctorsAgendaBySpecializationAndDate] - {string.Join(", ", response.Notifications)}");
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost]
        [Authorization("admin", "patient")]
        public async Task<ActionResult<ResponseModel<ConsultationModel>>> AddConsultation(ConsultationModel consultation)
        {
            try
            {
                _logger.LogInformation($"[ConsultationController][AddConsultation] - Start consultation schedule.");
                var response = await _consultationHandler.AddConsultation(consultation);
                if (response.Notifications.Any())
                {
                    _logger.LogWarning($"[ConsultationController][AddConsultation] - {string.Join(", ", response.Notifications)}");
                    return BadRequest(response);
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new ResponseModel<ConsultationModel>();
                response.SetNotification(ex.Message);
                _logger.LogError($"[ConsultationController][AddConsultation] - {string.Join(", ", response.Notifications)}");
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}
