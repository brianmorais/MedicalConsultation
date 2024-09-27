using Application.Cache;
using Application.Handlers;
using Application.Interfaces;
using Consumer.MessageConsumer;
using Domain.Interfaces;
using Services.DoctorService;
using Services.EmailService;
using Services.PatientService;
using StackExchange.Redis;

namespace Consumer.Ioc
{
    public static class Ioc
    {
        public static void Setup(this WebApplicationBuilder builder)
        {
            var services = builder.Services;
            var configuration = builder.Configuration;

            var redisConnection = configuration["Redis:ConnectionString"] ?? string.Empty;
            var doctorServiceUrl = configuration["Services:DoctorUrl"] ?? string.Empty;
            var patientServiceUrl = configuration["Services:PatientUrl"] ?? string.Empty;

            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisConnection));
            services.AddScoped<IRedisCache, RedisCache>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<INotificationHandler, NotificationHandler>();
            services.AddHttpClient<IDoctorService, DoctorService>(options => options.BaseAddress = new Uri(doctorServiceUrl));
            services.AddHttpClient<IPatientService, PatientService>(options => options.BaseAddress = new Uri(patientServiceUrl));
            services.AddHostedService<RabbitMqConsumer>();
        }
    }
}
