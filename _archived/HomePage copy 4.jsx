import { OrbitControls, PivotControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Transform from "../src/components/Transform";

const TEST_THINGS = [
    {
        id: "thing1",
        type: "Thing",
        position: [-1, 1.2, -3],
        rotation: [Math.PI / 4, 0, 0],
        scale: [1, 1, 1],
    },
    {
        id: "thing2",
        type: "Thing",
        position: [-1, 1.2, 2],
        rotation: [Math.PI / 4, Math.PI / 5, 0],
        scale: [1, 1, 1],
    },
];

function Grid(props) {
    // TODO

    return (
        <gridHelper args={[10, 10]} />
    );
}

export function Thing(props) {
    const ref = useRef();

    return (
        <mesh
            ref={ref}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x04ff88} />
        </mesh>
    );
}

export default function HomePage(props) {
    return (
        <div className="HomePage" style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, }}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                <OrbitControls makeDefault />

                <PivotControls>
                    <Thing />
                </PivotControls>
                <Grid />
            </Canvas>
        </div>
    );
}