using System.Text.Json.Serialization;

namespace MedicalConsultation.Token.Models
{
    public class ValidateTokenRequest
    {
        public ValidateTokenRequest(string token)
        {
            Token = token;
        }

        [JsonPropertyName("token")]
        public string Token { get; set; } = string.Empty;
    }
}
