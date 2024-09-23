using Application.Models;
using Bogus;
using Domain.Entities;

namespace Tests.Mocks
{
    public class ConsultationMock
    {
        private readonly Faker _faker = new Faker();

        public ConsultationModel GetConsultationMock()
        {
            return new ConsultationModel
            {
                Id = _faker.Random.AlphaNumeric(10),
                DoctorId = _faker.Random.AlphaNumeric(10),
                PatientDocument = _faker.Random.Int(11).ToString(),
                Speciality = _faker.Name.JobTitle(),
                ConsultationDate = DateTime.Now.AddDays(30),
            };
        }

        public IEnumerable<Consultation> GetConsultationsListMock()
        {
            return new List<Consultation>
            {
                new Consultation
                {
                    Id = _faker.Random.AlphaNumeric(10),
                    DoctorId = _faker.Random.AlphaNumeric(10),
                    PatientDocument = _faker.Random.Int(11).ToString(),
                    Speciality = _faker.Name.JobTitle(),
                    ConsultationDate = DateTime.Now
                },
                new Consultation
                {
                    Id = _faker.Random.AlphaNumeric(10),
                    DoctorId = _faker.Random.AlphaNumeric(10),
                    PatientDocument = _faker.Random.Int(11).ToString(),
                    Speciality = _faker.Name.JobTitle(),
                    ConsultationDate = DateTime.Now
                },
            };
        }

        public Patient GetPatientMock()
        {
            return new Patient
            {
                Id = _faker.Random.AlphaNumeric(10),
                FirstName = _faker.Person.FirstName,
                LastName = _faker.Person.LastName,
                Document = _faker.Random.Int(11).ToString(),
                PhoneNumber = _faker.Person.Phone,
                Email = _faker.Person.Email
            };
        }

        public Consultation GetConsultation(ConsultationModel consultation)
        {
            return new Consultation
            {
                Id = consultation.Id,
                DoctorId = consultation.DoctorId,
                PatientDocument = consultation.PatientDocument,
                Speciality = consultation.Speciality,
                ConsultationDate = consultation.ConsultationDate
            };
        }
    }
}
