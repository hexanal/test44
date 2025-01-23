import { useControls } from 'leva';
import { useCallback, useMemo } from 'react';
import { KeyboardControls } from '../../hooks/KeyboardControls';
import { useEditorStore } from '../../stores/editor';

export default function KeyboardControlsProvider(props) {
  const {
    children,
  } = props || {};
  const { setKeyboardEnabled } = useEditorStore();
  const { keyboardEnabled } = useControls({
    keyboardEnabled: {
      value: true,
      label: 'Enable Keyboard Controls',
      onChange: (value) => setKeyboardEnabled(value),
    },
  });

  const controlsMapping = useMemo(() => [
    { name: "FORWARD", keys: ['ArrowUp', 'KeyW'] },
    { name: "BACKWARD", keys: ['ArrowDown', 'KeyS'] },
    { name: "LEFTWARD", keys: ['ArrowLeft', 'KeyA'] },
    { name: "RIGHTWARD", keys: ['ArrowRight', 'KeyD'] },
    { name: "JUMP", keys: ['Space'] },
    { name: "INTERACT", keys: ['KeyE'] },
    { name: "RELOAD", keys: ['KeyR'] },

    { name: "ROTATE_OBJECT", keys: ['Digit1'] },
    { name: "SCALE_OBJECT", keys: ['Digit2'] },
    { name: "TRANSLATE_OBJECT", keys: ['Digit3'] },

    { name: "MODIFIER_SHIFT", keys: ['shiftKey'] },
    { name: "MODIFIER_ALT", keys: ['altKey'] },
  ], [])

  const onKeyboardControlsChange = useCallback((name, pressed, state) => {
    console.log('KeyboardControlsProvider - onKeyboardControlsChange', { name, pressed, state });
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
