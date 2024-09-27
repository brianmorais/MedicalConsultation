using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IDoctorService
    {
        Task<Doctor?> GetDoctorById(string id);
    }
}
