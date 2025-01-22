import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { TransformControls, useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// import { useBox } from '@react-three/cannon';

import { useKeyboardControls } from '../../hooks/KeyboardControls';
import { useEditorStore } from '../../stores/editor';

// export default function Transform(props) {
//   const { object, children } = props || {};
export default function Transform(props) {
  const { children } = props || {};
  const {
    DEBUG,
    selected,
    transformMode,
    setTransformMode,
  } = useEditorStore();
  const [_, get] = useKeyboardControls();
  const ref = useRef(new THREE.Object3D());

  useFrame(() => {
    // if (!object) return;

    if (get().ROTATE_OBJECT) {
      setTransformMode('rotate');
    }
    if (get().SCALE_OBJECT) {
      setTransformMode('scale');
    }
    if (get().TRANSLATE_OBJECT) {
      setTransformMode('translate');
    }
  });

  useEffect(() => {
    if (ref.current && selected) {
      ref.current.attach(selected);
    }
  }, [selected]);

  return (
    <>
      {selected && (
        <TransformControls
          ref={ref}
          mode={transformMode}
          object={selected}
          showX={DEBUG}
          showY={DEBUG}
          showZ={DEBUG}
        />
      )}
    </>
  );
}
