using AutoMapper;
using Domain.Entities;
using Services.DoctorService.Response;
using Services.PatientService.Response;

namespace Services.DataMappings
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<DoctorModel, Doctor>();
            CreateMap<PatientModel, Patient>();
        }
    }
}
