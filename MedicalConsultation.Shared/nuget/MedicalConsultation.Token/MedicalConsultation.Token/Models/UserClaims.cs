using System.Text.Json.Serialization;

namespace MedicalConsultation.Token.Models
{
    public class UserClaims
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;
    }
}
