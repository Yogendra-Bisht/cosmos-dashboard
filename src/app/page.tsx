import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { APODExplorer } from '@/components/features/APODExplorer';
import { MarsRoverGallery } from '@/components/features/MarsRoverGallery';
import { NEOTracker } from '@/components/features/NEOTracker';
import { EpicEarth } from '@/components/features/EpicEarth';

export default function Home() {
  return (
    <DashboardLayout>
      <APODExplorer />
      <MarsRoverGallery />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <NEOTracker />
        <EpicEarth />
      </div>
    </DashboardLayout>
  );
}
