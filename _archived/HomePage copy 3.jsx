import { Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

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

function PlayerCamera(props) {
    const cameraRef = useRef();
    const set = useThree(({ set }) => set);
    const size = useThree(({ size }) => size);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height
            cameraRef.current.updateProjectionMatrix()
        }
    }, [size, props])

    useLayoutEffect(() => {
        set({ camera: cameraRef.current })
    }, [])

    return <perspectiveCamera ref={cameraRef} {...props} />
}

function Grid(props) {
    // TODO

    return (
        <gridHelper args={[10, 10]} />
    );
}

function Ground(props) {
    const rotation = -Math.PI / 2;
    const light = {
        x: -50,
        y: 85,
        z: 75,
    };
    const { x, y, z } = light;

    return (
        <group>
            <pointLight position={[x, y, z]} color={0xff00ff} intensity={4} />
            <mesh
                position={[0, -1, 0]} rotation={[rotation, 0, 0]}
            >
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color={0xd8d9f1} />
            </mesh>
        </group>
    );
}

function Walls(props) {
    const [wireframe, setWireframe] = useState(false);

    const onClick = useCallback(e => {
        setWireframe(t => !t);
    }, [setWireframe]);

    return (
        <group onClick={onClick}>
            <group>
                <mesh
                    position={[0, 0, -2]} rotation={[0, 0, 0]}
                >
                    <axesHelper args={[2]} />
                    <boxGeometry args={[5, 2.5, 0.3]} />
                    <meshStandardMaterial color={0xff00ff} wireframe={wireframe} />
                </mesh>
            </group>

            <group>
                <mesh
                    position={[2.5, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}
                >
                    <axesHelper args={[2]} />
                    <boxGeometry args={[5, 2.5, 0.3]} />
                    <meshStandardMaterial color={0xff00ff} wireframe={wireframe} />
                </mesh>
            </group>

            <group
                position={[-2.5, 0, 0.5]} rotation={[0, Math.PI / 2, 0]}
            >
                <axesHelper args={[2]} />
                <mesh
                >
                    <boxGeometry args={[5, 2.5, 0.3]} />
                    <meshStandardMaterial color={0xff00ff} wireframe={wireframe} />
                </mesh>
            </group>

        </group>
    );
}

function Player(props) {
    const bodyRef = useRef();
    const headRef = useRef();
    const [locked, setLocked] = useState(false);

    const lockPointer = useCallback(() => {
        if (locked) return;

        document.body.requestPointerLock();
    }, [locked]);

    const unlockPointer = useCallback(() => {
        document.exitPointerLock();
    }, []);

    const onKeyDown = useCallback((e) => {
        if (!locked) return;

        const { code } = e || {};

        // const multiplier = 1;
        // const sensitivity = 0.005;

        let speed = 0;
        if (code === 'KeyW') {
            speed = -2;
        }
        if (code === 'KeyS') {
            speed = 2;
        }
        const dir = new Vector3();
        headRef.current.getWorldDirection(dir);

        bodyRef.current.position.addScaledVector(dir, speed);

        // console.log({
        //     x: bodyRef.current.position.x,
        //     y: bodyRef.current.position.y,
        //     z: bodyRef.current.position.z,
        // });
    }, [locked]);

    const onMouseMove = useCallback((e) => {
        if (!locked) return;

        const { movementX, movementY } = e || {};

        const multiplier = 1;
        const sensitivity = 0.005;

        headRef.current.rotation.x = headRef.current.rotation.x - (movementY * multiplier * sensitivity);
        bodyRef.current.rotation.y = bodyRef.current.rotation.y - (movementX * multiplier * sensitivity);
    }, [locked]);

    const onPointerLockChange = useCallback(() => {
        const lockState = document.pointerLockElement === document.body;

        setLocked(lockState);
    }, [setLocked]);

    const onPointerLockError = useCallback((err) => {
        console.error('Pointer Lock error', err);
        setLocked(false);
    }, [setLocked]);

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onMouseMove]);

    // useEffect(() => {
    //     document.addEventListener("mouseup", lockPointer);
    //     document.addEventListener("pointerlockchange", onPointerLockChange);
    //     document.addEventListener("pointerlockerror", onPointerLockError);

    //     return () => {
    //         unlockPointer();
    //         document.removeEventListener("mouseup", lockPointer);
    //         document.removeEventListener("pointerlockchange", onPointerLockChange);
    //         document.removeEventListener("pointerlockerror", onPointerLockError);
    //     };
    // }, []);

    // useFrame((state, delta, xrFrame) => {
    // });

    return (
        <object3D ref={bodyRef} position={[0, 1.2, 10]}>
            <object3D ref={headRef}>
                <PlayerCamera />
            </object3D>
        </object3D>
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
    // color={hovered ? 'hotpink' : 'orange'}
}

export default function HomePage(props) {
    const [transformable, setTransformable] = useState({
        id: "thing2",
        type: "Thing",
        position: [-1, 1.2, 2],
        rotation: [Math.PI / 4, Math.PI / 5, 0],
        scale: [1, 1, 1],
    });

    const onMouseDown = useCallback(() => {
        setTransformable(tr => {
            let { position: changedPosition } = tr || {};

            changedPosition[2] = changedPosition[2] + 0.5;

            return {
                ...tr,
                position: changedPosition,
            };
        });

    }, [setTransformable]);

    useEffect(() => {
        document.addEventListener("mousedown", onMouseDown);

        return () => {
            document.removeEventListener("mousedown", onMouseDown);
        };
    }, []);

    const { position, rotation, scale } = transformable || {};

    return (
        <div className="HomePage" style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, }}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Player />
                <Walls />

                <Transform
                    position={position}
                    rotation={rotation}
                    scale={scale}
                >
                    <Thing />
                </Transform>

                {/* {TEST_THINGS.map(thingie => {
                    const { id, type, position, rotation, scale } = thingie || {};

                    return (
                        <Fragment key={id}>
                            <Transform
                                position={position}
                                rotation={rotation}
                                scale={scale}
                            >
                                <Thing />
                            </Transform>
                        </Fragment>
                    );
                })} */}

                <Grid />
                <Ground />
            </Canvas>
        </div>
    );
}