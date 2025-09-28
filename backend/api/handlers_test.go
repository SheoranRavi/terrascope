package api

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"terrascope/backend/models"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// MockHotelRepository is a mock implementation of the HotelRepository for testing.
type MockHotelRepository struct {
	GetHotelsFunc func(bbox models.BoundingBox) ([]models.Hotel, error)
}

func (m *MockHotelRepository) GetHotelsInBoundingBox(bbox models.BoundingBox) ([]models.Hotel, error) {
	return m.GetHotelsFunc(bbox)
}

func TestGetHotelsInBoundingBox_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)

	// Setup mock repository
	mockRepo := &MockHotelRepository{
		GetHotelsFunc: func(bbox models.BoundingBox) ([]models.Hotel, error) {
			// We expect these coordinates from the request
			assert.Equal(t, 10.0, bbox.MinLat)
			assert.Equal(t, 20.0, bbox.MinLon)
			assert.Equal(t, 11.0, bbox.MaxLat)
			assert.Equal(t, 21.0, bbox.MaxLon)

			return []models.Hotel{
				{ID: "1", Name: "Test Hotel 1"},
			}, nil
		},
	}

	// Setup router
	router := gin.Default()
	router.GET("/hotels", GetHotelsInBoundingBox(mockRepo))

	// Perform request
	req, _ := http.NewRequest(http.MethodGet, "/hotels?min_lat=10.0&min_lon=20.0&max_lat=11.0&max_lon=21.0", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)
	assert.JSONEq(t, `[{"id":"1","name":"Test Hotel 1","latitude":0,"longitude":0}]`, w.Body.String())
}

func TestGetHotelsInBoundingBox_InvalidParams(t *testing.T) {
	gin.SetMode(gin.TestMode)

	router := gin.Default()
	// Pass a nil repository because the handler should fail before using it.
	router.GET("/hotels", GetHotelsInBoundingBox(nil))

	req, _ := http.NewRequest(http.MethodGet, "/hotels?min_lat=invalid", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}
