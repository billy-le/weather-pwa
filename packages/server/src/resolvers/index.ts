import { currentWeather } from './currentWeather';
import { reverseGeolocation } from './reverseGeolocation';

export const resolvers = {
  Query: {
    currentWeather,
    reverseGeolocation,
  },
};
