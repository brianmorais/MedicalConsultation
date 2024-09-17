using Domain.Entities;
using Domain.Interfaces.Services;

namespace Services.DoctorService
{
    public class DoctorService : IDoctorService
    {
        public Task<Doctor> GetDoctorById(string id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Doctor>> GetDoctorsBySpeciality(string speciality)
        {
            throw new NotImplementedException();
        }
    }
}
