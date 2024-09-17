﻿using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface IConsultationRepository
    {
        Task<Consultation> AddConsultation(Consultation consultation);
        Task<IEnumerable<Consultation>> GetAllConsultationsByDoctorId(string doctorId);
    }
}
