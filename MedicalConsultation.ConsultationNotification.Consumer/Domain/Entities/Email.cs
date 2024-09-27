namespace Domain.Entities
{
    public class Email
    {
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public IList<string> Recivers { get; set; } = new List<string>();
    }
}
