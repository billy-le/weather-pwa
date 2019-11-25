import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Main = (): JSX.Element => {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setPosition(position);
      });
    }
  }, []);

  useEffect(() => {
    if (position) {
      axios({
        url: 'http://localhost:8000/graphql',
        method: 'post',
        data: {
          query: `query {
            forecast(latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude})
          }`,
        },
      }).then(result => {
        console.log(result.data.data);
      });
    }
  }, [position]);

  return <div className="container mx-auto text-center pt-40">Hello world</div>;
};
