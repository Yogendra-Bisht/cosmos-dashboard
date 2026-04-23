'use client';

import { Rocket, Image as ImageIcon, Camera, Globe, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navItems = [
  { name: 'APOD', icon: ImageIcon, id: 'apod' },
  { name: 'Mars Rovers', icon: Camera, id: 'mars' },
  { name: 'NEO Tracker', icon: Activity, id: 'neo' },
  { name: 'Epic Earth', icon: Globe, id: 'epic' },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState('apod');

  return (
    <motion.aside
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full md:w-64 glass border-b md:border-r border-t-0 md:border-y-0 md:border-l-0 min-h-auto md:min-h-screen flex flex-row md:flex-col items-center md:items-stretch justify-between md:justify-start p-3 md:p-6 sticky top-0 z-50 backdrop-blur-xl"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 md:mb-10 text-white pl-2 md:pl-0"
      >
        <div className="bg-primary-600 p-1.5 md:p-2 rounded-xl hidden md:block">
          <Rocket className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h1 className="text-base md:text-xl font-bold tracking-wider">COSMOS</h1>
      </motion.div>

      <nav className="flex md:flex-1 md:flex-col gap-1 md:gap-2 overflow-x-auto md:overflow-visible w-full md:w-auto ml-4 md:ml-0 hide-scrollbar pb-1 md:pb-0 items-center md:items-stretch">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveId(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                'flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-300 relative text-left whitespace-nowrap',
                isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary-600/20 border border-primary-500/50 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
              <Icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              <span className="text-sm md:text-base font-medium relative z-10 hidden sm:inline-block">{item.name}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-gray-500 text-center hidden md:block">
        Powered by NASA Open APIs
      </div>
    </motion.aside>
  );
}
