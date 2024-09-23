using Api.Ioc;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MedicalConsultation.Token.Models.Services>(
    builder.Configuration.GetSection("Services")
);

builder.Setup();

builder.Services.AddAutoMapper(
    typeof(Application.DataMappings.Mappers), 
    typeof(Services.DataMappings.Mappers),
    typeof(Data.DataMappings.Mappers)
);

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
