import { useQuery } from '@tanstack/react-query';
import { nasaService } from '../services/nasa';

export const useAPOD = (date?: string) => {
  return useQuery({
    queryKey: ['apod', date],
    queryFn: () => nasaService.getAPOD(date),
  });
};

export const useMarsRoverPhotos = (rover: string, earthDate: string) => {
  return useQuery({
    queryKey: ['mars-rover', rover, earthDate],
    queryFn: () => nasaService.getMarsRoverPhotos(rover, earthDate),
    enabled: !!rover && !!earthDate,
  });
};

export const useNEOFeed = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['neo-feed', startDate, endDate],
    queryFn: () => nasaService.getNEOFeed(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};

export const useEPICImages = () => {
  return useQuery({
    queryKey: ['epic-images'],
    queryFn: () => nasaService.getEPICImages(),
  });
};
