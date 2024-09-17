using Application.Models;

namespace Application.Interfaces
{
    public interface IConsultationHandler
    {
        Task<ConsultationModel> AddConsultation(ConsultationModel consultation);
        Task<IEnumerable<ConsultationModel>> GetAllConsultationsByDoctorId(string doctorId);
    }
}
