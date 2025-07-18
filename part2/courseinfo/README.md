# Task: Course Information

This React application renders a list of courses and their parts, including the total number of exercises per course. It supports any number of courses and parts dynamically.

## Features
- Displays multiple courses with their corresponding parts
- Calculates and displays total exercises per course
- Uses `Array.prototype.reduce()` for total calculation
- Components are modular and organized in a separate file (`Courses.jsx`)

## Technologies
- React
- JavaScript
- Vite

## Project Structure
- `App.jsx` — Contains the main app component and the courses data.
- `components/Courses.jsx` — Exports the `Courses` component. It maps through all courses and renders a `Course` component for each.
  - `Course` contains subcomponents:
    - `Header` — Renders the course name.
    - `Content` — Renders a list of `Part` components.
    - `Total` — Calculates and displays the total number of exercises.
    - `Part` — Displays individual part name and exercise count.

## Getting Started

```bash
npm install
npm run dev
```
