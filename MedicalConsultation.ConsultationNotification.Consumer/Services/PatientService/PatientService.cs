using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Services.Base;
using Services.PatientService.Response;
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
    }
}
