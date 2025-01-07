import { useRef, useState } from 'react';
import { TransformControls } from '@react-three/drei';
import { Object3D, Box3, Box3Helper } from 'three';
import { useFrame } from '@react-three/fiber';

// import { useBox } from '@react-three/cannon';

import { useKeyboardControls } from '../../hooks/KeyboardControls';

export default function Transform(props) {
  const {
    showAxesHelper = false,
    showBoundingBox = false,
    object,
    children,
  } = props || {};

  const axesHelperRef = useRef();
  const box3Ref = useRef(new Box3());
  const box3HelperRef = useRef(new Box3Helper());

  const transformModeRef = useRef();
  const [transformMode, setTransformMode] = useState("translate");

  const [_, get] = useKeyboardControls();

  useFrame((t, dt, xrFrame) => {
    if (showBoundingBox) {
      box3Ref.current.setFromObject(object.current);
      box3HelperRef.current.box = box3Ref.current;
    }
    if (showAxesHelper) {
      axesHelperRef.current.position.copy(object.current.position);
    }

    const nextMode = get().MODIFIER_SHIFT ? "rotate" : "translate";
    if (nextMode !== transformModeRef.current) {
      setTransformMode(nextMode);
    }
    transformModeRef.current = nextMode;
  });

  // TODO
  // const onChangeTransform = useCallback((e) => {
  //   const { target } = e || {};
  //   console.log(target)
  // }, []);

  return (
    <group
    >
      {showBoundingBox ? (
        <box3Helper ref={box3HelperRef} args={[box3Ref.current, 0x00ffff]} />
      ) : null}

      {showAxesHelper ? (
        <axesHelper ref={axesHelperRef} args={[2]} />
      ) : null}

      <TransformControls
        mode={transformMode}
        object={object}
      />
    </group>
  );
}
