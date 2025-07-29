# Task: Phonebook App (backend)

This is a full stack phonebook application built during Full Stack Open 2025.

It includes:
- A frontend (React) for managing contacts
- A backend (Node.js + Express) for storing and serving the data

## Live Backend

The backend is deployed on Render: https://full-stack-open-o1yh.onrender.com/

## Features
- JSON-based REST API
- Connected frontend and backend
- Built using React, Node.js, Express
- Add new contacts with name and phone number
- Update an existing contact’s number
- Filter contacts by name
- Delete contacts
- Real-time error handling
- Notifications for success and error events

## Project Structure
- `Full-Stack-Open/`
    -`part2/`
        -`phonebook/` — Frontend (React).
    -`part3/`
        -`phonebook-backend/` — Backend (Express + static build of frontend).

## Technologies
Frontend:
- React
- Vite
- Axios
- ESLint

Backend:
- Node.js
- Express
- Morgan

Deployment:
- Render (backend hosting)
- Static frontend served via Express

## Running Locally
1. **Install dependencies**
   ```bash
    cd part2/phonebook
    npm install
    npm run build
   ```

2. **Copy build to backend**
   ```bash
    Copy-Item -Recurse -Force dist ../part3/phonebook-backend/
   ```
   or
   ```bash
    cd ../../part3/phonebook_backend
    npm run build:ui
   ```

3. **Run backend**
   ```bash
    cd ../part3/phonebook-backend
    npm install
    npm start
   ```

