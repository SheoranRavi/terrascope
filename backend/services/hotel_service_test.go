package services

import (
	"terrascope/backend/models"
	"testing"
)

func TestHotelService_GetHotelsInBoundingBox(t *testing.T) {
	// Create a mock OSM service
	mockOSMService := NewMockOSMService()
	hotelService := NewHotelService(mockOSMService)

	// Define a bounding box
	bbox := models.BoundingBox{
		MinLat: 34.0,
		MaxLat: 36.0,
		MinLon: -118.0,
		MaxLon: -116.0,
	}

	// Call the method
	hotels, err := hotelService.GetHotelsInBoundingBox(bbox)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	// Check the result
	if len(hotels) == 0 {
		t.Fatal("expected hotels, got none")
	}
}

func TestHotelService_GetHotelsInBoundingBox_InvalidBBox(t *testing.T) {
	mockOSMService := NewMockOSMService()
	hotelService := NewHotelService(mockOSMService)

	// Define an invalid bounding box
	bbox := models.BoundingBox{
		MinLat: 36.0,
		MaxLat: 34.0, // Invalid: MinLat > MaxLat
		MinLon: -118.0,
		MaxLon: -116.0,
	}

	// Call the method
	_, err := hotelService.GetHotelsInBoundingBox(bbox)
	if err == nil {
		t.Fatal("expected error for invalid bounding box, got none")
	}
}

func NewMockOSMService() OSMService {
	return &mockOSMService{}
}

type mockOSMService struct{}

func (m *mockOSMService) PostRequest(query string) (models.OverpassResponse, error) {
	// Return a mock response
	return models.OverpassResponse{
		Elements: []models.OverpassElement{
			{
				Type: "node",
				ID:   1,
				Lat:  34.05,
				Lon:  -118.25,
				Tags: map[string]string{
					"name": "Mock Hotel",
				},
			},
		},
	}, nil
}

func (m *mockOSMService) ApiStatus() (int, error) {
	return 200, nil
}

func (m *mockOSMService) KillQueries() error {
	return nil
}
