import { useEffect, useState } from "react";

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
  let timerId: NodeJS.Timeout | null = null;

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Check if the device is in landscape orientation and is not being tilted
      if (
        event != null &&
        event.gamma != null &&
        event.beta != null &&
        Math.abs(event.gamma) < 5 &&
        Math.abs(event.beta) > 175 &&
        Math.abs(event.beta) < 185
      ) {
        setEventOrientation({
          absolute: event.absolute,
          alpha: event.alpha,
          beta: event.beta,
          gamma: event.gamma,
        });
        // If the device was not previously in a horizontal position, start the timer
        if (!isHorizontal) {
          setIsHorizontal(true);
          timerId = setInterval(() => {
            setHorizontalTime((time) => time + 1);
            console.log(
              `Device has been in a horizontal position for ${horizontalTime} seconds`
            );
          }, 1000);
        }
      } else {
        // If the device was previously in a horizontal position, stop the timer
        if (isHorizontal) {
          setIsHorizontal(false);
          if (timerId) {
            clearInterval(timerId);
            timerId = null;
          }
          console.log("Device is no longer in a horizontal position");
        }
        setHorizontalTime(0);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };
  }, [isHorizontal, horizontalTime]);

  return { horizontalTime, isHorizontal, eventOrientation };
};

export default useHorizontalTimer;
