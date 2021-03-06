export interface ReverseGeolocation {
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
