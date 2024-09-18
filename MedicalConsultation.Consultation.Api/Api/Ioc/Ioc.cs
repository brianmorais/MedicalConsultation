using Application.Handlers;
using Application.Interfaces;
using Data.Repositories;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Services.DoctorService;
using Services.PatientService;

namespace Api.Ioc
{
    public static class Ioc
    {
        public static void Setup(this WebApplicationBuilder builder)
        {
            var services = builder.Services;
            var configuration = builder.Configuration;

            var doctorServiceUrl = configuration["Services:DoctorUrl"] ?? string.Empty;
            var patientServiceUrl = configuration["Services:PatientUrl"] ?? string.Empty;

            services.AddScoped<IConsultationHandler, ConsultationHandler>();
            services.AddScoped<IConsultationRepository, ConsultationRepository>();
            services.AddHttpClient<IDoctorService, DoctorService>(options => options.BaseAddress = new Uri(doctorServiceUrl));
            services.AddHttpClient<IPatientService, PatientService>(options => options.BaseAddress = new Uri(patientServiceUrl));
        }
    }
}
