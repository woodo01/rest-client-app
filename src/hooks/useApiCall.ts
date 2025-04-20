import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { KeyValue } from '@/hooks/useRequestProperties';
import useRequestVariables from '@/variables/hooks/useRequestVariables';

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
  const { variables: globalVariables } = useRequestVariables();

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
      const mergedVariables = [
        ...new Map(
          [...globalVariables, ...variables].map((obj) => [obj.key, obj])
        ).values(),
      ];
      const res = await axios.post('/api/fetchData', {
        endPoint,
        method,
        body,
        headers,
        variables: mergedVariables,
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
