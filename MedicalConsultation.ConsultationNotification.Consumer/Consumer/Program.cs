using Consumer.Ioc;
using Consumer.Settings;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<RabbitMqSettings>(builder.Configuration.GetSection("RabbitMqSettings"));

builder.Setup();

builder.Services.AddAutoMapper(typeof(Services.DataMappings.Mappers));

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .Enrich.WithEnvironmentName()
    .Enrich.WithMachineName()
    .Enrich.WithProcessId()
    .Enrich.WithThreadId()
    .WriteTo.Console()
    .WriteTo.DurableHttpUsingTimeRolledBuffers(
        requestUri: builder.Configuration["Services:LokiUrl"] ?? string.Empty,
        bufferBaseFileName: "./logs/buffer",
        period: TimeSpan.FromSeconds(5)
    )
    .CreateLogger();

builder.Host.UseSerilog();

var app = builder.Build();
app.Run();
