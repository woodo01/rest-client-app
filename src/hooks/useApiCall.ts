import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { KeyValue } from '@/hooks/useRequestProperties';

interface UseFetchDataReturn {
  response: Record<string, unknown> | null;
  status: number | null;
  loading: boolean;
  fetchData: (
    endPoint: string,
    method: string,
    body: string,
    headers: KeyValue[],
    variables: KeyValue[]
  ) => Promise<void>;
}

function useFetchData(): UseFetchDataReturn {
  const [response, setResponse] = useState<Record<string, unknown> | null>(
    null
  );
  const [status, setStatus] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(
    endPoint: string,
    method: string,
    body: string,
    headers: KeyValue[],
    variables: KeyValue[]
  ): Promise<void> {
    setResponse({});
    try {
      setLoading(true);
      const res = await axios.post('/api/fetchData', {
        endPoint,
        method,
        body,
        headers,
        variables,
      });

      setStatus(res.status);
      setResponse(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setStatus(error.response?.status || 500);
        setResponse(error.response?.data || 'Error');
      } else {
        setStatus(500);
        setResponse({ message: 'Unknown error' });
      }
    } finally {
      setLoading(false);
    }
  }

  return { response, status, loading, fetchData };
}

export default useFetchData;
