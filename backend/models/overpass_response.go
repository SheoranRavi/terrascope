package models

type OverpassResponse struct {
	Elements []OverpassElement `json:"elements"`
}

type OverpassElement struct {
	Type     string             `json:"type"`
	ID       int64              `json:"id"`
	Lat      float64            `json:"lat,omitempty"`
	Lon      float64            `json:"lon,omitempty"`
	Tags     map[string]string  `json:"tags,omitempty"`
	Geometry []OverpassGeometry `json:"geometry,omitempty"`
}

type OverpassGeometry struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}
