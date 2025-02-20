import * as THREE from 'three';
import { useCallback, useRef } from 'react';
import { Html, useHelper } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';
import Transform from './Transform';

const _min = new THREE.Vector3(-1, -1, -1);
const _max = new THREE.Vector3(1, 1, 1);

export function DirectionalLightEntity() {
    const ref = useRef();
    const transformRef = useRef();
    const box3Ref = useRef(new THREE.Box3(_min, _max));
    const boundingBoxRef = useRef(new THREE.Box3Helper());
    const { selected, setSelected } = useEditorStore();

    useHelper(ref, THREE.DirectionalLightHelper);

    const onClick = useCallback(() => {
        setSelected(ref.current);
    }, [setSelected]);

    return (
        <>
            <Transform
                object={transformRef.current}
                enabled={selected}
            />
            <group
                position={[0, 2, 1]}
                ref={transformRef}
                onClick={onClick}
            >
                {/* <Html as='div' center>
                    <pre style={{ fontSize: "3rem", userSelect: "none" }}>💡</pre>
                </Html> */}
                <directionalLight
                    ref={ref}
                    intensity={0.5}
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                    castShadow
                />
            </group>
        </>
    );
}