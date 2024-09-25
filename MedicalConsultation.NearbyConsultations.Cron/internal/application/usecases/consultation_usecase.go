package usecases

import (
	"sync"

	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationUseCase struct {
	ConsultationRepository adapters_interfaces.IConsultationRepository
	ConsultationPublisher  adapters_interfaces.IConsultationPublisher
}

func NewConsultationUseCase(
	consultationRepository adapters_interfaces.IConsultationRepository,
	consultationPublisher adapters_interfaces.IConsultationPublisher,
) ConsultationUseCase {
	return ConsultationUseCase{}
}

func (c *ConsultationUseCase) GetAndSendDailyConsultations() {
	var resp []entities.ConsultationModel

	if resp = c.ConsultationRepository.GetDailyConsultations(); resp != nil {
		var wg sync.WaitGroup
		for _, v := range resp {
			wg.Add(1)
			go func(value entities.ConsultationModel) {
				defer wg.Done()
				c.ConsultationPublisher.PublishDailyConsultation(&value)
			}(v)
		}
		wg.Wait()
	}
}
