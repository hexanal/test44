import * as THREE from 'three';
import { useControls, folder } from 'leva';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Environment } from '../components/Environment';
import { OrbiterControls } from "../components/OrbiterControls";
import { PointLightEntity } from '../components/PointLightEntity';

const _v1 = new THREE.Vector3();

function RayVisualizer() {
  const { gl, camera, pointer, raycaster } = useThree();
  const [lines, setLines] = useState([]);

  const handleClick = useCallback((event) => {
    raycaster.setFromCamera(pointer, camera);
    const origin = camera.position.clone();
    const direction = raycaster.ray.direction.clone();
    const endPoint = origin.clone().add(direction.multiplyScalar(50));
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    setLines((prev) => [...prev, { origin, endPoint, color }]);
  }, [camera]);

  useEffect(() => {
    gl.domElement.addEventListener("click", handleClick);
    return () => gl.domElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([line.origin, line.endPoint]);
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color={line.color} />
          </line>
        );
      })}
    </>
  );
}

export function Sandbox4() {
  const { activateOrbitControls } = useEditorStore();

  const { lightPosition, lightIntensity } = useControls({
    showEnv: {
      value: false,
    },
    lightPosition: {
      value: [2, 1.5, -2],
    },
    lightIntensity: {
      value: 4,
    },
  });

  useEffect(() => {
    activateOrbitControls();
  }, []);

  return (
    <KeyboardControlsProvider>
      <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
        <Canvas
          shadows
        >
          <scene>
            <Transform />
            <Sky />
            <Environment />

            <PointLightEntity position={lightPosition} intensity={lightIntensity} />

            <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color={0x3f6be3} side={THREE.DoubleSide} />
            </mesh>

            <RayVisualizer />

            <OrbiterControls />
          </scene>
        </Canvas>
      </div>
    </KeyboardControlsProvider>
  );
}
