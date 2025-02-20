import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
// import { Sky } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Background } from '../components/Background';
import { Environment } from '../components/Environment';
import { OrbiterControls } from "../components/OrbiterControls";

function Viewports() {
  const { activateOrbitControls } = useEditorStore();

  useEffect(() => {
    activateOrbitControls();
  }, []);

  return (
    <KeyboardControlsProvider>
      <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
        <Canvas shadows>
          <scene>
            <Transform />
            <Background />
            <Environment />

            <group>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[12, 0.1, 12]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[0, 3, 0]}>
                <boxGeometry args={[12, 0.1, 12]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[6, 1.5, 0]}>
                <boxGeometry args={[0.1, 3, 12]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[-6, 1.5, 0]}>
                <boxGeometry args={[0.1, 3, 12]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[0, 0.5, 6]}>
                <boxGeometry args={[12, 1, 0.1]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[0, 2.8, 6]}>
                <boxGeometry args={[12, 0.3, 0.1]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[-5, 1.825, 6]}>
                <boxGeometry args={[2, 1.65, 0.1]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
              <mesh position={[5, 1.825, 6]}>
                <boxGeometry args={[2, 1.65, 0.1]} />
                <meshStandardMaterial color={0xcdcdcd} />
              </mesh>
            </group>

            <OrbiterControls />
          </scene>
        </Canvas>
      </div>
    </KeyboardControlsProvider>
  );
}

export default Viewports;
