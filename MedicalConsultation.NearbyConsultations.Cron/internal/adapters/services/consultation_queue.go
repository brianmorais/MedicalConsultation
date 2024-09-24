package services

import (
	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationQueue struct{}

func NewConsultationQueue() adapters_interfaces.IConsultationQueue {
	return &ConsultationQueue{}
}

func (c *ConsultationQueue) SendDailyConsultationToQueue(e *entities.ConsultationModel) error {
	return nil
}
