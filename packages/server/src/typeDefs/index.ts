export const typeDefs = `
  scalar JSON
  type Query {
    currentWeather(lat: Float, lon: Float, zip: String, q: String, id: Int, lang: String, units: String): JSON
    reverseGeolocation(lat: Float, lon: Float, format: String): JSON
  }
`;
