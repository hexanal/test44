import * as THREE from 'three';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Select, useSelect, TransformControls, Html } from '@react-three/drei';
import { Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';

import KeyboardControlsProvider from "../../components/KeyboardControlsProvider";
import Player from "../../components/Player";
import Transform from "../../components/Transform";

import { Background } from './Background';
import { Environment } from './Environment';
import { Plane } from './Plane';
import { OrbiterControls } from './OrbiterControls';
import { FloatingBox } from './FloatingBox';
import { AnimatedObject } from './AnimatedObject';
import { AnimatedBox } from './AnimatedBox';

import { useEditorStore } from '../../stores/editor';

import Knob from "../../components/Knob";
import Fader from "../../components/Fader";
import { TweakerPanel } from "../../components/TweakerPanel";

export function Selectable(props) {
    const { children, onSelect } = props || {};
    const { setSelected } = useEditorStore();

    const onClick = useCallback((e) => {
        const { object: targetObject } = e || {};
        setSelected(targetObject);
        if (onSelect) onSelect(targetObject);
    }, [setSelected]);

    return (
        <object3D onClick={onClick}>
            {children}
        </object3D>
    );
}

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

export function Thing(props) {
    const { id, position, color = 0x000000, scale, rotation, onSelect } = props || {};
    const ref = useRef();
    const { selected } = useEditorStore();

    return (
        <>
            <Selectable onSelect={onSelect}>
                <mesh
                    ref={ref}
                    name={id}
                    position={position}
                    scale={scale}
                    rotation={rotation}
                    // castShadow
                    // receiveShadow
                >
                    <boxGeometry args={[1, 1, 1]} />
                    {selected === ref.current ? (
                        <meshBasicMaterial color={color} />
                    ) : (
                        <meshStandardMaterial color={color} />
                    )}
                </mesh>
            </Selectable>
        </>
    );
}


export default function HomePage(props) {
    const [endScale, setEndScale] = useState(1);


    return (
        <KeyboardControlsProvider>
            <div style={{ position: "absolute", zIndex: 2, top: "0.25rem", right: "0.25rem", backgroundColor: "rgb(255 255 255 / 1)" }}>
                {/* <Fader
                    label={"Timeline"}
                    value={endScale}
                    onChange={setEndScale}
                    min={0.1}
                    max={4}
                    minAngle={-140}
                    maxAngle={140}
                    withCurrentValueIndicator
                /> */}
                <Knob
                    label={"End Scale"}
                    value={endScale}
                    onChange={setEndScale}
                    min={0.1}
                    max={4}
                    minAngle={-140}
                    maxAngle={140}
                    withCurrentValueIndicator
                />
            </div>
            <TweakerPanel />

            <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                {/* 
                TODO: 

                -> try and duplicate the structure of Voyager but with react components
                -> try to use as many drei components as possible
                -> quick and dirty
                -> test performances
                    -> framerate metrics
                    -> benchmarks
                */}

                <Canvas shadows>
                    <scene>
                        <Transform />


                        <Background />
                        <Sky />
                        <Environment />

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
