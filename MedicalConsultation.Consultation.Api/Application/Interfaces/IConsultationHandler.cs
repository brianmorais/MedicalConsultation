using Application.Models;

namespace Application.Interfaces
{
    public interface IConsultationHandler
    {
        Task<ResponseModel<ConsultationModel>> AddConsultation(ConsultationModel consultation);
        Task<ResponseModel<IList<DoctorModel>>> GetDoctorsAgendaBySpecialityAndDate(string speciality, DateTime date);
    }
}
