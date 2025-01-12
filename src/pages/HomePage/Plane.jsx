import { usePlane } from "@react-three/cannon";

export function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], ...props }));
    return (
        <mesh
            ref={ref}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
        </mesh>
    );
}
