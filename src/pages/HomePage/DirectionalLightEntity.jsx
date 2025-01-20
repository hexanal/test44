import * as THREE from 'three';
import { useCallback, useRef } from 'react';
import { Html, useHelper } from '@react-three/drei';
import { useEditorStore } from '../../stores/editor';
import Transform from '../../components/Transform';

const _min = new THREE.Vector3(-1, -1, -1);
const _max = new THREE.Vector3(1, 1, 1);

export function DirectionalLightEntity() {
    const ref = useRef();
    const transformRef = useRef();
    const box3Ref = useRef(new THREE.Box3(_min, _max));
    const boundingBoxRef = useRef(new THREE.Box3Helper());
    const pointLightRef = useRef();
    const { selected, setSelected } = useEditorStore();

    useHelper(pointLightRef, THREE.PointLightHelper);

    const onClick = useCallback(() => {
        setSelected(ref.current);
    }, [setSelected]);

    // box.setFromCenterAndSize( new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( 2, 1, 3 ) );
    // const helper = new THREE.Box3Helper( box, 0xffff00 );

    return (
        <>
            <Transform
                object={transformRef.current}
                // makeDefault={selected}
                enabled={selected}
            />
            <group
                position={[0, 2, 1]}
                ref={transformRef}
                onClick={onClick}
            >
                <Html
                    as='div' // Wrapping element (default: 'div')
                    //   wrapperClass // The className of the wrapping element (default: undefined)
                    //   prepend // Project content behind the canvas (default: false)
                    center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
                //   fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
                //   distanceFactor={5} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
                //   zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
                //   portal={domnodeRef} // Reference to target container (default=undefined)
                //   sprite // Renders as sprite, but only in transform mode (default=false)
                //   calculatePosition={(el: Object3D, camera: Camera, size: { width: number; height: number }) => number[]} // Override default positioning function. (default=undefined) [ignored in transform mode]
                //   occlude={[pointLightRef]} // Can be true or a Ref<Object3D>[], true occludes the entire scene (default: undefined)
                //   onOcclude={(hidden) => null} // Callback when the visibility changes (default: undefined)
                //   {...groupProps} // All THREE.Group props are valid
                //   {...divProps} // All HTMLDivElement props are valid
                >
                    <pre style={{ fontSize: "3rem", userSelect: "none" }}>💡</pre>
                </Html>
                <directionalLight
                    ref={ref}
                    intensity={0.5}
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                    castShadow
                />
                <box3 ref={box3Ref} args={[_min, _max]}>
                    <box3Helper args={[boundingBoxRef.current, 0xffff00]} />
                </box3>
            </group>
        </>
    );
}