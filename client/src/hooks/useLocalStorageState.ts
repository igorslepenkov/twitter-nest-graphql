import { useCallback, useEffect, useMemo, useState } from "react";
import { LocalStorageEndpoint, localStorageRepository } from "../services";

export const useLocalStorageState = <Type>(
  key: LocalStorageEndpoint,
): [Type | null, () => void] => {
  const [value, setValue] = useState<Type | null>(null);

  const event = useMemo(() => new Event(key), [key]);

  const trigger = useCallback(() => {
    window.dispatchEvent(event);
  }, [event]);

  const fetchData = useCallback(() => {
    const saved = localStorageRepository.get<Type>(key);

    if (!saved) localStorageRepository.set(key, null);

    if (saved) {
      setValue(saved);
    }
  }, [key]);

  useEffect(() => {
    fetchData();

    window.addEventListener(key, fetchData);

    return () => {
      window.removeEventListener(key, fetchData);
    };
  }, [fetchData, key, event]);

  return [value, trigger];
};
