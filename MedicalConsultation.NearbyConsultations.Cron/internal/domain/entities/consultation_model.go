package entities

import "time"

type ConsultationModel struct {
	Id               string    `json:"id" bson:"id"`
	PatientDocument  string    `json:"patientDocument" bson:"patientDocument"`
	ConsultationDate time.Time `json:"consultationDate" bson:"consultationDate"`
	DoctorId         string    `json:"doctorId" bson:"doctorId"`
	Speciality       string    `json:"speciality" bson:"speciality"`
}
