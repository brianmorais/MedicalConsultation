using System.Text.Json.Serialization;

namespace MedicalConsultation.Token.Models
{
    public class Response
    {
        [JsonPropertyName("data")]
        public UserClaims Data { get; set; } = new UserClaims();
    }
}
