const { OPEN_WEATHER_KEY } = process.env;

import { queryString } from '../utils';

import axios from 'axios';

const url = 'http://api.openweathermap.org/data/2.5/weather';

export const currentWeather = (
  _: null,
  params?: {
    lat?: number;
    lon?: number;
    q?: string;
    id?: number;
    zip?: string;
    units?: 'metric' | 'imperial';
    lang?: string;
  },
): Promise<any> => {
  return axios
    .get(`${url}${queryString(params)}&APPID=${OPEN_WEATHER_KEY}`)
    .then(res => res.data)
    .catch(console.log);
};
