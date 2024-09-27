using Application.Interfaces;
using Application.Models;
using Consumer.Settings;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace Consumer.MessageConsumer
{
    public class RabbitMqConsumer : BackgroundService
    {
        private readonly INotificationHandler _notificationHandler;
        private IConnection _connection;
        private IModel _channel;
        private readonly RabbitMqSettings _rabbitMqSettings;

        public RabbitMqConsumer(IOptions<RabbitMqSettings> settings, INotificationHandler notificationHandler)
        {
            _notificationHandler = notificationHandler;
            _rabbitMqSettings = settings.Value;

            var factory = new ConnectionFactory
            {
                HostName = _rabbitMqSettings.HostName,
                UserName = _rabbitMqSettings.UserName,
                Password = _rabbitMqSettings.Password,
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare(_rabbitMqSettings.ExchangeName, ExchangeType.Topic, durable: true);
            _channel.QueueDeclare(_rabbitMqSettings.QueueName, false, false, false, null);

            _channel.QueueBind(_rabbitMqSettings.QueueName, _rabbitMqSettings.ExchangeName, _rabbitMqSettings.ExchangeSub);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (channel, evt) =>
            {
                var content = Encoding.UTF8.GetString(evt.Body.ToArray());
                var message = JsonSerializer.Deserialize<MessageModel>(content);
                _notificationHandler.Notify(message);
                _channel.BasicAck(evt.DeliveryTag, false);
            };

            _channel.BasicConsume(_rabbitMqSettings.QueueName, false, consumer);
            return Task.CompletedTask;
        }
    }
}
