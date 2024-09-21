using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Data.Models
{
    public class ConsultationDataModel
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("patientDocument")]
        public string PatientDocument { get; set; } = string.Empty;

        [BsonElement("doctorId")]
        public string DoctorId { get; set; } = string.Empty;

        [BsonElement("consultationDate")]
        public DateTime ConsultationDate { get; set; }

        [BsonElement("speciality")]
        public string Speciality { get; set; } = string.Empty;
    }
}
