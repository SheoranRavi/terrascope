package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"terrascope/backend/repository"
)

// GetHotelsInBoundingBox is the handler for the /hotels endpoint.
func GetHotelsInBoundingBox(repo repository.HotelRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		minLat, err := strconv.ParseFloat(c.Query("min_lat"), 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid min_lat"})
			return
		}
		minLon, err := strconv.ParseFloat(c.Query("min_lon"), 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid min_lon"})
			return
		}
		maxLat, err := strconv.ParseFloat(c.Query("max_lat"), 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid max_lat"})
			return
		}
		maxLon, err := strconv.ParseFloat(c.Query("max_lon"), 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid max_lon"})
			return
		}

		bbox := repository.BoundingBox{
			MinLat: minLat,
			MinLon: minLon,
			MaxLat: maxLat,
			MaxLon: maxLon,
		}

		// For now, we pass a nil repository.
		// In a real app, you would initialize this properly.
		hotels, err := repo.GetHotelsInBoundingBox(bbox)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch hotels"})
			return
		}

		c.JSON(http.StatusOK, hotels)
	}
}
