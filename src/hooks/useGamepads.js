import { useState, useCallback, useEffect } from 'react';

// TODO split concerns per gamepad
// + by button
// split all buttons in props
//  up
//  down
//  left
//  right
//  start
//  select
//  pad
//  ...
//   a: 0
//   b: 1 for e.g.
//   x: 0
//   y: 0
//   rightStickAxisX
//   rightStickAxisY
//   leftStickAxisX
//   leftStickAxisY
//   R2 : 0->1
//   L2 : 0->1
//   R1
//   L1
export function useGamepads(config = {}) {
  const [gamepads, setGamepads] = useState(null);

  const get = useCallback((gamepadIndex = 0) => {
    if (gamepads === null) return;
    if (!gamepads[gamepadIndex]) return;

    const pads = navigator.getGamepads();

    // directions
    const { axes = null, buttons = [] } = pads[gamepadIndex];
    const leftStick = axes !== null ? [ axes[0], axes[1] ] : [0,0];
    const rightStick = axes !== null ? [ axes[2], axes[3] ] : [0,0];

    // pressed buttons
    const pressed = buttons.map(b => b.pressed);

    // triggers
    const triggerL2 = buttons[6] ? buttons[6].value : 0;
    const triggerR2 = buttons[7] ? buttons[7].value : 0;

    // TODO debuggerrr
    // console.log(pressed.reduce((acc,b,i) => {
    //   return b ? `${acc}, ${i}` : acc;
    // }, -1));

    return {
      leftStick,
      rightStick,

      triggerL2,
      triggerR2,

      buttonL1: pressed[4],
      buttonR1: pressed[5],

      dpadUp: pressed[12],
      dpadDown: pressed[13],
      dpadLeft: pressed[14],
      dpadRight: pressed[15],

      buttonY: pressed[3], // PS4 -> triangle
      buttonX: pressed[2], // PS4 -> square
      buttonB: pressed[1], // PS4 -> circle
      buttonA: pressed[0], // PS4 -> x

      select: pressed[8], // PS4 -> share
      start: pressed[9], // PS4 -> options
      pad: pressed[17], // PS4 -> touch pad
      power: pressed[16], // PS4 -> PS button
    };
  }, [gamepads]);

  const onGamepadConnected = useCallback(() => {
    setGamepads(navigator.getGamepads());
  }, [setGamepads]);

  useEffect(() => {
    window.addEventListener('gamepadconnected', onGamepadConnected);

    return () => {
      window.removeEventListener('gamepadconnected', onGamepadConnected);

    };
  }, [onGamepadConnected]);

  return [gamepads, get];
}

