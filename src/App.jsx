import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// OpenWeatherMap API key
const API_KEY = 'c04177443cf52a2898384d13caf44625'
const MAX_RECENT_SEARCHES = 5

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [city, setCity] = useState('')

  const addToRecentSearches = (city) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== city)
      return [city, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    })
  }

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) return
    
    setLoading(true)
    setError('')
    
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      )
      
      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      )
      
      setWeatherData(weatherResponse.data)
      setForecastData(forecastResponse.data)
      addToRecentSearches(searchCity)
    } catch (err) {
      console.error('Error fetching weather data:', err)
      setError(
        err.response?.status === 404
          ? 'City not found. Please check the spelling and try again.'
          : 'Failed to fetch weather data. Please try again later.'
      )
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }

  const refreshWeather = () => {
    if (weatherData) {
      fetchWeather(weatherData.name)
    }
  }

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode)
  }

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recentSearches')
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }

      // Check for saved theme preference
      const savedTheme = localStorage.getItem('darkMode')
      if (savedTheme) {
        setDarkMode(JSON.parse(savedTheme))
      } else {
        // If not saved, default to dark mode
        setDarkMode(true)
      }
    } catch (err) {
      console.error('Error loading saved data:', err)
    }
  }, [])

  // Save recent searches to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    } catch (err) {
      console.error('Error saving recent searches:', err)
    }
  }, [recentSearches])

  // Save theme preference to localStorage when updated
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
      document.body.className = darkMode ? 'dark-mode' : 'light-mode'
    } catch (err) {
      console.error('Error saving theme preference:', err)
    }
  }, [darkMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  // Format forecast data by day
  const formatForecastData = () => {
    if (!forecastData || !forecastData.list) return []

    const groupedByDay = {}
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000)
      const day = date.toLocaleDateString('en-US', { weekday: 'short' })
      const dayKey = date.toISOString().split('T')[0] // YYYY-MM-DD
      
      if (!groupedByDay[dayKey]) {
        groupedByDay[dayKey] = {
          day,
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          temps: [],
          icons: [],
          descriptions: [],
        }
      }
      
      groupedByDay[dayKey].temps.push(item.main.temp)
      groupedByDay[dayKey].icons.push(item.weather[0].icon)
      groupedByDay[dayKey].descriptions.push(item.weather[0].description)
    })

    // Calculate daily summaries
    return Object.values(groupedByDay)
      .map(day => {
        // Get average temperature
        const avgTemp = day.temps.reduce((a, b) => a + b, 0) / day.temps.length
        
        // Get most common icon and description
        const iconCounts = {}
        const descCounts = {}
        
        day.icons.forEach(icon => {
          iconCounts[icon] = (iconCounts[icon] || 0) + 1
        })
        
        day.descriptions.forEach(desc => {
          descCounts[desc] = (descCounts[desc] || 0) + 1
        })
        
        const mostCommonIcon = Object.entries(iconCounts)
          .sort((a, b) => b[1] - a[1])[0][0]
          
        const mostCommonDesc = Object.entries(descCounts)
          .sort((a, b) => b[1] - a[1])[0][0]
        
        return {
          day: day.day,
          date: day.date,
          temp: Math.round(avgTemp),
          icon: mostCommonIcon,
          description: mostCommonDesc,
        }
      })
      .slice(0, 5) // Get only the next 5 days
  }

  const forecast = formatForecastData()

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1>Weather Dashboard</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="main-content">
          {/* Left Side - Search and Recent */}
          <div className="sidebar">
            <div className="search-section">
              <h2>Search City</h2>
              <form onSubmit={handleSubmit} className="search-form">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                  {loading ? '...' : '🔍'}
                </button>
              </form>
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="recent-searches">
                  <h3>Recent Searches</h3>
                  <div className="recent-list">
                    {recentSearches.map((searchCity, index) => (
                      <button
                        key={`${searchCity}-${index}`}
                        onClick={() => fetchWeather(searchCity)}
                        className="recent-button"
                      >
                        {searchCity}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}
            
            {/* Refresh Button (Mobile) */}
            {weatherData && !loading && (
              <button 
                className="refresh-button mobile-only"
                onClick={refreshWeather}
              >
                🔄 Refresh Weather
              </button>
            )}
          </div>

          {/* Right Side - Weather Content */}
          <div className="weather-content">
            {weatherData && !loading ? (
              <div className="weather-display">
                {/* Weather Header */}
                <div className="weather-header">
                  <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                  <p>{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                
                <div className="weather-cards">
                  {/* Current Weather */}
                  <div className="weather-card">
                    <h3>Current Weather</h3>
                    <div className="weather-icon">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                        alt={weatherData.weather[0].description}
                      />
                    </div>
                    <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="description">{weatherData.weather[0].description}</p>
                    <div className="weather-details">
                      <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
                      <p>Humidity: {weatherData.main.humidity}%</p>
                      <p>Wind: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p>
                    </div>
                  </div>
                  
                  {/* Forecast */}
                  <div className="forecast-card">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-list">
                      {forecast.map((day, index) => (
                        <div key={index} className="forecast-day">
                          <p className="day">{day.day}</p>
                          <p className="date">{day.date}</p>
                          <img 
                            src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                            alt={day.description}
                          />
                          <p className="forecast-temp">{day.temp}°C</p>
                          <p className="forecast-desc">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Refresh Button (Desktop) */}
                <button 
                  className="refresh-button desktop-only"
                  onClick={refreshWeather}
                >
                  🔄
                </button>
              </div>
            ) : !loading && !error && (
              <div className="welcome-message">
                <h2>Welcome to Weather Dashboard</h2>
                <p>Search for a city to view current weather and forecast</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
