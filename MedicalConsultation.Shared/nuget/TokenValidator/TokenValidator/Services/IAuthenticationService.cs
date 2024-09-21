using TokenValidator.Models;

namespace TokenValidator.Services
{
    public interface IAuthenticationService
    {
        Task<UserClaims?> ValidateToken(string token);
    }
}
