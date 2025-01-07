import { useCallback, useEffect, useRef, useState } from 'react';
// import { Object3D, Box3, Box3Helper, Vector3, Euler } from 'three';
// import { useFrame } from '@react-three/fiber';

import { KeyboardControls } from '../../hooks/KeyboardControls';

export default function KeyboardControlsProvider(props) {
  const {
    children,
  } = props || {};


  const controlsMapping = useMemo(() => [
    { name: "FORWARD", keys: ['ArrowUp', 'KeyW'] },
    { name: "BACKWARD", keys: ['ArrowDown', 'KeyS'] },
    { name: "LEFTWARD", keys: ['ArrowLeft', 'KeyA'] },
    { name: "RIGHTWARD", keys: ['ArrowRight', 'KeyD'] },
    { name: "JUMP", keys: ['Space'] },
    { name: "INTERACT", keys: ['KeyE'] },
    { name: "MODIFIER_SHIFT", keys: ['shiftKey'] },
    { name: "MODIFIER_ALT", keys: ['altKey'] },
  ], [])

  const onKeyboardControlsChange = useCallback((name, pressed, state) => {
    console.log('HomePage - onKeyboardControlsChange', { name, pressed, state });
  }, []);


  return (
    <KeyboardControls
      map={controlsMapping} onChange={onKeyboardControlsChange}
    >
      {children}
    </KeyboardControls>
  );
}
