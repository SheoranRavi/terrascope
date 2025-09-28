package services

import (
	"bytes"
	"encoding/json"
	"log/slog"
	"net/http"
	"terrascope/backend/models"
)

// implement the servce for calling openstreetmaps api
type OSMService interface {
	PostRequest(query string) (models.OverpassResponse, error)
	ApiStatus() (int, error)
	KillQueries() error
}

type osmService struct {
	client           *http.Client
	overpassEndpoint string
	logger           *slog.Logger
}

func (s *osmService) PostRequest(query string) (models.OverpassResponse, error) {
	// Implement the logic to post a request to the Overpass API
	body := bytes.NewBufferString("data=" + query)

	resp, err := s.client.Post(s.overpassEndpoint, "application/x-www-form-urlencoded", body)
	if err != nil {
		s.logger.Error("Failed to post request", "error", err)
		return models.OverpassResponse{}, err
	}
	defer resp.Body.Close()
	var overpassResp models.OverpassResponse
	err = json.NewDecoder(resp.Body).Decode(&overpassResp)
	if err != nil {
		s.logger.Error("Failed to decode response", "error", err)
		return models.OverpassResponse{}, err
	}
	return overpassResp, nil
}

func (s *osmService) ApiStatus() (int, error) {
	// Implement the logic to check the API status
	return 200, nil
}

func (s *osmService) KillQueries() error {
	// Implement the logic to kill ongoing queries
	return nil
}

func NewOSMService(logger *slog.Logger) OSMService {
	return &osmService{
		client:           &http.Client{},
		overpassEndpoint: "https://overpass-api.de/api/interpreter",
		logger:           logger,
	}
}

func NewOsmServiceWithClient(client *http.Client, endpoint string, logger *slog.Logger) OSMService {
	return &osmService{
		client:           client,
		overpassEndpoint: endpoint,
		logger:           logger,
	}
}
