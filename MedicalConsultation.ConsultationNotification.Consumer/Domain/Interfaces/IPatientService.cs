using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IPatientService
    {
        Task<Patient?> GetPatientByDocumentNumber(string documentNumber);
    }
}
