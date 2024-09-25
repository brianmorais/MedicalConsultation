package repositories

import (
	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationRepository struct{}

func NewConsultationRepository() adapters_interfaces.IConsultationRepository {
	return &ConsultationRepository{}
}

func (c *ConsultationRepository) GetDailyConsultations() ([]entities.ConsultationModel, error) {
	return nil, nil
}
