
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-freshstart flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative w-32 h-32">
            {/* Brain icon - simplified logo */}
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-harmony"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <motion.path
                d="M12 3C7.5 3 4 6.5 4 10C4 11.8 4.6 13.5 5.8 14.8C6.3 15.3 6.5 16 6.4 16.8C6.2 17.9 5.3 18.7 4.3 19.1C3.5 19.4 3 20.1 3 20.9C3 22 3.9 23 5.1 23H6.4C6.7 23 7 22.9 7.3 22.7L8.7 21.8C9.3 21.4 10 21.2 10.7 21.2H13.3C14 21.2 14.7 21.4 15.3 21.8L16.7 22.7C17 22.9 17.3 23 17.6 23H18.9C20.1 23 21 22 21 20.9C21 20.1 20.5 19.4 19.7 19.1C18.7 18.7 17.9 17.8 17.7 16.8C17.5 16 17.7 15.3 18.2 14.8C19.4 13.5 20 11.8 20 10C20 6.5 16.5 3 12 3Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
              <motion.path
                d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
              />
              <motion.path
                d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
              />
              <motion.path
                d="M9 17C10.1046 17 11 16.1046 11 15C11 13.8954 10.1046 13 9 13C7.89543 13 7 13.8954 7 15C7 16.1046 7.89543 17 9 17Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M15 17C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13C13.8954 13 13 13.8954 13 15C13 16.1046 13.8954 17 15 17Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-deepblue"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          MindMosaic
        </motion.h1>
        <motion.p
          className="text-harmony mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Your Mental Wellness Companion
        </motion.p>
      </div>
    </div>
  );
};

export default SplashScreen;
