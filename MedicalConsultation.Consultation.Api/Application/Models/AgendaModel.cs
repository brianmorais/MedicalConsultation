using System.Text.Json.Serialization;

namespace Application.Models
{
    public class AgendaModel
    {
        [JsonPropertyName("dateTime")]
        public DateTime DateTime { get; set; }

        [JsonPropertyName("busy")]
        public bool Busy { get; set; }
    }
}
