using AutoMapper;
using Data.Models;
using Domain.Entities;
using Domain.Interfaces.Repositories;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Data.Repositories
{
    public class ConsultationRepository : IConsultationRepository
    {
        private readonly IMongoCollection<ConsultationDataModel> _collection;
        private readonly IMapper _mapper;
            
        public ConsultationRepository(IConfiguration configuration, IMapper mapper)
        {
            var client = new MongoClient(configuration["DatabaseSettings:ConnectionString"]);
            var database = client.GetDatabase(configuration["DatabaseSettings:DatabaseName"]);
            _collection = database.GetCollection<ConsultationDataModel>("consultations");
            _mapper = mapper;
        }

        public async Task<Consultation> AddConsultation(Consultation consultation)
        {
            var consultationDataModel = _mapper.Map<ConsultationDataModel>(consultation);
            await _collection.InsertOneAsync(consultationDataModel);
            var response = _mapper.Map<Consultation>(consultationDataModel);
            return response;
        }

        public async Task<IEnumerable<Consultation>> GetAllConsultationsByDoctorId(string doctorId)
        {
            var filter = Builders<ConsultationDataModel>.Filter.Eq(c => c.DoctorId, doctorId)
                & Builders<ConsultationDataModel>.Filter.Gte(c => c.ConsultationDate, DateTime.Now);

            var result = await _collection.Find(filter).ToListAsync();
            return _mapper.Map<IEnumerable<Consultation>>(result);
        }

        public async Task<IEnumerable<Consultation>> GetConsultationsReport(string doctorId, DateTime startDate, DateTime endDate)
        {
            var filter = Builders<ConsultationDataModel>.Filter.And(
                Builders<ConsultationDataModel>.Filter.Eq(c => c.DoctorId, doctorId),
                Builders<ConsultationDataModel>.Filter.Gte(c => c.ConsultationDate, startDate.Date),
                Builders<ConsultationDataModel>.Filter.Lte(c => c.ConsultationDate, endDate.Date.AddTicks(-1))
            );

            var result = await _collection.Find(filter).ToListAsync();
            return _mapper.Map<IEnumerable<Consultation>>(result);
        }
    }
}
