using Application.Interfaces;
using Application.Models;
using Microsoft.AspNetCore.Mvc;
using TokenValidator.Attributes;

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
                var agendas = await _consultationHandler.GetDoctorsAgendaBySpecialityAndDate(speciality, dateTime);
                if (agendas.Notifications.Any())
                {
                    return BadRequest(agendas);
                }

                return Ok(agendas);
            }
            catch (Exception ex)
            {
                var response = new ResponseModel<IEnumerable<DoctorModel>>();
                response.SetNotification(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost]
        [Authorization("admin", "patient")]
        public async Task<ActionResult<ResponseModel<ConsultationModel>>> AddConsultation(ConsultationModel consultation)
        {
            try
            {
                var response = await _consultationHandler.AddConsultation(consultation);
                if (response.Notifications.Any())
                {
                    return BadRequest(response);
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new ResponseModel<ConsultationModel>();
                response.SetNotification(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}
