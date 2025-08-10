<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

🌦️ Weather App

A responsive and animated weather application built with **React** + **Vite**, using the **OpenWeather API**.  
It supports **current weather**, a **5-day forecast**, location detection via **Geolocation API**, and smooth animations via **GSAP**.

✨ Features

🌍 Detects your current location's weather using geolocation
🔍 Search for any city’s weather
📅 5-day forecast with daily temperature & description
🎬 Smooth animations for UI components
🌓 Light/Dark theme support for better UI/UX
📱 Fully responsive design

📦 Tech Stack

**React + Vite** – Fast development & HMR
**GSAP** – Animations
**OpenWeather API** – Weather data
**CSS** – Styling with custom themes
**JavaScript ES6+** – Modern syntax & features

🚀 Getting Started

1️⃣ Clone the repository

```bash
git clone https://github.com/prachiieee/weather-app.git
cd weather-app
```

2️⃣ Install dependencies

npm install

3️⃣ Get an API key from OpenWeather

1. Sign up at OpenWeather
2. Go to your API Keys section
3. Copy your API key

4️⃣ Add your API key

Create a .env file in the project root:
VITE_APP_ID=your_openweather_api_key_here

5️⃣ Run the development server

npm run dev

📂 Project Structure

weather-app/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images, icons, background videos
│ ├── animations/ # GSAP animation scripts
│ ├── components/ # React components
│ ├── Weather.css # Styles for weather UI
│ ├── Weather.jsx # Main Weather component
│ └── main.jsx # App entry point
│
├── .env # Environment variables (API key)
├── package.json
├── README.md
└── vite.config.js

🎨 Light & Dark Theme

The app automatically adjusts colors for light or dark mode for better readability and reduced eye strain.
Light mode → soft backgrounds & dark text
Dark mode → deep backgrounds & light text

🛠 Available Scripts

- npm run dev – Start the development server
- npm run build – Build the project for production
- npm run preview – Preview the production build locally

📜 License

This project is licensed under the MIT License.
