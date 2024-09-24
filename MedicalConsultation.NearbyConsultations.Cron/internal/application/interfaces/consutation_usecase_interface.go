package application_interfaces

import (
	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
)

type IConsultationUseCase interface {
	GetAndSendDailyConsultations(
		consultationService adapters_interfaces.IConsultationService,
		consultationQueue adapters_interfaces.IConsultationQueue,
	) error
}
