import { useEffect, useState } from "react";

const useTimer = (time: number) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, time);

    return () => clearTimeout(timer);
  }, [time]);

  return isVisible;
}

export default useTimer;