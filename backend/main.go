package main

import (
	"github.com/gin-gonic/gin"
	"terrascope/backend/api"
	"terrascope/backend/repository"
)

func main() {
	// In a real application, you would initialize your repository like this.
	// For now, we'll follow the TDD approach and it can be nil.
	var hotelRepo repository.HotelRepository = repository.NewHotelRepository()

	r := gin.Default()
	r.GET("/hotels", api.GetHotelsInBoundingBox(hotelRepo))

	// We'll run on port 8080 by default.
	r.Run()
}
