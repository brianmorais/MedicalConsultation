using Application.Handlers;
using Application.Interfaces;

namespace Api.Ioc
{
    public static class Ioc
    {
        public static void Setup(this IServiceCollection services)
        {
            services.AddScoped<IConsultationHandler, ConsultationHandler>();
        }
    }
}
