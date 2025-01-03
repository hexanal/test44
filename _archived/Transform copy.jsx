import { Object3D, Box3, Box3Helper, Vector3, Euler } from 'three';
import { useFrame } from '@react-three/fiber';
// import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRef, useEffect, useLayoutEffect } from 'react';

export default function Transform(props) {
  const {
    showAxesHelper = true,
    showBoundingBox = true,

    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [0, 0, 0],
    children,
  } = props || {};

  const ref = useRef(new Object3D());
  const wrapperRef = useRef(new Object3D());
  const box3Ref = useRef(new Box3());
  const box3HelperRef = useRef(new Box3Helper());

  useFrame((t, dt, xrFrame) => {
    box3Ref.current.setFromObject(wrapperRef.current);
    box3HelperRef.current.box = box3Ref.current;
    // console.log({t, dt, xrFrame}) 
    ref.current.position.fromArray(position);
  });

  return (
    <group>
      {showBoundingBox ? (
        <box3Helper ref={box3HelperRef} args={[box3Ref.current, 0x00ffff]} />
      ) : null}

      <object3D
        ref={ref}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {showAxesHelper ? (
          <axesHelper args={[2]} />
        ) : null}

        <object3D ref={wrapperRef}>
          {children}
        </object3D>
      </object3D>
    </group>
  );
}
