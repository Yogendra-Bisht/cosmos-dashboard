'use client';

import { useEPICImages } from '@/hooks/useNasaData';
import { nasaService } from '@/services/nasa';
import { GlassCard } from '../ui/GlassCard';
import { Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function EpicEarth() {
  const { data, isLoading, isError } = useEPICImages();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <section id="epic" className="scroll-mt-24 md:scroll-mt-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 gap-3"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
          Epic Earth
        </h2>
        <div className="flex items-center gap-2 text-[10px] md:text-xs bg-white/5 rounded-full px-3 py-1.5 border border-white/10 text-gray-400 whitespace-nowrap">
          <Globe className="w-3 h-3" />
          DSCOVR Satellite
        </div>
      </motion.div>

      <GlassCard className="min-h-[300px] md:min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : isError || !data?.length ? (
          <div className="flex items-center justify-center h-64 text-red-400">Failed to load EPIC images</div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {data.slice(0, 6).map((item) => {
              const imageUrl = nasaService.getEPICImageUrl(item.image, item.date);
              
              return (
                <motion.div
                  key={item.identifier}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-3 group"
                >
                  <div className="relative aspect-square rounded-full overflow-hidden bg-black/50 border border-white/10 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-500 shadow-2xl">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      src={imageUrl}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center px-1 md:px-4">
                    <p className="text-[10px] md:text-sm text-gray-300 font-medium">
                      {new Date(item.date).toLocaleString()}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1 line-clamp-2 md:line-clamp-3">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </GlassCard>
    </section>
  );
}
