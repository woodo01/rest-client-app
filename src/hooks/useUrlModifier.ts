import { useEffect, useMemo, useState } from 'react';
import { KeyValue } from '@/hooks/useRequestProperties';
import debounce from 'lodash/debounce';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { decodeFromBase64, encodeToBase64 } from '@/lib/base64';
import { HTTP_METHOD } from 'next/dist/server/web/http';

function getInitialEndPointState(slug: string[] | undefined): string {
  if (slug && slug.length > 0) {
    return decodeFromBase64(slug?.[0]);
  }

  return 'https://';
}

function getInitialBodyState(slug: string[] | undefined): string {
  if (slug && slug.length > 1) {
    return JSON.parse(decodeFromBase64(slug?.[1])).body;
  }

  return '';
}

function getInitialHeadersState(
  searchParams: ReadonlyURLSearchParams
): KeyValue[] {
  if (searchParams.size > 0) {
    return Array.from(searchParams).map((item) => ({
      key: item[0],
      value: item[1],
    }));
  }

  return [];
}

function getInitialVariablesState(slug: string[] | undefined): KeyValue[] {
  if (!slug) return [];

  if (slug && slug.length > 1) {
    return JSON.parse(decodeFromBase64(slug?.[1])).variables;
  }

  return [];
}

interface UseUrlModifierReturn {
  endPoint: string;
  setEndPoint: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  headers: KeyValue[];
  setHeaders: React.Dispatch<React.SetStateAction<KeyValue[]>>;
  variables: KeyValue[];
  setVariables: React.Dispatch<React.SetStateAction<KeyValue[]>>;
  historyPath: string;
}

function useUrlModifier(
  slug: string[] | undefined,
  searchParams: ReadonlyURLSearchParams,
  method: HTTP_METHOD
): UseUrlModifierReturn {
  const [endPoint, setEndPoint] = useState<string>(
    getInitialEndPointState(slug)
  );

  const [body, setBody] = useState<string>(getInitialBodyState(slug));
  const [headers, setHeaders] = useState<KeyValue[]>(
    getInitialHeadersState(searchParams)
  );
  const [variables, setVariables] = useState<KeyValue[]>(
    getInitialVariablesState(slug)
  );

  const [historyPath, setHistoryPath] = useState<string>('');

  const debouncedNavigate = useMemo(
    () =>
      debounce(() => {
        const encodedEndpoint = encodeToBase64(
          endPoint === '' ? 'https://' : endPoint
        );
        const encodedBody = encodeToBase64(JSON.stringify({ body, variables }));
        const queryParamsString = headers
          .filter((item) => item.key)
          .map((item) => `${item.key}=${item.value}`)
          .join('&');

        setHistoryPath(
          `/${method}/${encodedEndpoint}/${encodedBody}?${queryParamsString}`
        );
        window.history.replaceState(
          null,
          '',
          `/${method}/${encodedEndpoint}/${encodedBody}?${queryParamsString}`
        );
      }, 500),
    [endPoint, headers, variables, body, method]
  );

  useEffect(() => {
    debouncedNavigate();
  }, [endPoint, headers, variables, body, method, debouncedNavigate]);

  return {
    endPoint,
    setEndPoint,
    body,
    setBody,
    headers,
    setHeaders,
    variables,
    setVariables,
    historyPath,
  };
}

export default useUrlModifier;
