import { Object3D, Vector3, Euler, AxesHelper } from 'three';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRef } from 'react';

export default function Transform(props) {
  const {
    showAxesHelper = false,
    showBoundingBox = false,

    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    children,
  } = props || {};

  const ref = useRef(new Object3D());

  // useFrame((t) => {});

  return (
    <object3D
      ref={ref}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {showAxesHelper ? (
        <AxesHelper args={[2]} />
      ): null}
      {children}
    </object3D>
  );
}
