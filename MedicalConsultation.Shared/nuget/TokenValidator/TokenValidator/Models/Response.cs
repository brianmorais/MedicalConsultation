using System.Text.Json.Serialization;

namespace TokenValidator.Models
{
    public class Response
    {
        [JsonPropertyName("data")]
        public UserClaims Data { get; set; } = new UserClaims();
    }
}
