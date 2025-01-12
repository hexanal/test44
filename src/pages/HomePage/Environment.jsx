import * as THREE from 'three';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';

import Transform from '../../components/Transform';

export function Environment() {
    const pointLightRef = useRef();
    const spotLightRef = useRef();

    useHelper(pointLightRef, THREE.PointLightHelper);
    useHelper(spotLightRef, THREE.SpotLightHelper);

    return (
        <>
            <axesHelper args={[2]} />
            <ambientLight intensity={Math.PI / 10} />
            {/* <Transform object={spotLightRef.current} /> */}
            <spotLight
                ref={spotLightRef}
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={2}
                decay={0}
                intensity={Math.PI}
                castShadow
            />

            {/* <Transform object={pointLightRef.current} /> */}
            <pointLight
                ref={pointLightRef}
                position={[-10, 3, 10]}
                decay={0.1}
                intensity={Math.PI / 2}
                castShadow
            />
        </>
    );
}