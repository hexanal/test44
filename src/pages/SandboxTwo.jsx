import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Background } from '../components/Background';
import { Environment } from '../components/Environment';
import { OrbiterControls } from "../components/OrbiterControls";
import { Thing } from "../components/Thing";
import { Plane } from "../components/Plane";

function SandboxTwo() {
  return (
    <KeyboardControlsProvider>
      <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
        <Canvas shadows>
          <scene>
            <Transform />
            <Background />
            <Sky />
            <Environment />

            <Physics>
              <Thing position={[0, 2, 0]} color={0xff4242} />
              <Plane position={[0, -1, 0]} />
            </Physics>

            <OrbiterControls makeDefault />
          </scene>
        </Canvas>
      </div>
    </KeyboardControlsProvider>
  );
}

export default SandboxTwo;
