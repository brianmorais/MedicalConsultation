using System.Text.Json.Serialization;

namespace Application.Models
{
    public class DoctorModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; } = string.Empty;

        [JsonPropertyName("lastName")]
        public string LastName { get; set; } = string.Empty;

        [JsonPropertyName("speciality")]
        public string Speciality { get; set; } = string.Empty;

        [JsonPropertyName("agenda")]
        public IList<AgendaModel> Agenda { get; set; } = new List<AgendaModel>();
    }
}
