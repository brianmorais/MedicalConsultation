using Application.Handlers;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Moq;
using Tests.Base;
using Tests.Mocks;

namespace Tests.Handlers
{
    public class ConsultationHandlerTest : TesteBase
    {
        private Mock<IConsultationRepository> _consultationRepository = new();
        private Mock<IDoctorService> _doctorService = new();
        private Mock<IPatientService> _patientService = new();

        private ConsultationHandler GetConsultationHandler()
        {
            return new ConsultationHandler(
                _consultationRepository.Object,
                SetupAutoMapper(),
                _doctorService.Object,
                _patientService.Object
            );
        }

        [Fact]
        public async Task ShoudAddConsultation()
        {
            var consultationModel = ConsultationMock.GetConsultationMock();
            var consultationsRepositoryReturn = ConsultationMock.GetConsultationsListMock();
            var patient = ConsultationMock.GetPatientMock();
            var consultationEntity = ConsultationMock.GetConsultation();
            _consultationRepository.Setup(c => c.GetAllConsultationsByDoctorId(consultationModel.DoctorId)).ReturnsAsync(consultationsRepositoryReturn);
            _patientService.Setup(p => p.GetPatientByDocumentNumber(consultationModel.PatientDocument)).ReturnsAsync(patient);
            _consultationRepository.Setup(c => c.AddConsultation(It.IsAny<Consultation>())).ReturnsAsync(consultationEntity);
            var handler = GetConsultationHandler();

            var response = await handler.AddConsultation(consultationModel);

            if (response?.Data == null)
            {
                Assert.Fail("Response is null");
            }
            _consultationRepository.Verify(c => c.GetAllConsultationsByDoctorId(consultationModel.DoctorId), Times.Once);
            _patientService.Verify(p => p.GetPatientByDocumentNumber(consultationModel.PatientDocument), Times.Once);
            _consultationRepository.Verify(c => c.AddConsultation(It.IsAny<Consultation>()), Times.Once);
            Assert.Equal(response.Data.Id, consultationModel.Id);
            Assert.Equal(response.Data.DoctorId, consultationModel.DoctorId);
            Assert.Equal(response.Data.Speciality, consultationModel.Speciality);
            Assert.Equal(response.Data.PatientDocument, consultationModel.PatientDocument);
            Assert.Equal(response.Data.ConsultationDate.Date, consultationModel.ConsultationDate.Date);
        }
    }
}
