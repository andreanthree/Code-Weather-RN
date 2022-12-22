import {get} from './networking';

export const ENDPOINT = {
  getDaily: async params => get('data/2.5/weather', params),
  getForecast: async params => get('data/2.5/forecast', params),
  getGeocoding: async params => get('geo/1.0/direct', params),
};
