using Application.DataMappings;
using AutoMapper;

namespace Tests.Base
{
    public class TesteBase
    {
        public static Mapper SetupAutoMapper()
        {
            var profile = new Mappers();
            var configuration = new MapperConfiguration(config => config.AddProfile(profile));
            return new Mapper(configuration);
        }
    }
}
