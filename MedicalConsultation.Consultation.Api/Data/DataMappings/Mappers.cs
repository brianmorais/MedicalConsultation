using AutoMapper;
using Data.Models;
using Domain.Entities;

namespace Data.DataMappings
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<Consultation, ConsultationDataModel>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<ConsultationDataModel, Consultation>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<ConsultationDataModel[], IEnumerable<Consultation>>();
        }
    }
}
