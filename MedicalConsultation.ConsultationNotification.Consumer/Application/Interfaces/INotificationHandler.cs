using Application.Models;

namespace Application.Interfaces
{
    public interface INotificationHandler
    {
        Task Notify(MessageModel? message);
    }
}
