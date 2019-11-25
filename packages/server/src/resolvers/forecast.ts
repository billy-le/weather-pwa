const { DARKSKY_KEY } = process.env;

import axios from 'axios';

export const forecast = (_: null, params: { latitude: number; longitude: number }): any => {
  return axios
    .get(`https://api.darksky.net/forecast/${DARKSKY_KEY}/${params.latitude},${params.longitude}`)
    .then(res => res.data)
    .catch(console.log);
};
