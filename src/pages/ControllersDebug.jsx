import * as THREE from 'three';
import { useControls } from 'leva';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Select, useSelect, TransformControls, Html } from '@react-three/drei';
import { Html, Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Player from "../components/Player";
import Transform from "../components/Transform";
import { Plane } from "../components/Plane";
import { OrbiterControls } from "../components/OrbiterControls";

import { Background } from '../components/Background';
import { Environment } from '../components/Environment';
import { AnimatedObject } from '../components/AnimatedObject';

import { useEditorStore } from '../stores/editor';

export default function ControllersDebug(props) {
    const {
        DEBUG,

        setActiveControls,
        setActiveCamera,

    } = useEditorStore();

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


                        {/* <Player /> */}

                        <AnimatedObject
                            startPosition={[0, 0, 0]}
                            endPosition={[0, 1, 0]}
                            startScale={[1, 1, 1]}
                            endScale={[2, 2, 2]}
                            duration={2}
                            delay={0}
                            loop={THREE.LoopPingPong}
                        >
                            <mesh>
                                <boxGeometry />
                                <meshStandardMaterial color={0xff00ff} />
                            </mesh>

                            <Html
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
                                    minWidth: '256px',
                                    userSelect: 'none',
                                }}>
                                    Hello World
                                </div>
                            </Html>
                        </AnimatedObject>
                        <OrbiterControls />
                    </scene>
                </Canvas>
            </div>
        </KeyboardControlsProvider >
    );
}
