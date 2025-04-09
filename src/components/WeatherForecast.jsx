import { useState } from 'react';
import { CalendarDaysIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherForecast = ({ forecastData, darkMode }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  if (!forecastData || !forecastData.list) return null;

  // Group forecast data by day
  const groupedByDay = {};
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = {
        day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temps: [],
        icons: [],
        descriptions: [],
        humidity: [],
        wind: []
      };
    }
    
    groupedByDay[dayKey].temps.push(item.main.temp);
    groupedByDay[dayKey].icons.push(item.weather[0].icon);
    groupedByDay[dayKey].descriptions.push(item.weather[0].description);
    groupedByDay[dayKey].humidity.push(item.main.humidity);
    groupedByDay[dayKey].wind.push(item.wind.speed);
  });

  // Calculate daily summaries
  const dailyData = Object.values(groupedByDay)
    .map(day => {
      // Get average temperature
      const avgTemp = day.temps.reduce((a, b) => a + b, 0) / day.temps.length;
      
      // Get most common icon and description
      const iconCounts = {};
      const descCounts = {};
      
      day.icons.forEach(icon => {
        iconCounts[icon] = (iconCounts[icon] || 0) + 1;
      });
      
      day.descriptions.forEach(desc => {
        descCounts[desc] = (descCounts[desc] || 0) + 1;
      });
      
      const mostCommonIcon = Object.entries(iconCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
        
      const mostCommonDesc = Object.entries(descCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      // Average humidity and wind
      const avgHumidity = Math.round(
        day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length
      );
      
      const avgWind = (
        day.wind.reduce((a, b) => a + b, 0) / day.wind.length
      ).toFixed(1);
      
      return {
        day: day.day,
        date: day.date,
        temp: Math.round(avgTemp),
        icon: mostCommonIcon,
        description: mostCommonDesc,
        humidity: avgHumidity,
        wind: avgWind
      };
    })
    .slice(0, 5); // Get only the next 5 days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} transition-all duration-300`}
    >
      <div className="flex items-center gap-2 mb-4">
        <CalendarDaysIcon className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h3 className="text-lg font-semibold">5-Day Forecast</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {dailyData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex flex-col items-center p-3 rounded-lg relative overflow-hidden cursor-pointer transition-all ${
              darkMode 
                ? 'bg-slate-700 hover:bg-slate-600 hover:shadow-lg' 
                : 'bg-gray-50 hover:bg-gray-100 hover:shadow-md'
            }`}
            onMouseEnter={() => setHoveredDay(index)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <div className="text-sm font-semibold">{day.day}</div>
            <div className="text-xs opacity-75 mb-1">{day.date}</div>
            
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
              alt={day.description}
              className="w-16 h-16 my-1"
            />
            
            <div className="text-2xl font-bold">{day.temp}°</div>
            <div className="text-xs text-center mt-1 capitalize opacity-75">{day.description}</div>
            
            {/* Additional info shown on hover */}
            <div 
              className={`absolute inset-0 flex flex-col items-center justify-center p-3 transition-opacity duration-300 ${
                hoveredDay === index 
                  ? 'opacity-100' 
                  : 'opacity-0 pointer-events-none'
              } ${
                darkMode 
                  ? 'bg-slate-700/95' 
                  : 'bg-gray-50/95'
              }`}
            >
              <div className="text-sm font-semibold mb-1">{day.day}, {day.date}</div>
              <div className="text-xl font-bold mb-2">{day.temp}°</div>
              
              <div className="w-full grid grid-cols-2 gap-2 text-center">
                <div>
                  <div className="text-xs opacity-75">Humidity</div>
                  <div className="text-sm font-medium">{day.humidity}%</div>
                </div>
                <div>
                  <div className="text-xs opacity-75">Wind</div>
                  <div className="text-sm font-medium">{day.wind} m/s</div>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-center capitalize">{day.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherForecast; 