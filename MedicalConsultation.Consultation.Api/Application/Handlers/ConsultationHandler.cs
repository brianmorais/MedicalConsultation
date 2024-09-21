using Application.Interfaces;
using Application.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;

namespace Application.Handlers
{
    public class ConsultationHandler : IConsultationHandler
    {
        private readonly IConsultationRepository _consultationRepository;
        private readonly IDoctorService _doctorService;
        private readonly IPatientService _patientService;
        private readonly IMapper _mapper;

        public ConsultationHandler(
            IConsultationRepository consultationRepository,
            IMapper mapper,
            IDoctorService doctorService,
            IPatientService patientService
        )
        {
            _consultationRepository = consultationRepository;
            _mapper = mapper;
            _doctorService = doctorService;
            _patientService = patientService;
        }

        public async Task<ResponseModel<ConsultationModel>> AddConsultation(ConsultationModel consultation)
        {
            var response = new ResponseModel<ConsultationModel>();

            var consultations = await _consultationRepository.GetAllConsultationsByDoctorId(consultation.DoctorId);
            if (consultations.Any(x => x.ConsultationDate.ToString("yyyy-MM-dd HH:mm") == consultation.ConsultationDate.ToString("yyyy-MM-dd HH:mm")))
            {
                response.SetNotification("The requested time is unavailable.");
            }

            var patient = await _patientService.GetPatientByDocumentNumber(consultation.PatientDocument);
            if (patient == null)
            {
                response.SetNotification("The patient is not registered in the system.");
            }

            if (response.Notifications.Count > 0)
            {
                return response;
            }

            var mapped = _mapper.Map<Consultation>(consultation);
            var scheduled = await _consultationRepository.AddConsultation(mapped);
            response.SetData(_mapper.Map<ConsultationModel>(scheduled));
            return response;
        }

        public async Task<ResponseModel<IList<DoctorModel>>> GetDoctorsAgendaBySpecialityAndDate(string speciality, DateTime date)
        {
            var response = new ResponseModel<IList<DoctorModel>>();
            var doctors = await _doctorService.GetDoctorsBySpeciality(speciality);

            if (doctors == null || !doctors.Any())
            {
                response.SetNotification("No doctors with this specialty were found.");
                return response;
            }

            var doctorsModel = new List<DoctorModel>();
            var lunchHour = 12;
            var endHour = new DateTime(date.Year, date.Month, date.Day, 18, 0, 0);

            foreach (var doctor in doctors)
            {
                var consultations = await _consultationRepository.GetAllConsultationsByDoctorId(doctor.Id);
                var selectedDayConsultations = consultations.Where(c => c.ConsultationDate.Date == date.Date).ToList();

                var model = new DoctorModel();
                model.Id = doctor.Id;
                model.Speciality = speciality;
                model.FirstName = doctor.FirstName;
                model.LastName = doctor.LastName;
                model.SelectedDay = date;
                model.Agenda = new List<AgendaModel>();

                var currentHour = new DateTime(date.Year, date.Month, date.Day, 8, 0, 0);
                
                while (currentHour < endHour)
                {
                    if (currentHour.Hour != lunchHour)
                    {
                        var isBusy = selectedDayConsultations.Any(x => x.ConsultationDate.ToLocalTime().ToString("yyyy-MM-dd HH:mm") == currentHour.ToString("yyyy-MM-dd HH:mm"));
                        model.Agenda.Add(new AgendaModel
                        {
                            DateTime = currentHour,
                            Busy = isBusy,
                        });
                    }

                    currentHour = currentHour.AddMinutes(30);
                }

                doctorsModel.Add(model);
            }

            response.SetData(doctorsModel);
            return response;
        }
    }
}
