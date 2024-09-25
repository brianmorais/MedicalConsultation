package repositories

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	cancel context.CancelFunc
	client *mongo.Client
	ctx    context.Context
)

func ConnectDb() (*mongo.Collection, *context.Context) {
	connStr := os.Getenv("CONNECTION_STRING")
	dbName := os.Getenv("DATABASE_NAME")
	collectionName := os.Getenv("COLLECTION_NAME")

	ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI(connStr)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database(dbName).Collection(collectionName)
	return collection, &ctx
}

func DisconnectDb() {
	if cancel != nil {
		cancel()
	}

	if client != nil {
		if err := client.Disconnect(ctx); err != nil {
			log.Printf("Error while disconnecting from MongoDB: %v", err)
		}
	}
}
