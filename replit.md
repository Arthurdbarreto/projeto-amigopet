# AmigoPet

A full-stack pet management application built with Angular 16 (frontend) and Node.js/Express (backend).

## Overview

AmigoPet helps manage pets, tutors (owners), and users with a clean admin interface based on the PrimeNG Sakai template.

## Architecture

- **Frontend**: Angular 16 + PrimeNG 16 + PrimeFlex, served on port 5000
- **Backend**: Node.js/Express REST API, served on port 3000
- **Database**: SQLite (via sqlite3), stored at `back/db/database.db`
- **Auth**: JWT-based authentication

## Project Structure

```
/back         - Express.js REST API
  /bin/www    - Server entry point
  /db         - SQLite database + initialization
  /middleware - Auth middleware
  /models     - Data models (pet, student, user)
  /routes     - API routes (auth, users, pets, alunos)
  app.js      - Express app configuration
  swagger.js  - Swagger API docs

/front        - Angular 16 SPA
  /src/app
    /layout   - App shell (topbar, sidebar, menu, footer)
    /main     - Business logic (pets, tutors, auth)
    /demo     - Sakai demo components
```

## Running the App

- Frontend: `cd front && npm start` (port 5000)
- Backend: `cd back && npm start` (port 3000)

## Environment Variables

Backend requires a `.env` file in `back/`:
```
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
PORT=3000
```

## User Preferences

- Project language: Portuguese (Brazilian)
- UI: PrimeNG component library with Sakai template
