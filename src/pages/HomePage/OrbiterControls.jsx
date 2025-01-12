import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useEditorStore } from "../../stores/editor";


export function OrbiterControls(props) {
    const cameraRef = useRef();
    const size = useThree(({ size }) => size);
    const { activeControls } = useEditorStore();

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size, props]);

    return (
        <object3D>
            <PerspectiveCamera makeDefault={activeControls === 'orbit'} name="ORBIT" ref={cameraRef} position={[0, 1, 3]} />
            <OrbitControls enabled={activeControls === 'orbit'} camera={cameraRef.current} />
        </object3D>
    );

}
