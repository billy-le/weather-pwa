const { LOCATION_IQ_KEY } = process.env;

import { queryString } from '../utils';

import axios, { AxiosResponse } from 'axios';

const url = `https://us1.locationiq.com/v1/reverse.php`;

interface ReverseGeolocation {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    cafe: string;
    road: string;
    suburb: string;
    city: string;
    county: string;
    region: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
}

export const reverseGeolocation = (
  _: null,
  params?: {
    lat: number;
    long: number;
    format: 'json' | 'xml';
    'accept-language'?: string;
    zoom?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
    addressdetails?: 0 | 1;
    namedetails?: 0 | 1;
    osm_type?: 'N' | 'W' | 'R';
    osm_id?: number;
    countrycodes?: string;
    json_callback?: string;
    polygon_geojson?: 0 | 1;
    polygon_kml?: 0 | 1;
    polygon_svg?: 0 | 1;
    polygon_text?: 0 | 1;
    extratags?: 0 | 1;
    normalizecity?: 0 | 1;
    statecode?: 0 | 1;
    showdistance?: 0 | 1;
  },
): Promise<AxiosResponse<ReverseGeolocation>> => {
  return axios
    .get(`${url}${queryString(params)}&key=${LOCATION_IQ_KEY}`)
    .then(res => res.data)
    .catch(console.log);
};
