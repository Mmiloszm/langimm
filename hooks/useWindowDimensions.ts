import { useState, useLayoutEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useLayoutEffect(() => {
    const isWindow = typeof window !== "undefined";
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    isWindow && window.addEventListener("resize", handleResize);

    return () => isWindow && window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  return windowDimensions;
}
