package publishers

import (
	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationPublisher struct{}

func NewConsultationPublisher() adapters_interfaces.IConsultationPublisher {
	return &ConsultationPublisher{}
}

func (c *ConsultationPublisher) PublishDailyConsultation(e *entities.ConsultationModel) error {
	return nil
}
