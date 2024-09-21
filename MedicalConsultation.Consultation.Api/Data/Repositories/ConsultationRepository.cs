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
                & (Builders<ConsultationDataModel>.Filter.Eq(c => c.ConsultationDate.Date, DateTime.Now.Date)
                | Builders<ConsultationDataModel>.Filter.Gt(c => c.ConsultationDate.Date, DateTime.Now.Date));

            var result = await _collection.FindAsync(filter);
            var list = await result.ToListAsync();
            return _mapper.Map<IEnumerable<Consultation>>(list);
        }
    }
}
