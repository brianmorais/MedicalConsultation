using System.Text.Json.Serialization;

namespace MedicalConsultation.Token.Models
{
    public class Services
    {
        [JsonPropertyName("AuthUrl")]
        public string AuthUrl { get; set; } = string.Empty;
    }
}
