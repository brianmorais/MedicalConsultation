package publishers

import (
	"encoding/json"
	"log"
	"os"

	adapters_interfaces "github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/adapters/interfaces"
	"github.com/brianmorais/MedicalConsultation.NearbyConsultations.Cron/internal/domain/entities"
	"github.com/streadway/amqp"
)

var (
	conn *amqp.Connection
	ch   *amqp.Channel
)

type ConsultationPublisher struct{}

func NewConsultationPublisher() adapters_interfaces.IConsultationPublisher {
	return &ConsultationPublisher{}
}

func logError(err error, message string) {
	if err != nil {
		log.Fatal(message)
	}
}

func (c *ConsultationPublisher) OpenConnection() {
	var err error
	connStr := os.Getenv("RABBITMQ_CONECTION")
	exchangeName := os.Getenv("EXCHANGE_NAME")
	queueName := os.Getenv("QUEUE_NAME")
	exchangeSub := os.Getenv("EXCHANGE_SUB")

	conn, err = amqp.Dial(connStr)
	logError(err, "Error on connect to RabbitMq")

	ch, err = conn.Channel()
	logError(err, "Error on open chanel")

	err = ch.ExchangeDeclare(
		exchangeName,
		amqp.ExchangeTopic,
		true,
		false,
		false,
		false,
		nil,
	)
	logError(err, "Error on declare exchange")

	q, err := ch.QueueDeclare(
		queueName,
		false,
		false,
		false,
		false,
		nil,
	)
	logError(err, "Error on declare queue")

	err = ch.QueueBind(
		q.Name,
		exchangeSub,
		exchangeName,
		false,
		nil,
	)
	logError(err, "Error on bind queue and exchange")
}

func (c *ConsultationPublisher) CloseConnection() {
	conn.Close()
	ch.Close()
}

func (c *ConsultationPublisher) PublishDailyConsultation(e *entities.ConsultationModel) {
	exchangeName := os.Getenv("EXCHANGE_NAME")
	exchangeSub := os.Getenv("EXCHANGE_SUB")

	body, err := json.Marshal(e)
	logError(err, "Error on serealize message")

	err = ch.Publish(
		exchangeName,
		exchangeSub,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		},
	)

	logError(err, "Error on send message")
}
