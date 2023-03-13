import { useCallback, useEffect, useMemo, useState } from "react";
import { LocalStorageEndpoint, localStorageRepository } from "../services";

interface IUseLocalStorageStateReturn<Type> {
  value: Type | null;
  setTrigger: () => void;
  clearTrigger: () => void;
}

export const useLocalStorageState = <Type>(
  key: LocalStorageEndpoint,
): IUseLocalStorageStateReturn<Type> => {
  const [value, setValue] = useState<Type | null>(null);

  const setEventName = `${key}-set`;
  const clearEventName = `${key}-clear`;

  const setEvent = useMemo(() => new Event(setEventName), [setEventName]);
  const clearEvent = useMemo(() => new Event(clearEventName), [clearEventName]);

  const setTrigger = useCallback(() => {
    window.dispatchEvent(setEvent);
  }, [setEvent]);

  const clearTrigger = useCallback(
    () => window.dispatchEvent(clearEvent),
    [clearEvent],
  );

  const fetchData = useCallback(() => {
    const saved = localStorageRepository.get<Type>(key);

    if (!saved) localStorageRepository.set(key, null);

    if (saved) {
      setValue(saved);
    }
  }, [key]);

  const clearData = useCallback(() => {
    setValue(null);
  }, []);

  useEffect(() => {
    fetchData();

    window.addEventListener(setEventName, fetchData);
    window.addEventListener(clearEventName, clearData);

    return () => {
      window.removeEventListener(setEventName, fetchData);
      window.removeEventListener(clearEventName, clearData);
    };
  }, [fetchData, clearData, key, setEventName, clearEventName]);

  return { value, setTrigger, clearTrigger };
};
