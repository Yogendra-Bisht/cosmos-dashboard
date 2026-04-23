'use client';

import { useMemo } from 'react';
import { format, addDays } from 'date-fns';
import { useNEOFeed } from '@/hooks/useNasaData';
import { GlassCard } from '../ui/GlassCard';
import { Activity, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export function NEOTracker() {
  const startDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const endDate = useMemo(() => format(addDays(new Date(), 2), 'yyyy-MM-dd'), []);
  
  const { data, isLoading, isError } = useNEOFeed(startDate, endDate);

  const flatAsteroids = useMemo(() => {
    if (!data) return [];
    const all = Object.values(data.near_earth_objects).flat();
    return all.sort((a, b) => 
      a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach
    );
  }, [data]);

  const tableVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const rowVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <section id="neo" className="scroll-mt-24 md:scroll-mt-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 gap-3"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          NEO Tracker
        </h2>
        <div className="flex items-center gap-2 text-[10px] md:text-xs bg-white/5 rounded-full px-3 py-1.5 border border-white/10 text-gray-400 whitespace-nowrap">
          <Activity className="w-3 h-3" />
          <span className="hidden sm:inline">Live updates </span>({startDate})
        </div>
      </motion.div>

      <GlassCard className="min-h-[300px] md:min-h-[400px] overflow-hidden p-0 md:p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : isError || !data ? (
          <div className="flex items-center justify-center h-64 text-red-400">Failed to load NEO data</div>
        ) : (
          <div className="overflow-x-auto p-4 md:p-0 hide-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-xs md:text-sm text-gray-400">
                  <th className="pb-3 px-4 font-medium">Name</th>
                  <th className="pb-3 px-4 font-medium">Approach Date</th>
                  <th className="pb-3 px-4 font-medium">Diameter (Est.)</th>
                  <th className="pb-3 px-4 font-medium">Velocity (km/h)</th>
                  <th className="pb-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={tableVariants}
                initial="hidden"
                animate="show"
                className="text-xs md:text-sm"
              >
                {flatAsteroids.slice(0, 10).map((neo) => {
                  const approach = neo.close_approach_data[0];
                  const diameterMin = neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1);
                  const diameterMax = neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1);
                  const isHazardous = neo.is_potentially_hazardous_asteroid;

                  return (
                    <motion.tr 
                      key={neo.id}
                      variants={rowVariants}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', scale: 1.01 }}
                      className="border-b border-white/5 transition-colors cursor-default"
                    >
                      <td className="py-4 px-4 font-medium text-gray-200">{neo.name.replace(/[()]/g, '')}</td>
                      <td className="py-4 px-4 text-gray-400">{approach.close_approach_date_full}</td>
                      <td className="py-4 px-4 text-gray-400">{diameterMin} - {diameterMax} m</td>
                      <td className="py-4 px-4 text-gray-400">
                        {parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {isHazardous ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                            <AlertTriangle className="w-3 h-3" />
                            Hazardous
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            Safe
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </section>
  );
}
