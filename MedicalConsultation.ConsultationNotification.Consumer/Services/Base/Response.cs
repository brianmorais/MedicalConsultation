using System.Text.Json.Serialization;

namespace Services.Base
{
    public class Response<TResponse>
    {
        [JsonPropertyName("data")]
        public TResponse? Data { get; set; }

        [JsonPropertyName("notifications")]
        public IEnumerable<string> Notifications { get; set; } = new List<string>();
    }
}
