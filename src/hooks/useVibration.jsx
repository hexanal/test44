import { useState, useEffect } from 'react';

const useControllerVibration = () => {
  const [hasVibration, setHasVibration] = useState(false);

  useEffect(() => {
    const checkVibrationSupport = () => {
      if ('vibrate' in navigator) {
        setHasVibration(true);
      } else if ('mozVibrate' in navigator) {
        navigator.vibrate = navigator.mozVibrate;
        setHasVibration(true);
      } else {
        console.warn('Vibration API not supported');
        setHasVibration(false);
      }
    };

    checkVibrationSupport();
  }, []);

  const vibrate = (pattern) => {
    if (hasVibration) {
      navigator.vibrate(pattern);
    } else {
      console.warn('Vibration not supported on this device');
    }
  };

  return { vibrate, hasVibration };
};

export default useControllerVibration;
