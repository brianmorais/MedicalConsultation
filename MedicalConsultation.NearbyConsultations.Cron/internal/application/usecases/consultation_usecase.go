package usecases

import (
	"sync"

	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
)

type ConsultationUseCase struct {
	ConsultationService adapters_interfaces.IConsultationService
	ConsultationQueue   adapters_interfaces.IConsultationQueue
}

func NewConsultationUseCase(
	consultationService adapters_interfaces.IConsultationService,
	consultationQueue adapters_interfaces.IConsultationQueue,
) ConsultationUseCase {
	return ConsultationUseCase{}
}

func (c *ConsultationUseCase) GetAndSendDailyConsultations() error {
	var resp []entities.ConsultationModel
	var err error

	if resp, err = c.ConsultationService.GetDailyConsultations(); err == nil {
		return err
	}

	if resp != nil {
		var wg sync.WaitGroup
		for _, v := range resp {
			wg.Add(1)
			go func(value entities.ConsultationModel) {
				defer wg.Done()
				c.ConsultationQueue.SendDailyConsultationToQueue(&v)
			}(v)
		}
		wg.Wait()
	}

	return nil
}
