using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IEmailService
    {
        Task Send(Email email);
    }
}
