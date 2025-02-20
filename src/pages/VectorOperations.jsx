import * as THREE from 'three';
import { useControls, folder } from 'leva';
import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Environment } from '../components/Environment';
import { OrbiterControls } from "../components/OrbiterControls";
import { PointLightEntity } from '../components/PointLightEntity';

const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _v3 = new THREE.Vector3();

function VectorAddition() {
  const v1Ref = useRef();
  const v2Ref = useRef();
  const v3Ref = useRef();

  const { v1, v2, operation } = useControls('addition', {
    v1: {
      value: [2, 0, 0],
    },
    v2: {
      value: [0, 1, 1.5],
    },
    operation: {
      options: ['add', 'sub', 'divide', 'dot', 'cross'],
    }
  });

  useFrame(() => {
    _v1.fromArray(v1);
    _v2.fromArray(v2);

    _v3.copy(_v1.clone()[operation](_v2));

    v1Ref.current.setDirection(_v1.clone().normalize());
    v1Ref.current.setLength(_v1.length());

    v2Ref.current.setDirection(_v2.clone().normalize());
    v2Ref.current.setLength(_v2.length());

    v3Ref.current.setDirection(_v3.clone().normalize());
    v3Ref.current.setLength(_v3.length());
  });

  return (
    <group>
      <arrowHelper ref={v1Ref} args={[_v1, new THREE.Vector3(0, 0, 0), _v1.length(), 0xff0000]} />
      <arrowHelper ref={v2Ref} args={[_v2, new THREE.Vector3(0, 0, 0), _v2.length(), 0x00ff00]} />
      <arrowHelper ref={v3Ref} args={[_v3, new THREE.Vector3(0, 0, 0), _v3.length(), 0x0000ff]} />
    </group>
  );
}

function VectorOperations() {
  const { activateOrbitControls } = useEditorStore();

  const { lightPosition } = useControls({
    lightPosition: {
      value: [2, 1.25, -1.5],
    },
  });

  useEffect(() => {
    activateOrbitControls();
  }, []);

  return (
    <KeyboardControlsProvider>
      <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
        <Canvas shadows>
          <scene>
            <Transform />
            <Sky />
            <Environment />

            <PointLightEntity position={lightPosition} />

            <group position={[0, 0.1, 0]}>
              <VectorAddition />
            </group>

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color={0xa0a0a0} doubleSide />
            </mesh>

            <OrbiterControls />
          </scene>
        </Canvas>
      </div>
    </KeyboardControlsProvider>
  );
}

export default VectorOperations;
