import axios from 'axios';
import { APODResponse, EPICImage, MarsRoverResponse, NEOFeedResponse } from '../types/nasa';

const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const nasaService = {
  getAPOD: async (date?: string): Promise<APODResponse> => {
    const params = date ? { date } : {};
    const { data } = await api.get<APODResponse>('/planetary/apod', { params });
    return data;
  },

  getMarsRoverPhotos: async (rover: string, earthDate: string): Promise<MarsRoverResponse> => {
    const { data } = await api.get<MarsRoverResponse>(`/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: { earth_date: earthDate },
    });
    return data;
  },

  getNEOFeed: async (startDate: string, endDate: string): Promise<NEOFeedResponse> => {
    const { data } = await api.get<NEOFeedResponse>('/neo/rest/v1/feed', {
      params: { start_date: startDate, end_date: endDate },
    });
    return data;
  },

  getEPICImages: async (): Promise<EPICImage[]> => {
    const { data } = await api.get<EPICImage[]>('/EPIC/api/natural');
    return data;
  },

  getEPICImageUrl: (imageName: string, dateStr: string): string => {
    // EPIC date format for URL is YYYY/MM/DD
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageName}.png`;
  }
};
