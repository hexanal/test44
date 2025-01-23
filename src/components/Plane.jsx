import { usePlane } from "@react-three/cannon";

export function Plane(props) {
    const [ref] = usePlane(() => ({ friction: 0.01, rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0], ...props }));
    return (
        <mesh
            ref={ref}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial
                color={0xccc4c4}
                receiveShadow
            />
        </mesh>
    );
}
