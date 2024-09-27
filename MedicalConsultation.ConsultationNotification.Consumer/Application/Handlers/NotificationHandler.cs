using Application.Interfaces;
using Application.Models;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Handlers
{
    public class NotificationHandler : INotificationHandler
    {
        private readonly IDoctorService _doctorService;
        private readonly IPatientService _patientService;
        private readonly IEmailService _emailService;
        private readonly IRedisCache _redisCache;

        public NotificationHandler(
            IDoctorService doctorService, 
            IPatientService patientService, 
            IEmailService emailService,
            IRedisCache redisCache
        )
        {
            _doctorService = doctorService;
            _patientService = patientService;
            _emailService = emailService;
            _redisCache = redisCache;
        }

        public async Task Notify(MessageModel? message)
        {
            if (message != null && !string.IsNullOrEmpty(message.DoctorId) && !string.IsNullOrEmpty(message.PatientDocument))
            {
                var doctor = await GetDoctorById(message.DoctorId);
                if (doctor != null)
                {
                    var patient = await _patientService.GetPatientByDocumentNumber(message.PatientDocument);
                    if (patient != null)
                    {
                        var email = new Email
                        {
                            Subject = "Notificação de consulta",
                            Recivers = new List<string> { doctor.Email, patient.Email },
                            Body = $"Consulta agendada para hoje: {DateTime.Now:dd/MM/yyyy HH:mm}"
                        };
                        await _emailService.Send(email);
                    }
                }
            }
        }

        private async Task<Doctor?> GetDoctorById(string doctorId)
        {
            var doctor = await _redisCache.GetValueAsync<Doctor>(doctorId);
            if (doctor == null)
            {
                doctor = await _doctorService.GetDoctorById(doctorId);
                await _redisCache.SetValueAsync(doctorId, doctor);
            }

            return doctor;
        }
    }
}
