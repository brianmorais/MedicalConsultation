package entities

import "time"

type ConsultationModel struct {
	Id               string    `json:"id"`
	PatientDocument  string    `json:"patientId"`
	ConsultationDate time.Time `json:"consultationDate"`
	DoctorId         string    `json:"doctorId"`
	Specialit        string    `json:"speciality"`
}
