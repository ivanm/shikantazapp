import { useEffect, useState } from "react";

type WakeLockType = "screen";
export interface WakeLockSentinel extends EventTarget {
  type: WakeLockType;
  released: boolean;
  release: () => Promise<void>;
}
const useHorizontalTimer = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [horizontalTime, setHorizontalTime] = useState(0);
  const [eventOrientation, setEventOrientation] = useState<{
    absolute: boolean | null;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
  }>({
    absolute: null,
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setEventOrientation({
        absolute: event.absolute,
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });

      // Check if the device is in landscape orientation and is not being tilted
      if (
        event != null &&
        event.gamma != null &&
        event.beta != null &&
        Math.abs(event.gamma) < 5 &&
        Math.abs(event.beta - 2.5) < 5
      ) {
        // If the device was not previously in a horizontal position, start the timer
        if (!isHorizontal) {
          setIsHorizontal(true);
          setTimerId(
            setInterval(() => {
              setHorizontalTime((time) => time + 1);
            }, 1000)
          );
          // Request a wake lock to prevent the device from sleeping
          if (navigator) {
            (async () => {
              const lock: WakeLockSentinel = await navigator.wakeLock.request(
                "screen"
              );
              // .then((lock: WakeLockSentinel) => {
              setWakeLock(lock);
            })();
            // });
          }
        }
      } else {
        // If the device was previously in a horizontal position, stop the timer
        if (isHorizontal) {
          setIsHorizontal(false);
          if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
          }
          if (wakeLock) {
            wakeLock.release();
            setWakeLock(null);
          }
        }
        // Reset the timer
        setHorizontalTime(0);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      if (wakeLock) {
        wakeLock.release();
        setWakeLock(null);
      }
    };
  }, [isHorizontal, timerId]);

  return { horizontalTime, isHorizontal, eventOrientation };
};

export default useHorizontalTimer;
