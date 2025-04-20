import { useState } from 'react';

export type KeyValue = {
  key: string;
  value: string;
};

function convertToMap(items: KeyValue[]): Map<string, KeyValue> {
  return new Map(items.map((item, index) => [String(index), item]));
}

interface UseRequestPropertiesReturn {
  properties: Map<string, KeyValue>;
  addItem: (key: string, value: string) => void;
  removeItem: (index: string) => void;
  changeItemKey: (index: string, value: string) => void;
  changeItemValue: (index: string, value: string) => void;
}

const useRequestProperties = (initialValues: KeyValue[]): UseRequestPropertiesReturn => {
  const [properties, setQueryParams] = useState<Map<string, KeyValue>>(
    convertToMap(initialValues)
  );

  const addItem = (key: string, value: string): void => {
    const existingItem = Array.from(properties.values()).find(
      (item) => item.key === key
    );

    if (existingItem) return;

    properties.set(String(properties.size), { key, value });
    setQueryParams(new Map(properties));
  };

  const removeItem = (index: string): void => {
    properties.delete(index);
    setQueryParams(new Map(properties));
  };

  const changeItemKey = (index: string, value: string): void => {
    const existingItem = properties.get(index);

    if (existingItem) {
      existingItem.key = value;
    }

    setQueryParams(new Map(properties));
  };

  const changeItemValue = (index: string, value: string): void => {
    const existingItem = properties.get(index);

    if (existingItem) {
      existingItem.value = value;
    }

    setQueryParams(new Map(properties));
  };

  return {
    properties,
    addItem,
    removeItem,
    changeItemKey,
    changeItemValue,
  };
};

export default useRequestProperties;
