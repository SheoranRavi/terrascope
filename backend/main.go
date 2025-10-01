package main

import (
	"log/slog"
	"os"
	"terrascope/backend/api"
	"terrascope/backend/services"

	"github.com/gin-gonic/gin"
)

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	var osmSvc services.OSMService = services.NewOSMService(logger)
	var hotelSvc services.HotelService = services.NewHotelService(osmSvc)

	r := gin.Default()
	r.GET("/hotels", api.GetHotelsInBoundingBox(hotelSvc))
	r.GET("/health", api.GetHealth)

	// We'll run on port 8080 by default.
	r.Run("localhost:5123")
}
