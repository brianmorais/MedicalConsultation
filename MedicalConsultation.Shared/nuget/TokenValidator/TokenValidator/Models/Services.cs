using System.Text.Json.Serialization;

namespace TokenValidator.Models
{
    public class Services
    {
        [JsonPropertyName("AuthUrl")]
        public string AuthUrl { get; set; } = string.Empty;
    }
}
