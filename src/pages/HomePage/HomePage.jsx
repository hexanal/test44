// import * as THREE from 'three';
import { useControls } from 'leva';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Select, useSelect, TransformControls, Html } from '@react-three/drei';
import { Html, Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';

import KeyboardControlsProvider from "../../components/KeyboardControlsProvider";
import Player from "../../components/Player";
import Transform from "../../components/Transform";
import { Selectable } from '../../components/Selectable';
import { Thing } from '../../components/Thing';

import { Background } from './Background';
import { Environment } from './Environment';
import { Plane } from './Plane';
import { OrbiterControls } from './OrbiterControls';

// import { FloatingBox } from './FloatingBox';
// import { AnimatedObject } from './AnimatedObject';
// import { AnimatedBox } from './AnimatedBox';

import { useEditorStore } from '../../stores/editor';

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
export default function HomePage(props) {
    const { DEBUG, setDEBUG, showSky, setShowSky, activeCamera, setActiveCamera, activeControls, setActiveControls } = useEditorStore();

    useControls({
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
                        <Physics>
                            {/*
                        <Html
                                center
                                transform
                                sprite
                            >
                                <Knob
                                    label={"FOV"}
                                    value={fpsCameraFOV}
                                    onChange={setFpsCameraFOV}
                                    min={10}
                                    max={120}
                                    minAngle={-100}
                                    maxAngle={100}
                                    withCurrentValueIndicator
                                />
                        </Html>
                        */}

                            <Player />
                            {THINGS.map((thing) => (
                                <Thing key={thing.id} {...thing} />
                            ))}

                            {/* <AnimatedObject
                                startPosition={[2.5, 0, 2.5]}
                                endPosition={[2.5, 3, 2.5]}
                                startScale={[1, 1, 1]}
                                endScale={[endScale, endScale, endScale]}
                                duration={5}
                                delay={0}
                                loop={THREE.LoopPingPong}
                            >
                            <mesh>
                                <boxGeometry />
                                <meshBasicMaterial color="royalblue" />
                            </mesh>
                        </AnimatedObject> */}

                            <Plane />
                        </Physics>
                        <OrbiterControls />

                    </scene>
                </Canvas>
            </div>
        </KeyboardControlsProvider >
    );
}
