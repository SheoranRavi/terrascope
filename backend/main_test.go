package main

import (
	"log/slog"
	"net/http"
	"net/http/httptest"
	"os"
	"terrascope/backend/api"
	"terrascope/backend/services"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// This file can be used for integration tests across the whole service.
// The tests in `api/handlers_test.go` are more focused unit tests.

func TestHotelsEndpointIntegration(t *testing.T) {
	// integration test to call the /hotels endpoint and check response
	gin.SetMode(gin.TestMode)
	f, err := os.OpenFile("./logs/test.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		t.Fatalf("failed to open log file: %v", err)
	}
	defer f.Close()
	// Setup router with real services (or mocked ones if preferred)
	router := gin.Default()

	logger := slog.New(slog.NewTextHandler(f, nil))
	var osmSvc services.OSMService = services.NewOSMService(logger)
	var hotelSvc services.HotelService = services.NewHotelService(osmSvc)
	router.GET("/hotels", api.GetHotelsInBoundingBox(hotelSvc))
	router.GET("/health", api.GetHealth)
	// Perform request
	req, _ := http.NewRequest(http.MethodGet, "/hotels?min_lat=10.0&min_lon=20.0&max_lat=11.0&max_lon=21.0", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)
	// Further assertions would depend on the expected response
}
