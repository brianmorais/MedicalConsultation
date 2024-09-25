package main

import (
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/publishers"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/repositories"
	usecases "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/application/usecases"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load("../../.env")
	consultationUseCase := usecases.NewConsultationUseCase(repositories.NewConsultationRepository(), publishers.NewConsultationPublisher())
	consultationUseCase.GetAndSendDailyConsultations()
}
