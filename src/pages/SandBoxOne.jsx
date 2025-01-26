import * as THREE from 'three';
import { useControls } from 'leva';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Select, useSelect, TransformControls, Html } from '@react-three/drei';
import { Html, Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Player from "../components/Player";
import Transform from "../components/Transform";
import { Selectable } from '../components/Selectable';
import { Thing } from '../components/Thing';

import { Background } from '../components/Background';
import { Environment } from '../components/Environment';
import { Plane } from '../components/Plane';
import { OrbiterControls } from '../components/OrbiterControls';

// import { FloatingBox } from './FloatingBox';
import { AnimatedObject } from '../components/AnimatedObject';
// import { AnimatedBox } from './AnimatedBox';

import { useEditorStore } from '../stores/editor';

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomColor() {
    return Math.floor(Math.random() * 16777215);
}
function getRandomPosition() {
    return [getRandomValue(-5, 5), getRandomValue(0, 2), getRandomValue(-5, 5)];
}

function createRandomThing(id) {
    return {
        id,
        position: getRandomPosition(),
        color: getRandomColor(),
        scale: [getRandomValue(0.5, 1.5), getRandomValue(0.5, 1.5), getRandomValue(0.5, 1.5)],
        rotation: [getRandomValue(0, Math.PI), getRandomValue(0, Math.PI), getRandomValue(0, Math.PI)],
    };
}

const THINGS = Array.from({ length: 10 }, (_, index) => createRandomThing(`randomThing${index + 1}`));

/**
 * HomePage component renders a 3D scene using react-three-fiber and other related libraries.
 * It provides controls for debugging, camera selection, and control modes.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered HomePage component.
 * 
 * @example
 * <HomePage />
 * 
 * @remarks
 * This component uses the following hooks and components:
 * - `useEditorStore`: Custom hook to manage editor state.
 * - `useControls`: Hook to create UI controls for debugging and settings.
 * - `KeyboardControlsProvider`: Context provider for keyboard controls.
 * - `Canvas`: Main canvas for rendering 3D content.
 * - `Transform`, `Background`, `Environment`, `Selectable`, `Physics`, `Player`, `Thing`, `Plane`, `OrbiterControls`: Custom components for various 3D elements and functionalities.
 * 
 * @todo
 * - Implement additional features and controls as needed.
 * - Optimize performance for larger scenes.
 */
export default function SandboxOne(props) {
    const { DEBUG,

        // add leva controls for the following two lines' values, under folder Physics
        gravity, iterations, tolerance, allowSleep,
        setGravity, setIterations, setTolerance, setAllowSleep,

        setDEBUG, showSky, setShowSky, activeCamera, setActiveCamera, activeControls, setActiveControls } = useEditorStore();

    useControls('General', {
        DEBUG: {
            value: DEBUG,
            onChange: (value) => setDEBUG(value),
        },
        ActiveCamera: {
            value: activeCamera,
            options: ['firstPerson', 'orbit'],
            onChange: (value) => setActiveCamera(value),
        },
        ActiveControls: {
            value: activeControls,
            options: ['pointer', 'orbit', 'off'],
            onChange: (value) => setActiveControls(value),
        },
        ShowSky: {
            value: showSky,
            onChange: (value) => setShowSky(value),
        },
        Gravity: {
            value: gravity,
            onChange: (value) => setGravity(value),
        },
        Iterations: {
            value: iterations,
            onChange: (value) => setIterations(value),
        },
        Tolerance: {
            value: tolerance,
            onChange: (value) => setTolerance(value),
        },
        AllowSleep: {
            value: allowSleep,
            onChange: (value) => setAllowSleep(value),
        },
    });

    return (
        <KeyboardControlsProvider>
            <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                <Canvas shadows>
                    <scene>
                        <Transform />
                        <Background />
                        {showSky ? <Sky /> : null}
                        <Environment />

                        <Selectable>
                            <mesh position={[0, 0, 0]}>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial wireframe color={0x00ff00} />
                            </mesh>
                        </Selectable>
                        <Physics
                            gravity={gravity}
                            iterations={iterations}
                            tolerance={tolerance}
                            allowSleep={allowSleep}
                        // floorContactEquationStiffness={1e8}
                        >
                            <Html
                                center
                                transform
                                sprite
                            >
                                <div style={{
                                    position: "absolute",
                                    zIndex: 1,
                                    top: "50%",
                                    left: "50%",
                                    width: "20px",
                                    height: "20px",
                                    backgroundColor: "rgb(255 0 255 / 1)",
                                    transform: "translate(-50%, -50%)",
                                    borderRadius: "50%",
                                }}
                                >
                                    <div style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "8px",
                                        height: "8px",
                                        backgroundColor: "rgb(255 255 0 / 1)",
                                        transform: "translate(-50%, -50%)",
                                        borderRadius: "50%",
                                    }}
                                    >
                                    </div>
                                </div>
                            </Html>

                            <Player />
                            {THINGS.map((thing) => (
                                <Thing key={thing.id} {...thing} />
                            ))}

                            <AnimatedObject
                                startPosition={[2.5, 0, 2.5]}
                                endPosition={[2.5, 3, 2.5]}
                                startScale={[1, 1, 1]}
                                endScale={[10, 10, 10]}
                                duration={5}
                                delay={0}
                                loop={THREE.LoopPingPong}
                            >
                                <mesh>
                                    <boxGeometry />
                                    <meshBasicMaterial color="royalblue" />
                                </mesh>
                            </AnimatedObject>

                            <Plane />
                        </Physics>
                        <OrbiterControls />

                    </scene>
                </Canvas>
            </div>
        </KeyboardControlsProvider >
    );
}
