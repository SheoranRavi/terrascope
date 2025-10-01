package api

import (
	"net/http"
	"strconv"

	"terrascope/backend/models"
	"terrascope/backend/services"

	"github.com/gin-gonic/gin"
)

// GetHotelsInBoundingBox is the handler for the /hotels endpoint.
func GetHotelsInBoundingBox(svc services.HotelService) gin.HandlerFunc {
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

		bbox := models.BoundingBox{
			MinLat: minLat,
			MinLon: minLon,
			MaxLat: maxLat,
			MaxLon: maxLon,
		}

		hotels, err := svc.GetHotelsInBoundingBox(bbox)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch hotels"})
			return
		}

		c.JSON(http.StatusOK, hotels)
	}
}

func GetHealth(c *gin.Context) {
	healthResp := struct {
		Health string `json:"health"`
	}{
		Health: "Okay",
	}
	c.IndentedJSON(http.StatusOK, healthResp)
}
