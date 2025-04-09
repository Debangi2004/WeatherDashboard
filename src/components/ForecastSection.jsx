import { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarIcon } from '@heroicons/react/24/outline';

const API_KEY = 'c04177443cf52a2898384d13caf44625';

const ForecastSection = ({ city, darkMode }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        // Process forecast data to group by day
        const forecastData = processForecastData(response.data);
        setForecast(forecastData);
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Failed to fetch forecast data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchForecast();
  }, [city]);

  // Process the forecast data to get daily forecasts
  const processForecastData = (data) => {
    const dailyData = {};
    
    // Group forecast data by day
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (!dailyData[day]) {
        dailyData[day] = {
          date: day,
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temps: [],
          icons: [],
          descriptions: []
        };
      }
      
      dailyData[day].temps.push(item.main.temp);
      dailyData[day].icons.push(item.weather[0].icon);
      dailyData[day].descriptions.push(item.weather[0].description);
    });
    
    // Calculate average temperature and get most common icon for each day
    const result = Object.values(dailyData).map(day => {
      const sum = day.temps.reduce((a, b) => a + b, 0);
      const avgTemp = sum / day.temps.length;
      
      // Get the most frequent icon
      const iconCounts = {};
      day.icons.forEach(icon => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
      });
      const mostCommonIcon = Object.entries(iconCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      // Get the most frequent description
      const descCounts = {};
      day.descriptions.forEach(desc => {
        descCounts[desc] = (descCounts[desc] || 0) + 1;
      });
      const mostCommonDesc = Object.entries(descCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      return {
        date: day.date,
        day: day.day,
        temp: Math.round(avgTemp),
        icon: mostCommonIcon,
        description: mostCommonDesc
      };
    });
    
    // Return only the next 5 days
    return result.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="mt-5 flex justify-center">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${darkMode ? 'border-indigo-400' : 'border-indigo-600'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 p-3 rounded-lg bg-red-500/20 text-red-500 text-center text-sm">
        {error}
      </div>
    );
  }

  if (!forecast || forecast.length === 0) {
    return null;
  }

  return (
    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-md mt-3 md:mt-5 ${
      darkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50' 
        : 'bg-white/90 backdrop-blur-sm border border-gray-100'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <CalendarIcon className="h-5 w-5 text-indigo-400" />
        <h3 className="text-base sm:text-lg md:text-xl font-bold">5-Day Forecast</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {forecast.map(day => (
          <div 
            key={day.date} 
            className={`flex flex-col items-center p-3 rounded-lg transition-all hover:scale-105 ${
              darkMode 
                ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/30' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50'
            }`}
          >
            <div className="font-medium text-sm text-indigo-400">{day.day}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description} 
              className="w-14 h-14 my-1 drop-shadow-md"
            />
            <div className="text-lg sm:text-xl md:text-2xl font-medium">{day.temp}°</div>
            <div className="text-xs text-center capitalize text-gray-400 mt-1">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSection; 