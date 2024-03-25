.PHONY: $(MAKECMDGOALS)

# default target
help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Commands:"
	@echo "  setup       Setup the application"
	@echo "  up          Start the application"
	@echo "  down        Stop the application"
	@echo "  restart     Restart the application"
	@echo "  test        Run the tests"
	@echo "  test-api    Run the api tests"
	@echo "  test-web    Run the web tests"
	@echo "  api-shell   Run the api container and open a bash shell"
	@echo "  web-shell   Run the web container and open a bash shell"

setup:
	@echo "🛠️ Setting up the application ..."
	docker compose run --rm api mix do deps.get, deps.compile, ecto.setup
	docker compose run --rm -e MIX_ENV=test api mix deps.compile
	docker compose run --rm web npm install
	@echo "🎉 Setup complete!"

# Start the application
up:
	@echo "🚀 Launching the application ..."
	docker compose up -d
	@echo "If successful:"
	@echo "  - access the web application at http://localhost:3006"
	@echo "  - access the api documentation at http://localhost:4005/api"

# Stop the application
down:
	@echo "👋 Stopping the application ..."
	docker compose down

# Restart the application
restart: down up

# Run the tests
test-api:
	@echo "🧪 testing api ..."
	docker compose run --rm -e MIX_ENV=test api mix test

test-web:
	@echo "🕸️ testing web ..."
	docker compose run --rm web npm run test

test: test-api test-web

# Run the api container and open a bash shell
api-shell:
	docker compose run --rm api bash

# Run the web container and open a bash shell
web-shell:
	docker compose run --rm web bash

# requires having wrk installed!
# make benchmark slug=abc123

# To control duration (e.g. 5 seconds instead of 30 seconds).
# make benchmark slug=abc123 duration=5s
duration ?= 30s

benchmark: require-wrk require-slug
	@echo "🔥 Benchmarking ..."
	wrk -s wrk.lua -t12 -c40 -d${duration} http://localhost:4005/api/links/${slug}/visits

require-slug:
ifndef slug
	@echo "🚨 Usage: make benchmark slug=abc123"
	$(error Usage: "make benchmark slug=abc123")
endif

require-wrk:
	@which wrk > /dev/null || { echo "🚨 Error: `wrk` command not found in PATH"; exit 1; }
