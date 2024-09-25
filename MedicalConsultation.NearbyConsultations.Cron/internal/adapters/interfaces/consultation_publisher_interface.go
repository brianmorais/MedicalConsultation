package adapters_interfaces

import (
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type IConsultationPublisher interface {
	PublishDailyConsultation(c *entities.ConsultationModel)
	OpenConnection()
	CloseConnection()
}
