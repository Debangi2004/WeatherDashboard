import { ClockIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentSearches = ({ searches, onSelect, darkMode }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full mt-5 p-4 rounded-lg ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-700/70 to-slate-800/70 border border-slate-700/50' 
          : 'bg-gradient-to-br from-gray-50/90 to-gray-100/90 border border-gray-200/50'
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <ClockIcon className="h-4 w-4 text-indigo-400" />
        <h3 className="text-sm font-semibold">Recent Searches</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((city, index) => (
          <motion.button
            key={`${city}-${index}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelect(city)}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
              darkMode
                ? 'bg-gradient-to-r from-slate-600/80 to-slate-700/80 hover:from-slate-500/80 hover:to-slate-600/80 text-gray-200 border border-slate-500/30'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-200/50'
            }`}
          >
            {city}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentSearches; 