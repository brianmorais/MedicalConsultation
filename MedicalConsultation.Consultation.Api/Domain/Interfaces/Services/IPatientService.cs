using Domain.Entities;

namespace Domain.Interfaces.Services
{
    public interface IPatientService
    {
        Task<Patient?> GetPatientByDocumentNumber(string documentNumber);
        Task<IEnumerable<Patient>?> GetPatientsByDocumentNumber(IEnumerable<string> documentNumber);
    }
}
