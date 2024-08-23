import { useEffect, useRef } from "react";

const useClickOutside = (handler: (e: MouseEvent) => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const maybeHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e);
      }
    };

    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return ref;
};

export default useClickOutside;

