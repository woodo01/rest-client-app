import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import app from '@/app';
import { KeyValue } from '@/hooks/useRequestProperties';

function getVariables(): KeyValue[] {
  'use client';

  const variables = localStorage.getItem(app.VARIABLES_KEY);
  let parsedVariables: KeyValue[];

  try {
    parsedVariables = JSON.parse(variables || '[]');
  } catch {
    localStorage.removeItem(app.VARIABLES_KEY);
    parsedVariables = [];
  }

  if (!Array.isArray(parsedVariables)) {
    localStorage.removeItem(app.VARIABLES_KEY);
    parsedVariables = [];
  }

  return parsedVariables;
}

const useRequestVariables = (): {
  isLoading: boolean;
  variables: KeyValue[];
  setVariables: Dispatch<SetStateAction<KeyValue[]>>;
} => {
  const [variables, setVariables] = useState<KeyValue[]>(getVariables());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    addVariables(variables);
    setIsLoading(false);
  }, [variables]);

  const addVariables = (variables: KeyValue[]): void => {
    localStorage.setItem(app.VARIABLES_KEY, JSON.stringify(variables));
  };

  return {
    isLoading,
    variables,
    setVariables,
  };
};

export default useRequestVariables;
