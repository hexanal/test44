import * as THREE from 'three';
import { useCallback, useRef } from 'react';
import { Html, useHelper } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';
import Transform from './Transform';

export function PointLightEntity(props) {
    const { position = [-4, 1.1, 4], intensity = 1 } = props;
    const ref = useRef();
    const pointLightRef = useRef();
    const { selected, setSelected } = useEditorStore();

    useHelper(pointLightRef, THREE.PointLightHelper);

    const onClick = useCallback(() => {
        setSelected(ref.current);
    }, [setSelected]);

    return (
        <>
            <Transform
                object={ref.current}
                // makeDefault={selected}
                enabled={selected}
            />
            <group
                ref={ref}
                position={position}
                onClick={onClick}
            >
                {/* <Html as='div' center>
                    <pre style={{ fontSize: "3rem", userSelect: "none" }}>💡</pre>
                </Html> */}
                <pointLight
                    ref={pointLightRef}
                    decay={0.1}
                    intensity={intensity}
                    shadow-mapSize-height={1024}
                    shadow-mapSize-width={1024}
                    shadow-radius={10}
                    shadow-bias={-0.0001}
                    castShadow
                />
            </group>
        </>
    );
}