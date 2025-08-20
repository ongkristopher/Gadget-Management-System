# Default target
.DEFAULT_GOAL := help

help:
	@echo "Available commands:"
	@echo "  make build           - Build all docker images"
	@echo "  make up              - Start all services (detached)"
	@echo "  make down            - Stop all services"
	@echo "  make logs            - Show logs"
	@echo "  make shell           - Open Django shell inside container"
	@echo "  make migrate         - Run Django migrations and load initial data"
	@echo "  make makemigrations  - Create new migrations"
	@echo ""
	@echo "  --- Frontend (Next.js) ---"
	@echo "  make install-frontend - Install frontend dependencies"
	@echo "  make dev-frontend     - Run Next.js dev server"

build:
	docker-compose build

up:
	docker-compose up -d --build

down:
	docker-compose down

logs:
	docker-compose logs -f

shell:
	docker-compose run backend python manage.py shell

migrate:
	docker-compose run backend python manage.py migrate && \
	docker-compose run backend python manage.py load_initial_data

makemigrations:
	docker-compose run backend python manage.py makemigrations

# ---------------- Frontend Commands ----------------
install-frontend:
	cd frontend && npm install

dev-frontend:
	cd frontend && npm run dev