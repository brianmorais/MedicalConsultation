using System.Text.Json.Serialization;

namespace TokenValidator.Models
{
    public class UserClaims
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;
    }
}
