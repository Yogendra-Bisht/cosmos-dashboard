'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useMarsRoverPhotos } from '@/hooks/useNasaData';
import { GlassCard } from '../ui/GlassCard';
import { Camera, Calendar, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const rovers = ['Curiosity', 'Opportunity', 'Spirit'];

export function MarsRoverGallery() {
  const [rover, setRover] = useState('Curiosity');
  const [date, setDate] = useState('2024-01-01'); // Using a date that likely has photos
  const { data, isLoading, isError } = useMarsRoverPhotos(rover.toLowerCase(), date);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="mars" className="scroll-mt-24 md:scroll-mt-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col xl:flex-row xl:items-center justify-between mb-6 gap-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          Mars Rover Gallery
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 backdrop-blur-sm">
            {rovers.map((r) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={r}
                onClick={() => setRover(r)}
                className={`px-3 py-1.5 md:px-4 rounded-md text-xs md:text-sm transition-all ${
                  rover === r ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {r}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={date}
              max={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent border-none outline-none text-xs md:text-sm text-gray-200 [color-scheme:dark]"
            />
          </div>
        </div>
      </motion.div>

      <GlassCard className="min-h-[300px] md:min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-64 text-red-400 text-center px-4">NASA Mars API is currently offline. Please try again later.</div>
        ) : !data?.photos?.length ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 p-4 text-center">
            <Camera className="w-12 h-12 mb-4 opacity-20" />
            <p>No photos found for {rover} on this date.</p>
            <p className="text-sm mt-2 opacity-60">Try another date or rover.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {data.photos.slice(0, 12).map((photo) => (
              <motion.div
                key={photo.id}
                variants={itemVariants}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
              >
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6 }}
                  src={photo.img_src}
                  alt={`Mars photo by ${photo.rover.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs md:text-sm font-medium">{photo.camera.full_name}</p>
                  <p className="text-gray-300 text-[10px] md:text-xs">Sol: {photo.sol}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </GlassCard>
    </section>
  );
}
