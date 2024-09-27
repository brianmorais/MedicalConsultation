using Domain.Entities;
using Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;

        public EmailService(ILogger<EmailService> logger)
        {
            _logger = logger;
        }

        public async Task Send(Email email)
        {
            _logger.LogInformation($"Envio de email: {email.Subject}, {email.Body}, {string.Join(", ", email.Recivers)}");
            await Task.CompletedTask;
        }
    }
}
