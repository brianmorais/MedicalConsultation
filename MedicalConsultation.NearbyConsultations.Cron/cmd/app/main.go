package main

import (
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/services"
	usecases "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/application/useCases"
)

func main() {
	consultationUseCase := usecases.NewConsultationUseCase(services.NewConsultationService(), services.NewConsultationQueue())
	consultationUseCase.GetAndSendDailyConsultations()
}
