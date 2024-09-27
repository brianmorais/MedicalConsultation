using System.Text.Json.Serialization;

namespace Application.Models
{
    public class MessageModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("patientDocument")]
        public string PatientDocument { get; set; } = string.Empty;

        [JsonPropertyName("consultationDate")]
        public DateTime ConsultationDate { get; set; }

        [JsonPropertyName("doctorId")]
        public string DoctorId { get; set; } = string.Empty;

        [JsonPropertyName("speciality")]
        public string Speciality { get; set; } = string.Empty;
    }
}
