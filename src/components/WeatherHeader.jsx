import { MapPinIcon, CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherHeader = ({ weatherData, darkMode }) => {
  if (!weatherData) return null;

  const { name, sys } = weatherData;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} transition-all duration-300`}
    >
      <div className="flex items-center mb-3">
        <MapPinIcon className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
      </div>
      
      <div className="flex items-center">
        <CalendarIcon className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <p className="text-sm opacity-75">{currentDate}</p>
      </div>
    </motion.div>
  );
};

export default WeatherHeader; 