package adapters_interfaces

import "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"

type IConsultationQueue interface {
	SendDailyConsultationToQueue(c *entities.ConsultationModel) error
}
