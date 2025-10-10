package services

import (
	"errors"
	"fmt"
	"terrascope/backend/models"
)

type SearchService interface {
	// Define methods for the hotel service
	SearchPlaces(bbox models.BoundingBox, placeType models.PlaceType) ([]models.Place, error)
}

type searchService struct {
	osmService OSMService
}

func (h *searchService) SearchPlaces(bbox models.BoundingBox, placeType models.PlaceType) ([]models.Place, error) {
	if h.osmService == nil {
		return []models.Place{}, errors.New("OSM service not initialized")
	}
	// validate bbox
	if bbox.MinLat >= bbox.MaxLat || bbox.MinLon >= bbox.MaxLon {
		return []models.Place{}, errors.New("invalid bounding box coordinates")
	}
	// validate ranges
	if bbox.MinLat < -90 || bbox.MaxLat > 90 || bbox.MinLon < -180 || bbox.MaxLon > 180 {
		return []models.Place{}, errors.New("bounding box coordinates out of range")
	}
	// validate size (e.g., max 10 degrees in either direction)
	if (bbox.MaxLat-bbox.MinLat) > 10 || (bbox.MaxLon-bbox.MinLon) > 10 {
		return []models.Place{}, errors.New("bounding box too large")
	}
	dynamicFilter := fmt.Sprintf(`"%s"="%s"`, placeType.Tag, placeType.PlaceType)
	query := `[out:json][timeout:25];
	(
	  node[` + dynamicFilter + `](` +
		fmt.Sprintf("%f,%f,%f,%f", bbox.MinLat, bbox.MinLon, bbox.MaxLat, bbox.MaxLon) +
		`);
	);
	out body;`

	overpassResp, err := h.osmService.PostRequest(query)
	if err != nil {
		return []models.Place{}, err
	}

	var places []models.Place
	for _, elem := range overpassResp.Elements {
		if elem.Type == "node" {
			place := models.Place{
				ID:        elem.ID,
				Name:      elem.Tags["name"],
				Latitude:  elem.Lat,
				Longitude: elem.Lon,
			}
			places = append(places, place)
		}
	}
	return places, nil
}

func NewSearchService(osmService OSMService) SearchService {
	return &searchService{
		osmService: osmService,
	}
}
