package adapters_interfaces

import "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"

type IConsultationRepository interface {
	GetDailyConsultations() ([]entities.ConsultationModel, error)
}
