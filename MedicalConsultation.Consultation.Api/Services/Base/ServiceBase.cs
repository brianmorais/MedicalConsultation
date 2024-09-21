using Microsoft.Extensions.Configuration;
using System.Text;

namespace Services.Base
{
    public class ServiceBase
    {
        protected readonly string _token;

        public ServiceBase(IConfiguration configuration)
        {
            var basicUserName = configuration["AuthSettings:BasicUserName"];
            var basicPassword = configuration["AuthSettings:BasicPassword"];
            _token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{basicUserName}:{basicPassword}"));
        }
    }
}
