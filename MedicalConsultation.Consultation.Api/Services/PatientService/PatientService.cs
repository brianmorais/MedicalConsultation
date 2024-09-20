using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Services;
using Services.Base;
using Services.PatientService.Response;
using System.Text.Json;

namespace Services.PatientService
{
    public class PatientService : IPatientService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public PatientService(HttpClient httpClient, IMapper mapper)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<Patient?> GetPatientByDocumentNumber(string documentNumber)
        {
            var response = await _httpClient.GetAsync($"/api/v1/patients/{documentNumber}");
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var patient = JsonSerializer.Deserialize<Response<PatientModel>>(data);
                return _mapper.Map<Patient>(patient?.Data);
            }

            return null;
        }
    }
}
