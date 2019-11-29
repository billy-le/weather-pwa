const { NODE_ENV } = process.env;

export const env = {
  server: {
    api: NODE_ENV === 'development' ? 'http://localhost:8000/graphql' : '',
  },
};
