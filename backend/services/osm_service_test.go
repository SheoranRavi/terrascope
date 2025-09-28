package services

import (
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"terrascope/backend/models"
	"testing"
)

func NewNoopLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(io.Discard, nil))
}

func TestOSMService_PostRequest(t *testing.T) {
	fakeResp := models.OverpassResponse{
		Elements: []models.OverpassElement{
			{ID: 1, Type: "node"},
		},
	}
	body, _ := json.Marshal(fakeResp)
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Errorf("Expected POST, got %s", r.Method)
		}
		data, _ := io.ReadAll(r.Body)
		if !strings.Contains(string(data), "data=") {
			t.Errorf("Expected data= prefix, got %s", string(data))
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(body)
	}))
	defer server.Close()

	osmService := NewOsmServiceWithClient(server.Client(), server.URL, NewNoopLogger())

	resp, err := osmService.PostRequest("[out:json];node(50.6,7.0,50.8,7.3);out;")
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if len(resp.Elements) != 1 || resp.Elements[0].ID != 1 {
		t.Fatalf("Unexpected response: %v", resp)
	}
}

func TestOSMService_ApiStatus(t *testing.T) {
	status, err := NewOSMService(NewNoopLogger()).ApiStatus()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if status != 200 {
		t.Fatalf("Expected status 200, got %d", status)
	}
}

func TestOSMService_KillQueries(t *testing.T) {
	err := NewOSMService(NewNoopLogger()).KillQueries()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
}
func TestNewOSMService(t *testing.T) {
	svc := NewOSMService(NewNoopLogger())
	if svc == nil {
		t.Fatal("Expected non-nil service")
	}
}
