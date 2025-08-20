# Default target
.DEFAULT_GOAL := help

help:
	@echo "Available commands:"
	@echo "  make build           - Build all docker images"
	@echo "  make start           - Start all services (detached)"
	@echo "  make down            - Stop all services"
	@echo "  make logs            - Show logs"
	@echo "  make shell           - Open Django shell inside container"
	@echo "  make migrate         - Run Django migrations and load initial data"
	@echo "  make makemigrations  - Create new migrations"

build:
	docker compose build

start:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f

shell:
	docker compose run backend python manage.py shell

migrate:
	docker compose run backend python manage.py migrate && \
	docker compose run backend python manage.py load_initial_data

makemigrations:
	docker compose run backend python manage.py makemigrations
