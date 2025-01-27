import * as THREE from 'three';
import { useControls } from 'leva';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Select, useSelect, TransformControls, Html } from '@react-three/drei';
import { Html, Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { Position, Rotation, Scale } from "./components";
import { OrbiterControls } from "../components/OrbiterControls";

import { Background } from '../components/Background';
import { Environment } from '../components/Environment';
import { AnimatedObject } from '../components/AnimatedObject';

import { useEditorStore } from '../stores/editor';
import { useGameStore } from '../stores/game';

export default function ControllersDebug(props) {
    const {
        DEBUG,
        setActiveControls,
        setActiveCamera,
    } = useEditorStore();
    const { entities } = useGameStore();

    useEffect(() => {
        setActiveControls('orbit');
        setActiveCamera('orbit');
    }, [setActiveControls, setActiveCamera]);

    // useControls('ControllersDebug', {
    //     DEBUG: {
    //         value: DEBUG,
    //         onChange: (value) => setDEBUG(value),
    //     },
    // });

    return (
        <KeyboardControlsProvider>
            <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                <Canvas shadows>
                    <scene>
                        <Transform />
                        <Background />
                        <Sky />
                        <Environment />

                        {Object.values(entities).map((entity, index) => {
                            return (
                                <object3D key={index}
                                    position={[Position.x[entity], Position.y[entity], Position.z[entity]]}
                                    rotation={[Rotation.x[entity], Rotation.y[entity], Rotation.z[entity]]}
                                    scale={[Scale.x[entity], Scale.y[entity], Scale.z[entity]]}
                                >
                                    <mesh>
                                        <boxGeometry />
                                        <meshStandardMaterial color={0xff00ff} />
                                    </mesh>

                                    <Html
                                        scale={[0.4, 0.4, 0.4]}
                                        center
                                        transform
                                    // sprite
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '2px solid',
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            padding: '2px 4px',
                                            fontFamily: 'monospace',
                                            color: 'white',
                                            fontSize: '10px',
                                            borderRadius: '4px',
                                            // minWidth: '256px',
                                            userSelect: 'none',
                                        }}>
                                            {entity}
                                        </div>
                                    </Html>
                                </object3D>
                            );
                        })}

                        {/* <AnimatedObject
                            startPosition={[0, 0, 0]}
                            endPosition={[0, 1, 0]}
                            startScale={[1, 1, 1]}
                            endScale={[2, 2, 2]}
                            duration={2}
                            delay={0}
                            loop={THREE.LoopPingPong}
                        >
                        </AnimatedObject> */}

                        <OrbiterControls />
                    </scene>
                </Canvas>
            </div>
        </KeyboardControlsProvider >
    );
}
