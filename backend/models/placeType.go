package models

type PlaceType struct {
	PlaceType string
	Tag       string
}

func (p *PlaceType) Parse() {
	if p.PlaceType == "" {
		panic("placeType can't be empty")
	}
	switch p.PlaceType {
	case "cafe":
		p.Tag = "amenity"
	case "hotel", "resort":
		p.Tag = "tourism"
	default:
		panic("Unsupported placeType")
	}

}
