using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Services.Base;
using Services.PatientService.Response;
using System.Text;
using System.Text.Json;

namespace Services.PatientService
{
    public class PatientService : ServiceBase, IPatientService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public PatientService(HttpClient httpClient, IMapper mapper, IConfiguration configuration)
            : base(configuration)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<Patient?> GetPatientByDocumentNumber(string documentNumber)
        {
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"basic {_token}");
            var response = await _httpClient.GetAsync($"/api/v1/patients/{documentNumber}");
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var patient = JsonSerializer.Deserialize<Response<PatientModel>>(data);
                return _mapper.Map<Patient>(patient?.Data);
            }

            return null;
        }

        public async Task<IEnumerable<Patient>?> GetPatientsByDocumentNumber(IEnumerable<string> documentNumber)
        {
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"basic {_token}");
            var content = JsonSerializer.Serialize(documentNumber);
            var body = new StringContent(content, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"/api/v1/patients/get-report/{documentNumber}", body);

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var patients = JsonSerializer.Deserialize<IEnumerable<PatientModel>>(responseBody);
                return _mapper.Map<IEnumerable<Patient>>(patients);
            }

            return null;
        }
    }
}
