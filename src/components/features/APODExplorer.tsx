'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { useAPOD } from '@/hooks/useNasaData';
import { GlassCard } from '../ui/GlassCard';
import { Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function APODExplorer() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data, isLoading, isError } = useAPOD(date);

  return (
    <section id="apod" className="scroll-mt-24 md:scroll-mt-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
          Astronomy Picture of the Day
        </h2>
        
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 border border-white/10 shadow-lg backdrop-blur-md">
          <Calendar className="w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={date}
            max={format(new Date(), 'yyyy-MM-dd')}
            onChange={(e) => setDate(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-200 [color-scheme:dark]"
          />
        </div>
      </motion.div>

      <GlassCard className="p-0 overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center justify-center" hoverEffect={false}>
        {isLoading ? (
          <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
        ) : isError || !data ? (
          <div className="text-red-400 p-8 text-center">Failed to load APOD data</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-[300px] md:h-[400px] lg:h-auto bg-black overflow-hidden"
            >
              {data.media_type === 'video' ? (
                <iframe
                  src={data.url}
                  title={data.title}
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
              ) : (
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={data.hdurl || data.url}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 md:p-8 flex flex-col justify-center"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{data.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6 flex flex-wrap items-center gap-2">
                <span>{data.date}</span>
                {data.copyright && (
                  <>
                    <span className="hidden md:inline">•</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">© {data.copyright}</span>
                  </>
                )}
              </p>
              <div className="text-gray-300 leading-relaxed text-sm max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-white/10">
                {data.explanation}
              </div>
            </motion.div>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
