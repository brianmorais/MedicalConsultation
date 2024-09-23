using Application.Cache;
using Application.Handlers;
using Application.Interfaces;
using Data.Repositories;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Services.DoctorService;
using Services.PatientService;
using StackExchange.Redis;

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
            var redisConnection = configuration["Redis:ConnectionString"] ?? string.Empty;

            services.AddScoped<MedicalConsultation.Token.Services.IAuthenticationService, MedicalConsultation.Token.Services.AuthenticationService>();
            services.AddScoped<IConsultationHandler, ConsultationHandler>();
            services.AddScoped<IReportHandler, ReportHandler>();
            services.AddScoped<IConsultationRepository, ConsultationRepository>();
            services.AddHttpClient<IDoctorService, DoctorService>(options => options.BaseAddress = new Uri(doctorServiceUrl));
            services.AddHttpClient<IPatientService, PatientService>(options => options.BaseAddress = new Uri(patientServiceUrl));
            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnection));
            services.AddScoped<IRedisCache, RedisCache>();
        }
    }
}
