import { post, get,} from "./networking";

export const ENDPOINT = {
  getDaily: async params => get('data/2.5/weather', params),
  getForecast: async params => get('data/2.5/forecast', params),
};

