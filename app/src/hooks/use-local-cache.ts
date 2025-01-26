import { cache } from "@/utils/cache.util";
import { useEffect, useState } from "react";

interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export default function useLocalCache<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = cache.getValue(key);
    return storedValue !== null
      ? (JSON.parse(storedValue || "") as T)
      : defaultValue;
  });

  useEffect(() => {
    cache.setValue(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
