using Application.Models;
using Domain.Entities;

namespace Tests.Mocks
{
    public class ConsultationMock
    {
        public static ConsultationModel GetConsultationMock()
        {
            return new ConsultationModel
            {
                Id = "id",
                DoctorId = "doctorId",
                PatientDocument = "patientDocument",
                Speciality = "speciality",
                ConsultationDate = DateTime.Now.AddDays(30),
            };
        }

        public static IEnumerable<Consultation> GetConsultationsListMock()
        {
            return new List<Consultation>
            {
                new Consultation
                {
                    Id = "id",
                    DoctorId = "doctorId",
                    PatientDocument = "patientDocument",
                    Speciality = "speciality",
                    ConsultationDate = DateTime.Now
                },
                new Consultation
                {
                    Id = "id 2",
                    DoctorId = "doctorId 2",
                    PatientDocument = "patientDocument 2",
                    Speciality = "speciality 2",
                    ConsultationDate = DateTime.Now
                },
            };
        }

        public static Patient GetPatientMock()
        {
            return new Patient
            {
                Id = "id",
                FirstName = "firstName",
                LastName = "lastName",
                Document = "document",
                PhoneNumber = "phoneNumber",
                Email = "email"
            };
        }

        public static Consultation GetConsultation()
        {
            return new Consultation
            {
                Id = "id",
                DoctorId = "doctorId",
                PatientDocument = "patientDocument",
                Speciality = "speciality",
                ConsultationDate = DateTime.Now.AddDays(30)
            };
        }
    }
}
