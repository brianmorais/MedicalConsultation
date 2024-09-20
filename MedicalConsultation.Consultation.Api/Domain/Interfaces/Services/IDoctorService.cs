using Domain.Entities;

namespace Domain.Interfaces.Services
{
    public interface IDoctorService
    {
        Task<IEnumerable<Doctor>?> GetDoctorsBySpeciality(string speciality);
        Task<Doctor?> GetDoctorById(string id);
    }
}
