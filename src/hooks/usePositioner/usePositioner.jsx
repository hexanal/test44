import { useEffect, useState } from 'react';

function debounce(func, wait, immediate) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   (before or after imposing a delay).
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function...
    if (callNow) func.apply(context, args);
  }
}

const usePositioner = (props) => {
  const {
    ref, 
    // scanners = [], // perhaps I'll be passing scanners, feeding them some unique object containing... all the current state)
    scannerLogTimeout = 2000, // hmmm?
    tickInterval = 500,  // that was for the 
  } = props || {};
  // const events = useRef([]);
  const [tick, setTick] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(1);

  const [x_DOWN, setX_DOWN] = useState(0);
  const [y_DOWN, setY_DOWN] = useState(0);

  const [x_UP, setX_UP] = useState(0);
  const [y_UP, setY_UP] = useState(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [x_OFFSET, setX_OFFSET] = useState(0);
  const [y_OFFSET, setY_OFFSET] = useState(0);

  const onResize = debounce((e) => {
    const el = ref.current;
    const { width, height, top, left } = el.getBoundingClientRect() || {};

    setWidth(width);
    setHeight(height);
    setX_OFFSET(left);
    setY_OFFSET(top);

    console.log(e);
  }, 50);

  useEffect(() => {
    onResize();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  useEffect(() => {
    const interval = setInterval(() => {
      // events.current = events.current.filter(x => x.timestamp + scannerLogTimeout >= new Date().valueOf());

      setTick(new Date().valueOf());
    }, tickInterval);

    return () => {
      clearInterval(interval);
    };
  }, [tickInterval, scannerLogTimeout]);

  // const handleInputChange = (e) => {
  //   console.log(e);
  // };

  // const onClick = (e) => {
  //   events.current = [...events.current, { name: 'onClick', e, timestamp: new Date().valueOf() }];
  //   console.log(e);
  // };

  // const onMouseEnter = (e) => {
  //   events.current = [...events.current, { name: 'onMouseEnter', e, timestamp: new Date().valueOf() }];
  //   // console.log(e);
  // };
  // const onMouseLeave = (e) => {
  //   events.current = [...events.current, { name: 'onMouseLeave', e, timestamp: new Date().valueOf() }];
  //   // console.log(e);
  // };
  // const onMouseMove = (e) => {
  //   events.current = [...events.current, { name: 'onMouseMove', e, timestamp: new Date().valueOf() }];
  // };

  // const onMouseDown = (e) => {
  //   events.current = [...events.current, { name: 'onMouseDown', e, timestamp: new Date().valueOf() }];
  // };
  // const onMouseUp = (e) => {
  //   events.current = [...events.current, { name: 'onMouseUp', e, timestamp: new Date().valueOf() }];
  // };

  // const [isActive, setIsActive] = useState(false);

  // ref.current.onPointerEnter = function(e) {
  //   events.current = [...events.current, { name: 'onPointerEnter', e, timestamp: new Date().valueOf() }];
  //   console.log(e);
  // };
  // ref.current.onPointerLeave = function(e) {
  //   events.current = [...events.current, { name: 'onPointerLeave', e, timestamp: new Date().valueOf() }];
  //   console.log(e);
  // };

  ref.current.onPointerMove = function(e) {
    const {
      clientX,
      clientY,
    } = e || {};
    setX(clientX);
    setY(clientY);
    // events.current = [...events.current, { name: 'onPointerMove', e, timestamp: new Date().valueOf() }];
  };
  ref.current.onPointerDown = function(e) {
    // events.current = [...events.current, { name: 'onPointerDown', e, timestamp: new Date().valueOf() }];

    const {
      clientX,
      clientY,
    } = e || {};
    setX_DOWN(clientX);
    setY_DOWN(clientY);
    setZ(1.05);
  };
  ref.current.onPointerUp = function() {
    // events.current = [...events.current, { name: 'onPointerUp', e, timestamp: new Date().valueOf() }];

    const {
      clientX,
      clientY,
    } = ref || {};
    setX_UP(clientX);
    setY_UP(clientY);
    setZ(1);
  };

  const Wrapper = function(props) {
    const { children } = props || {};

    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }

  return [
    {
      tick,
      position: [x, y, z],
      pressed: [x_DOWN, y_DOWN, 0],
      released: [x_UP, y_UP, 0],
      bounds: [width, height, 1000],
      offset: [x_OFFSET, y_OFFSET, 1000],
    },
    Wrapper,
  ];
};

export default usePositioner;
