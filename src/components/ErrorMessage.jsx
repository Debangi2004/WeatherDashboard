import { AlertCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center"
    >
      <AlertCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </motion.div>
  );
};

export default ErrorMessage; 