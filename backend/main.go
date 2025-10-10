package main

import (
	"log/slog"
	"os"
	"terrascope/backend/api"
	"terrascope/backend/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	f, err := os.OpenFile("./logs/app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic("failed to open log file: " + err.Error())
	}
	defer f.Close()
	logger := slog.New(slog.NewTextHandler(f, nil))
	var osmSvc services.OSMService = services.NewOSMService(logger)
	var hotelSvc services.HotelService = services.NewHotelService(osmSvc)
	var searchSvc services.SearchService = services.NewSearchService(osmSvc)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	r.GET("/hotels", api.GetHotelsInBoundingBox(hotelSvc))
	r.GET("/places", api.SearchPlaces(searchSvc))
	r.GET("/health", api.GetHealth)

	// We'll run on port 8080 by default.
	r.Run("localhost:5123")
}
