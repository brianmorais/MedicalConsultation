using AutoMapper;
using Domain.Entities;
using Domain.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Services.Base;
using Services.DoctorService.Response;
using System.Text.Json;

namespace Services.DoctorService
{
    public class DoctorService : ServiceBase, IDoctorService
    {
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public DoctorService(HttpClient httpClient, IMapper mapper, IConfiguration configuration) 
            : base(configuration)
        {
            _httpClient = httpClient;
            _mapper = mapper;
        }

        public async Task<Doctor?> GetDoctorById(string id)
        {
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"basic {_token}");
            var response = await _httpClient.GetAsync($"/api/v1/doctors/{id}");
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var doctor = JsonSerializer.Deserialize<Response<DoctorModel>>(data);
                return _mapper.Map<Doctor>(doctor?.Data);
            }

            return null;
        }

        public async Task<IEnumerable<Doctor>?> GetDoctorsBySpeciality(string speciality)
        {
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"basic {_token}");
            var response = await _httpClient.GetAsync($"/api/v1/doctors/speciality/{speciality}");
            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var doctors = JsonSerializer.Deserialize<Response<IEnumerable<DoctorModel>>>(data);
                return _mapper.Map<IEnumerable<Doctor>>(doctors?.Data);
            }

            return null;
        }
    }
}
