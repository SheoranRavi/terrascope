package services

import (
	"errors"
	"fmt"
	"terrascope/backend/models"
)

type HotelService interface {
	// Define methods for the hotel service
	GetHotelsInBoundingBox(bbox models.BoundingBox) ([]models.Hotel, error)
}

type hotelService struct {
	osmService OSMService
}

func (h *hotelService) GetHotelsInBoundingBox(bbox models.BoundingBox) ([]models.Hotel, error) {
	if h.osmService == nil {
		return []models.Hotel{}, errors.New("OSM service not initialized")
	}
	// validate bbox
	if bbox.MinLat >= bbox.MaxLat || bbox.MinLon >= bbox.MaxLon {
		return []models.Hotel{}, errors.New("invalid bounding box coordinates")
	}
	// validate ranges
	if bbox.MinLat < -90 || bbox.MaxLat > 90 || bbox.MinLon < -180 || bbox.MaxLon > 180 {
		return []models.Hotel{}, errors.New("bounding box coordinates out of range")
	}
	// validate size (e.g., max 10 degrees in either direction)
	if (bbox.MaxLat-bbox.MinLat) > 10 || (bbox.MaxLon-bbox.MinLon) > 10 {
		return []models.Hotel{}, errors.New("bounding box too large")
	}

	query := `[out:json][timeout:25];
	(
	  node["tourism"="hotel"](` +
		fmt.Sprintf("%f,%f,%f,%f", bbox.MinLat, bbox.MinLon, bbox.MaxLat, bbox.MaxLon) +
		`);
	);
	out body;`

	overpassResp, err := h.osmService.PostRequest(query)
	if err != nil {
		return []models.Hotel{}, err
	}

	var hotels []models.Hotel
	for _, elem := range overpassResp.Elements {
		if elem.Type == "node" {
			hotel := models.Hotel{
				ID:        elem.ID,
				Name:      elem.Tags["name"],
				Latitude:  elem.Lat,
				Longitude: elem.Lon,
			}
			hotels = append(hotels, hotel)
		}
	}
	return hotels, nil
}

func NewHotelService(osmService OSMService) HotelService {
	return &hotelService{
		osmService: osmService,
	}
}
