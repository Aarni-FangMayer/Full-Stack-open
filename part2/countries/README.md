# Task: Data for countries

A React-based application to explore data about countries around the world, including weather information for each country's capital.

## Features

- Search countries by name with live filtering
- Display list of matching countries
- Show detailed information about a selected country:
  - Capital, population, area
  - Official languages
  - National flag
  - Сurrent weather in the capital city
    - Temperature
    - Wind speed
    - Weather icon

## Technologies

- React
- Vite
- Axios
- REST Countries API (https://restcountries.com/)
- Open-Meteo API (https://open-meteo.com/)

## Project Structure

- `components/` — Contains UI components of the application.
  - `CountryInfo.jsx` — Contains general information about the selected country.
  - `CountryList.jsx` — Displays the list of countries
  - `SearchForm.jsx` — Contains searching form
  - `Weather.jsx` — Gets weather information from the server and displays it in the application.
- `App.jsx` — Contains the main app component and the courses data.
- `main.jsx` — Entry point of the application. Renders the `App` component.

## Getting Started

0. **Before starting, navigate to the directory:**
    ```bash
   cd part2/countries
   ```

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start**
    ```
   npm run dev
   ```
The app was developed following the step-by-step progression of Part 2 of Full Stack Open 2025.