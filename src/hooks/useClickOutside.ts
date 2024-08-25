import { useEffect, useRef } from "react";

const useClickOutside = <T extends HTMLElement>(
  handler: (e: MouseEvent) => void,
  capturing = true
) => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const maybeHandler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // wait for state updates before executing handler
        setTimeout(() => {
          handler(e);
        }, 0);
      }
    };

    document.addEventListener("click", maybeHandler, capturing);
    return () => {
      document.removeEventListener("click", maybeHandler, capturing);
    };
  }, [handler, capturing]);

  return ref;
};

export default useClickOutside;
