using System.Text.Json.Serialization;

namespace Application.Models
{
    public class ConsultationModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("patientDocument")]
        public required string PatientDocument { get; set; } = string.Empty;

        [JsonPropertyName("doctorId")]
        public required string DoctorId { get; set; } = string.Empty;

        [JsonPropertyName("consultationDate")]
        public required DateTime ConsultationDate { get; set; }
    }
}
