import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // reqConfig = {url, method, body, headers }
  const useConfig = useCallback(async (reqConfig, newData) => {
    setIsLoading(true);
    setError(null);

    console.log(reqConfig);
    console.log(newData);

    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method,
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        headers: reqConfig.headers,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      newData(data);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, useConfig };
};

export default useHttp;
