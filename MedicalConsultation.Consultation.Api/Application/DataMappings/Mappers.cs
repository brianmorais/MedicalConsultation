using Application.Models;
using AutoMapper;
using Domain.Entities;

namespace Application.DataMappings
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<Consultation, ConsultationModel>().ReverseMap();
            CreateMap<Consultation[], IEnumerable<ConsultationModel>>().ReverseMap();
        }
    }
}
