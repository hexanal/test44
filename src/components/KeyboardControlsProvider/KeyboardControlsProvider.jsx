import { useCallback, useMemo } from 'react';
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
    // console.log('KeyboardControlsProvider - onKeyboardControlsChange', { name, pressed, state });
  }, []);

  return (
    <KeyboardControls
      map={controlsMapping}
      onChange={onKeyboardControlsChange}
    >
      {children}
    </KeyboardControls>
  );
}
