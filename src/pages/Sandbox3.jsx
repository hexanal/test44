import * as THREE from 'three';
import { useControls, folder } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Environment } from '../components/Environment';
import { OrbiterControls } from "../components/OrbiterControls";
import { PointLightEntity } from '../components/PointLightEntity';

const _v1 = new THREE.Vector3();
const _vX = new THREE.Vector3(1, 0, 0);
const _vY = new THREE.Vector3(0, 1, 0);
const _vZ = new THREE.Vector3(0, 0, 1);

function VectorAxes() {
  const v1Ref = useRef();
  // const v2Ref = useRef();
  // const v3Ref = useRef();

  const { v1, angle, axis } = useControls('applyAxisAngle', {
    angle: {
      value: 0,
      min: -Math.PI,
      max: Math.PI,
    },
    v1: {
      value: [2, 0, 0],
    },
    axis: {
      options: { x: _vX, y: _vY, z: _vZ },
    }
  });

  useFrame(() => {
    const selectedAxis = axis;
    _v1.fromArray(v1);
    _v1.applyAxisAngle(selectedAxis, angle);

    v1Ref.current.setDirection(_v1.clone().normalize());
    v1Ref.current.setLength(_v1.length());
  });

  return (
    <group>
      <arrowHelper ref={v1Ref} args={[_vX, new THREE.Vector3(0, 0, 0), _vX.length(), 0x00ffff]} />
    </group>
  );
}
function SuperSplines() {
  const curve = useRef(new THREE.CatmullRomCurve3([], false, 'catmullrom', 0.5));
  const curvePoints = useRef([]);
  const geometryRef = useRef();
  const { p0, p1, p2, p3, p4, tension } = useControls('SuperSplines', {
    p0: {
      value: [0, 0, 0],
    },
    p1: {
      value: [1, 1, 0],
    },
    p2: {
      value: [2, 0, 0],
    },
    p3: {
      value: [3, -1, 0],
    },
    p4: {
      value: [4, 0, 0],
    },
    tension: {
      value: 0.5,
      min: 0,
      max: 1,
    },
  });

  const points = useMemo(() => [p0, p1, p2, p3, p4], [p0, p1, p2, p3, p4]);

  useFrame(() => {
    if (curve.current) {
      curve.current.points = points.map(p => new THREE.Vector3(...p));
      curvePoints.current = curve.current.getPoints(50);

      if (geometryRef.current) {
        geometryRef.current.setFromPoints(curvePoints.current);
      } 
    }
  });

  return (
    <group>
      <line>
        <bufferGeometry ref={geometryRef} attach="geometry" />
        <lineBasicMaterial attach="material" color={0xffffff} />
      </line>
    </group>
  );
}

export function Sandbox3() {
  const { activateOrbitControls } = useEditorStore();

  const { lightPosition, light2Position, light2Intensity, showEnv } = useControls({
    showEnv: {
      value: false,
    },
    lightPosition: {
      value: [0, 5, 0],
    },
    light2Position: {
      value: [2.5, 1, 2.5],
    },
    light2Intensity: {
      value: 0.5,
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
            {showEnv && <Environment />}

            <PointLightEntity position={lightPosition} intensity={2} />
            <PointLightEntity position={light2Position} intensity={light2Intensity} />

            <group position={[0, 0.01, 0]}>
              <VectorAxes />
            </group>

            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial color={0xd2a899} side={THREE.DoubleSide} />
            </mesh>

            <group position={[1, 0, 0]}>
              <SuperSplines />
            </group>

            <OrbiterControls />
          </scene>
        </Canvas>
      </div>
    </KeyboardControlsProvider>
  );
}
