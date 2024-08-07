import { useEffect } from "react";

function useOnClickOutside(ref: any, handler: any) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mouseup", listener);
    document.addEventListener("touchend", listener);

    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("touchend", listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
