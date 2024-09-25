package entities

import "time"

type ConsultationModel struct {
	Id               string    `bson:"id"`
	PatientDocument  string    `bson:"patientDocument"`
	ConsultationDate time.Time `bson:"consultationDate"`
	DoctorId         string    `bson:"doctorId"`
	Speciality       string    `bson:"speciality"`
}
