package main

import (
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/publishers"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/repositories"
	usecases "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/application/usecases"
)

func main() {
	consultationUseCase := usecases.NewConsultationUseCase(repositories.NewConsultationRepository(), publishers.NewConsultationPublisher())
	consultationUseCase.GetAndSendDailyConsultations()
}
