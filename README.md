
# Gadget Management System

A system to manage devices/gadget

## Tech Stack

Backend - [django-rest-framework](https://www.django-rest-framework.org/)

Database - [postgres](https://www.postgresql.org/)

Frontend - [Next.js](nextjs.org)

Container - [Docker](https://www.docker.com/)

## Environment Variables

To run this project, you will need to create `.env` file inside the following directories:
`/` and `/frontend`. There is a `.env.example` on those directories for your reference.

### Frontend
#### Location
`./frontend/` - location of the frontend. You can check [here](https://github.com/ongkristopher/Gadget-Management-System/blob/main/frontend/.env.example)

#### Variables
`NEXT_PUBLIC_API_URL` - the url of the backend. use in frontend to communicate to the backend.

`POLLING_INTERVAL_IN_MS` - The polling period in the table before fetching a fresh list of Gadgets. (ATTOW. I am unsure how to implement correctly the websocket/channel in Django, I done it on express a long time ago. 😅)

### Backend
#### Location
`./` - Root of the project. You can check [here](https://github.com/ongkristopher/Gadget-Management-System/blob/main/.env.example)

#### Variables
`POSTGRES_USER` - postgres user name.

`POSTGRES_PASSWORD` - db password.

`POSTGRES_DB` - name of the database you want to setup.

`DJANGO_SECRET_KEY` - any string just for secret.

`DJANGO_DEBUG` - I always set it to true.

After finishing setting up environment variables. Let us now proceed to start the container.



## Deployment

Migration is handled in the backend. We have a fixture that is located [here](https://github.com/ongkristopher/Gadget-Management-System/blob/main/backend/gadget_management_system/gadgets/fixtures/initial_data.json):
```bash
  ./backend/gadget_management_system/gadgets/fixtures/initial_data.json
```

To deploy this project, we have a Makefile in the repository that we can use.

Build the image first:
```bash
  make build
```

Start the container:
```bash
  make start
```

If you want to end the container you can now execute this:
```bash
  make down
```

## Sample User Credentials

I've created 2 accounts for testing:

```bash
  username: juandelacruz
  password: password123
```
and
```bash
  username: kristopherong
  password: password123
```

## Ports

Ports used are the following:

Backend - `8000`

Database - `5432`

Frontend - `3000`

