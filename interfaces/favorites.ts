import { MediaType } from './apiResults';

export interface Favorite {
  id: number;
  mediaType: MediaType;
  name: string;
  thumb: string;
}
