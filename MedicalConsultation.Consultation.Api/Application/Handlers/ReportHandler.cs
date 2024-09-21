using Application.Cache;
using Application.Interfaces;
using Application.Models;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;

namespace Application.Handlers
{
    public class ReportHandler : IReportHandler
    {
        private readonly IRedisCache _redisCache;
        private readonly IConsultationRepository _consultationRepository;
        private readonly IDoctorService _doctorService;
        private readonly IPatientService _patientService;

        public ReportHandler(
            IRedisCache redisCache, 
            IConsultationRepository consultationRepository, 
            IDoctorService doctorService, 
            IPatientService patientService
        )
        {
            _redisCache = redisCache;
            _consultationRepository = consultationRepository;
            _doctorService = doctorService;
            _patientService = patientService;
        }

        public async Task<ResponseModel<ReportModel>> GetReport(string doctorId, DateTime startDate, DateTime endDate)
        {
            var cacheKey = $"{doctorId}-{startDate:yyyy-MM-dd}-{endDate:yyyy-MM-dd}";
            var cachedReport = await _redisCache.GetValueAsync<ResponseModel<ReportModel>>(cacheKey);

            if (cachedReport != null)
            {
                return cachedReport;
            }

            var response = new ResponseModel<ReportModel>();

            var consultations = await _consultationRepository.GetConsultationsReport(doctorId, startDate, endDate);
            if (consultations == null)
            {
                response.SetNotification("Report not found");
            }
            else
            {
                var patientDocuments = consultations.Select(c => c.PatientDocument).ToList();
                var doctor = await _doctorService.GetDoctorById(doctorId);
                var patients = await _patientService.GetPatientsByDocumentNumber(patientDocuments);

                if (patients != null && doctor != null)
                {
                    var report = new ReportModel();
                    report.DoctorId = doctorId;
                    report.DoctorFirstName = doctor.FirstName;
                    report.DoctorLastName = doctor.LastName;
                    report.DoctorSpeciality = doctor.Speciality;

                    foreach (var consultation in consultations)
                    {
                        var currentPatient = patients.First(p => p.Document == consultation.PatientDocument);
                        report.Patients.Add(new PatientModel
                        {
                            Id = currentPatient.Id,
                            Document = currentPatient.Document,
                            FirstName = currentPatient.FirstName,
                            LastName = currentPatient.LastName,
                            Email = currentPatient.Email,
                            PhoneNumber = currentPatient.PhoneNumber,
                            ConsultationDate = consultation.ConsultationDate
                        });
                    }

                    response.SetData(report);
                }
                else
                {
                    response.SetNotification("Patients or doctor not found");
                }                
            }

            await _redisCache.SetValueAsync(cacheKey, response);
            return response;
        }
    }
}
