namespace Domain.Entities
{
    public class Consultation
    {
        public string Id { get; set; } = string.Empty;
        public required string PatientDocument { get; set; } = string.Empty;
        public required string DoctorId { get; set; } = string.Empty;
        public required DateTime ConsultationDate { get; set; }
    }
}
