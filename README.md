# Weather Dashboard

A modern, responsive weather dashboard built with React.js and Tailwind CSS. Get real-time weather information for any city using the OpenWeatherMap API.

## Features

- 🔍 Search for any city's weather
- 🌡️ View current temperature, weather conditions, humidity, and wind speed
- 📱 Fully responsive design
- 🕒 Recent search history
- 🎨 Beautiful UI with animations
- 🌓 Loading and error states
- 💾 Persistent recent searches

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (get it from [here](https://openweathermap.org/api))

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd weather-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a copy of the project and replace the API key:

   - Open `src/App.jsx`
   - Replace `YOUR_API_KEY` with your OpenWeatherMap API key

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- React.js
- Tailwind CSS
- Framer Motion
- Axios
- Hero Icons
- Vite

## Project Structure

```
src/
  ├── components/
  │   ├── SearchBar.jsx
  │   ├── WeatherCard.jsx
  │   ├── ErrorMessage.jsx
  │   └── RecentSearches.jsx
  ├── App.jsx
  └── index.css
```

## Deployment

This app can be easily deployed to platforms like Vercel, Netlify, or GitHub Pages. Make sure to:

1. Set up your environment variables for the API key
2. Configure build settings according to the platform
3. Deploy!
