import { useState } from 'react';

const useHttp = (apiData, newData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // apiData = {url, method, body, headers }
  const useConfig = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(apiData.url, {
        method: apiData.method,
        body: JSON.stringify(apiData.body),
        headers: apiData.headers,
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
  };

  return { isLoading, error, useConfig };
};

export default useHttp;
