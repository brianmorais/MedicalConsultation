using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;
using TokenValidator.Models;

namespace TokenValidator.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly Models.Services _settings;
        public AuthenticationService(IOptions<Models.Services> settings)
        {
            _settings = settings.Value;
        }

        public async Task<UserClaims?> ValidateToken(string token)
        {
            using (var httpClient = new HttpClient())
            {
                var content = JsonSerializer.Serialize(new ValidateTokenRequest(token));
                var body = new StringContent(content, Encoding.UTF8, "application/json");

                var response = await httpClient.PostAsync($"{_settings.AuthUrl}/api/v1/auth/validate", body);
                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var tokenContent = JsonSerializer.Deserialize<Response>(responseBody);
                    return tokenContent?.Data;
                }

                return null;
            }
        }
    }
}
