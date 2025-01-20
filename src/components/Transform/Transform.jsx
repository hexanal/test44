import * as THREE from 'three';
import { useCallback, useRef, useState } from 'react';
import { Html, TransformControls, useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// import { useBox } from '@react-three/cannon';

import { useKeyboardControls } from '../../hooks/KeyboardControls';
import { useEditorStore } from '../../stores/editor';

export default function Transform(props) {
  const { id = 'untitled', object, children } = props || {};
  const {
    selected,
    transformMode,
    setTransformMode,
  } = useEditorStore();
  const [_, get] = useKeyboardControls();
  const ref = useRef(new THREE.Object3D());

  useFrame(() => {
    if (!object) return;

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

  return (
    <>
      <TransformControls
        mode={transformMode}
        object={selected}
        // showX={object == selected}
        // showY={object == selected}
        // showZ={object == selected}
      />
      {children}
    </>
  );
}
