import { RefObject, useLayoutEffect, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";

// This hook updates height as the target dimensions changes
export const useHeight = (target: RefObject<HTMLDivElement>) => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(target.current?.getBoundingClientRect().height || 0);
  }, [target]);

  useResizeObserver(target, (entry) => setHeight(entry.contentRect.height));
  return height;
};
