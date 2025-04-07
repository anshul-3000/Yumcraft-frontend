// src/components/Navbar.js
import { BookmarkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ savedCount }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold">Yumcraft</div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-green-400 transition duration-300">Home</a>
          <a href="#" className="hover:text-green-400 transition duration-300">Saved</a>
          <a href="#" className="hover:text-green-400 transition duration-300">About</a>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
          >
            <BookmarkIcon className="w-6 h-6" />
            {savedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded-full">
                {savedCount}
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
