using Application.Interfaces;
using Application.Models;
using Domain.Interfaces.Repositories;

namespace Application.Handlers
{
    public class ConsultationHandler : IConsultationHandler
    {
        private readonly IConsultationRepository _consultationRepository;
        public ConsultationHandler(IConsultationRepository consultationRepository)
        {
            _consultationRepository = consultationRepository;
        }

        public Task<ConsultationModel> AddConsultation(ConsultationModel consultation)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ConsultationModel>> GetAllConsultationsByDoctorId(string doctorId)
        {
            throw new NotImplementedException();
        }
    }
}
