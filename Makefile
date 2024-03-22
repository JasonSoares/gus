.PHONY: $(MAKECMDGOALS)

setup:
	@echo "🛠️ Setting up the application ..."
	docker compose run --rm api mix do deps.get, deps.compile, ecto.setup
	docker compose run --rm -e MIX_ENV=test api mix deps.compile
	docker compose run --rm web npm install
	@echo "Setup complete!"

# Start the application
up:
	@echo "🚀 Launching the application ..."
	docker compose up -d
	@echo "If successful:"
	@echo "  - access the web application at http://localhost:3005"

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
