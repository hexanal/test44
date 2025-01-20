import * as THREE from 'three';
import { useCallback, useRef } from 'react';
import { Html, useHelper } from '@react-three/drei';
import { useEditorStore } from '../../stores/editor';
import Transform from '../../components/Transform';

export function PointLightEntity() {
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
                position={[-10, 3, 10]}
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
                <pointLight
                    ref={pointLightRef}
                    decay={0.1}
                    intensity={Math.PI / 2}
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