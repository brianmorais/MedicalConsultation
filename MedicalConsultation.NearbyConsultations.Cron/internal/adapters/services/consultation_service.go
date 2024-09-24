package services

import (
	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationService struct{}

func NewConsultationService() adapters_interfaces.IConsultationService {
	return &ConsultationService{}
}

func (c *ConsultationService) GetDailyConsultations() ([]entities.ConsultationModel, error) {
	return nil, nil
}
