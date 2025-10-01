# Makefile for the Terrascope project

# --- Variables ---
# The name of the final binary
BINARY_NAME=terrascope-backend
# The path to the backend source code
BACKEND_DIR=./backend

# --- Commands ---

.PHONY: all build run test clean deps

# Default command, runs when you just type `make`
all: build

# Builds the Go binary
build:
	@echo "Building backend..."
	@cd $(BACKEND_DIR) && go build -o ../$(BINARY_NAME) .
	@echo "Build complete: $(BINARY_NAME)"

# Runs the backend application (builds it first)
run: build
	@echo "Starting backend..."
	@./$(BINARY_NAME)

# Runs all tests in the backend
test:
	@echo "Running backend tests..."
	@cd $(BACKEND_DIR) && go test -v ./...

# Cleans up build artifacts
clean:
	@echo "Cleaning up..."
	@rm -f $(BINARY_NAME)

# Tidies Go module dependencies
deps:
	@echo "Tidying dependencies..."
	@cd $(BACKEND_DIR) && go mod tidy
