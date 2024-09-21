using System.Text.Json.Serialization;

namespace TokenValidator.Models
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
