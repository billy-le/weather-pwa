export const typeDefs = `
scalar JSON

  type Query {
    forecast(latitude: Float, longitude: Float): JSON
  }
`;
