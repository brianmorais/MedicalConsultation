using MedicalConsultation.Token.Models;

namespace MedicalConsultation.Token.Services
{
    public interface IAuthenticationService
    {
        Task<UserClaims?> ValidateToken(string token);
    }
}
