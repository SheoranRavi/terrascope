package repository

import "terrascope/backend/models"

// BoundingBox defines the geographical area to search within.
type BoundingBox struct {
	MinLat float64
	MinLon float64
	MaxLat float64
	MaxLon float64
}

// HotelRepository defines the interface for hotel data operations.
type HotelRepository interface {
	GetHotelsInBoundingBox(bbox BoundingBox) ([]models.Hotel, error)
}

// NewHotelRepository creates a new instance of the hotel repository.
// For now, it returns nil. In the future, it will return a concrete implementation.
func NewHotelRepository() HotelRepository {
	// TODO: Implement a real hotel repository (e.g., that calls Google Places API)
	return nil
}
