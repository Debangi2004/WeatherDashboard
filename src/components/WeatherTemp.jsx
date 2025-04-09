import { TemperatureIcon } from 'lucide-react';

const WeatherTemp = ({ weatherData, darkMode }) => {
  const temperature = weatherData?.main?.temp;
  const feels_like = weatherData?.main?.feels_like;
  const tempMin = weatherData?.main?.temp_min;
  const tempMax = weatherData?.main?.temp_max;
  
  if (!weatherData) return null;

  return (
    <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Temperature</h3>
        <TemperatureIcon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
      
      <div className="text-center my-6">
        <span className="text-5xl font-bold">{Math.round(temperature)}°</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <p className="text-sm opacity-75">Feels Like</p>
          <p className="text-xl font-semibold">{Math.round(feels_like)}°</p>
        </div>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <p className="text-sm opacity-75">Min / Max</p>
          <p className="text-xl font-semibold">{Math.round(tempMin)}° / {Math.round(tempMax)}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherTemp; 