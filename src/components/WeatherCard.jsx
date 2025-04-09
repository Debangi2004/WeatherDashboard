import { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const WeatherCard = ({ data, refreshData, loading, darkMode }) => {
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  
  useEffect(() => {
    if (loading) {
      setLoadingAnimation(true);
    } else {
      const timer = setTimeout(() => {
        setLoadingAnimation(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!data) return null;

  const { 
    name, 
    main: { temp, feels_like, humidity, pressure },
    wind: { speed },
    weather,
    sys: { country }
  } = data;

  // Format temperature values
  const formatTemp = (temperature) => Math.round(temperature);
  
  // Get appropriate weather icon
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  const description = weather[0].description;

  // Handle refresh button click
  const handleRefresh = () => {
    if (!loading) {
      refreshData();
    }
  };

  return (
    <div className={`p-4 sm:p-5 md:p-6 rounded-xl shadow-md transition-all ${
      darkMode 
        ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50' 
        : 'bg-white/90 backdrop-blur-sm border border-gray-100'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{name}, {country}</h2>
            <p className="text-sm sm:text-base md:text-lg capitalize mt-1 text-indigo-400">{description}</p>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className={`p-2 rounded-full transition-all ${
            darkMode 
              ? 'bg-slate-700 hover:bg-slate-600 active:scale-95' 
              : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
          }`}
          aria-label="Refresh weather data"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''} ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center mt-5 md:mt-6">
        <div className="flex items-center mb-5 md:mb-0 md:mr-6">
          <img 
            src={iconUrl} 
            alt={description}
            className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md"
          />
          <div className="ml-2">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold">{formatTemp(temp)}°</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <div className={`p-3 sm:p-4 rounded-lg hover:scale-105 transition-all cursor-default ${
            darkMode 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/30' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50'
          }`}>
            <p className="font-semibold text-sm text-indigo-400">Feels Like</p>
            <p className="text-base sm:text-lg md:text-xl font-medium">{formatTemp(feels_like)}°</p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg hover:scale-105 transition-all cursor-default ${
            darkMode 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/30' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50'
          }`}>
            <p className="font-semibold text-sm text-indigo-400">Humidity</p>
            <p className="text-base sm:text-lg md:text-xl font-medium">{humidity}%</p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg hover:scale-105 transition-all cursor-default ${
            darkMode 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/30' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50'
          }`}>
            <p className="font-semibold text-sm text-indigo-400">Wind Speed</p>
            <p className="text-base sm:text-lg md:text-xl font-medium">{speed} m/s</p>
          </div>
          <div className={`p-3 sm:p-4 rounded-lg hover:scale-105 transition-all cursor-default ${
            darkMode 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600/30' 
              : 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50'
          }`}>
            <p className="font-semibold text-sm text-indigo-400">Pressure</p>
            <p className="text-base sm:text-lg md:text-xl font-medium">{pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;