import WeatherHeader from './WeatherHeader';
import WeatherTemp from './WeatherTemp';
import WeatherDetails from './WeatherDetails';
import WeatherForecast from './WeatherForecast';
import { motion } from 'framer-motion';

const WeatherContent = ({ weatherData, forecastData, darkMode, toggleDarkMode }) => {
  if (!weatherData || !forecastData) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 w-full max-w-4xl mx-auto"
    >
      <WeatherHeader 
        weatherData={weatherData} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherTemp weatherData={weatherData} darkMode={darkMode} />
        <WeatherDetails weatherData={weatherData} darkMode={darkMode} />
      </div>
      
      <WeatherForecast forecastData={forecastData} darkMode={darkMode} />
    </motion.div>
  );
};

export default WeatherContent; 