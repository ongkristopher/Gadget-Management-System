FROM python:alpine3.21

# Install system dependencies for psycopg2
#needed for postgre on alpine 3.21
RUN apk update && apk add --no-cache \
  gcc \
  musl-dev \
  postgresql-dev \
  libpq

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "gadget_management_system.asgi:application"]
