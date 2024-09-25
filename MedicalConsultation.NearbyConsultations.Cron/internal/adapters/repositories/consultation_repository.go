package repositories

import (
	"log"
	"time"

	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
	"go.mongodb.org/mongo-driver/bson"
)

type ConsultationRepository struct{}

func NewConsultationRepository() adapters_interfaces.IConsultationRepository {
	return &ConsultationRepository{}
}

func (c *ConsultationRepository) GetDailyConsultations() []entities.ConsultationModel {
	collection, ctx := Connect()

	today := time.Now()
	beginDay := time.Date(today.Year(), today.Month(), today.Day(), 0, 0, 0, 0, today.Location())
	endDay := beginDay.Add(24 * time.Hour)

	filter := bson.M{
		"consultationDate": bson.M{
			"$gte": beginDay,
			"$lt":  endDay,
		},
	}

	cursor, err := collection.Find(*ctx, filter)
	if err != nil {
		log.Fatal("Error on find documents:", err)
	}
	defer cursor.Close(*ctx)

	var documents []entities.ConsultationModel
	for cursor.Next(*ctx) {
		var result entities.ConsultationModel
		if err := cursor.Decode(&result); err != nil {
			log.Fatal("Error on decode document:", err)
		}
		documents = append(documents, result)
	}

	if err := cursor.Err(); err != nil {
		log.Fatal("Error in cursor:", err)
	}

	return documents
}
