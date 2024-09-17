using Domain.Entities;
using Domain.Interfaces.Services;

namespace Services.PatientService
{
    public class PatientService : IPatientService
    {
        public Task<Patient> GetPatientByDocumentNumber(string documentNumber)
        {
            throw new NotImplementedException();
        }
    }
}
