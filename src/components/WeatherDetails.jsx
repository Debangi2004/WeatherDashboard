import { Wind, Droplets, Eye, Compass, Clock, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherDetails = ({ weatherData, darkMode }) => {
  if (!weatherData) return null;

  const { wind, main, visibility, timezone } = weatherData;
  
  // Convert visibility from meters to kilometers
  const visibilityInKm = (visibility / 1000).toFixed(1);
  
  // Convert wind speed from m/s to km/h
  const windSpeedKmh = (wind.speed * 3.6).toFixed(1);
  
  // Convert direction degrees to cardinal direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };
  
  // Format local time based on timezone
  const getLocalTime = () => {
    const localTime = new Date(Date.now() + timezone * 1000);
    return localTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const detailItems = [
    {
      icon: <Wind size={18} />,
      label: 'Wind',
      value: `${windSpeedKmh} km/h`,
      subValue: getWindDirection(wind.deg)
    },
    {
      icon: <Droplets size={18} />,
      label: 'Humidity',
      value: `${main.humidity}%`
    },
    {
      icon: <Gauge size={18} />,
      label: 'Pressure',
      value: `${main.pressure} hPa`
    },
    {
      icon: <Eye size={18} />,
      label: 'Visibility',
      value: `${visibilityInKm} km`
    },
    {
      icon: <Clock size={18} />,
      label: 'Local Time',
      value: getLocalTime()
    },
    {
      icon: <Compass size={18} />,
      label: 'Wind Direction',
      value: `${wind.deg}°`,
      subValue: getWindDirection(wind.deg)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} transition-all duration-300`}
    >
      <h3 className="text-lg font-semibold mb-4">Weather Details</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {detailItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col p-3 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
          >
            <div className="flex items-center mb-2">
              <span className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {item.icon}
              </span>
              <span className="text-xs opacity-75">{item.label}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{item.value}</span>
              {item.subValue && <span className="text-xs opacity-75">{item.subValue}</span>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherDetails; 