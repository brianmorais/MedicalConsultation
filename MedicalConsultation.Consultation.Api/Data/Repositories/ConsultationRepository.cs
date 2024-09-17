using Domain.Entities;
using Domain.Interfaces.Repositories;

namespace Data.Repositories
{
    public class ConsultationRepository : IConsultationRepository
    {
        public Task<Consultation> AddConsultation(Consultation consultation)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Consultation>> GetAllConsultationsByDoctorId(string doctorId)
        {
            throw new NotImplementedException();
        }
    }
}
