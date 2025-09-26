package models

// Hotel defines the structure for hotel data.
type Hotel struct {
	ID        string  `json:"id"`
	Name      string  `json:"name"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Price     float64 `json:"price,omitempty"`
}
