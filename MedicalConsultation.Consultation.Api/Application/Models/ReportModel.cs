using System.Text.Json.Serialization;

namespace Application.Models
{
    public class ReportModel
    {
        [JsonPropertyName("doctorId")]
        public string DoctorId { get; set; } = string.Empty;

        [JsonPropertyName("doctorFirstName")]
        public string DoctorFirstName { get; set; } = string.Empty;

        [JsonPropertyName("doctorLastName")]
        public string DoctorLastName { get; set; } = string.Empty;

        [JsonPropertyName("doctorSpeciality")]
        public string DoctorSpeciality { get; set; } = string.Empty;

        [JsonPropertyName("patients")]
        public IList<PatientModel> Patients { get; set; } = new List<PatientModel>();
    }
}
