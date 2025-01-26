export const cache = {
    getValue: (key: string) => {
      if (typeof window !== "undefined") {
        return localStorage.getItem(key);
      }
    },
  
    setValue: (key: string, value: string) => {
      if (typeof window !== "undefined") {
        return localStorage.setItem(key, value);
      }
    },
  
    has: (key: string) => {
      if (typeof window !== "undefined") {
        return !!localStorage.getItem(key);
      }
    },
  
    clearValue: (key: string) => {
      if (typeof window !== "undefined") {
        return localStorage.removeItem(key);
      }
    },
  };  