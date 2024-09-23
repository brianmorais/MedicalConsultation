using System.Text.Json.Serialization;

namespace Application.Models
{
    public class ResponseModel<TResponse> where TResponse : class
    {
        public ResponseModel()
        {
            Data = default;
            Notifications = new List<string>();
        }

        public void SetNotification(string notification)
        {
            Notifications.Add(notification);
        }

        public void SetData(TResponse data)
        {
            Data = data;
        }

        [JsonPropertyName("data")]
        public TResponse? Data { get; set; }

        [JsonPropertyName("notifications")]
        public IList<string> Notifications { get; private set; }
    }
}
