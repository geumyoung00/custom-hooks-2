import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   console.log(reqConfig);
  //   console.log(newData);

  // reqConfig = {url, method, body, headers }
  const callHttp = useCallback(async (getTasks, reqConfig) => {
    setIsLoading(true);
    setError(null);

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
      getTasks(data);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, callHttp };
};

export default useHttp;
