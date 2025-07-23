# Task: Phonebook App

A simple phonebook built with **React** for the frontend and **JSON Server** as a mock backend. This app is covering React basics, forms, state management, and server communication with Axios.

## Features

- Add new contacts with name and phone number
- Update an existing contact’s number
- Filter contacts by name
- Delete contacts
- Real-time error handling
- Notifications for success and error events

## Technologies

- React (with Hooks: `useState`, `useEffect`)
- Axios for HTTP requests
- JSON Server as a fake REST API
- Basic CSS for styling notifications

## Project Structure
- `components/` — Contains UI components of the application.
  - `Filter.jsx` — Input field for filtering contacts by name.
  - `PersonForm.jsx` — Form for adding a new contact.
  - `Persons.jsx` — Displays the list of contacts.
  - `Notification.jsx` — Component for showing success notifications.
  - `NotificationDelete.jsx` — Component for showing delete notifications.
- `services/` — Service modules.
    - `persons.js` — Axios-based API service
- `App.jsx` — Contains the main app component and the courses data.
- `main.jsx` — Entry point of the application. Renders the `App` component.

## Getting Started
0. **Before starting, navigate to the directory:**
    ```bash
   cd part2/phonebook
   ```

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the frontend**
    ```
   npm run dev
   ```

3. **Start the backend**
    ```
   npx json-server --port 3001 --watch db.json
   ```
4. **Start the backend**

http://localhost:5173

## Notes

- JSON Server must be running on port 3001.

- All HTTP errors (e.g., 404 when trying to update a deleted contact) are handled gracefully and shown to the user.

The app was developed following the step-by-step progression of Part 2 of Full Stack Open 2025.