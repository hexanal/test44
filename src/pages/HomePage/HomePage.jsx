import * as THREE from 'three';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
    GradientTexture, // TODO
    GradientType, // TODO
    OrbitControls,
    PerspectiveCamera,
    useHelper,
    Grid,
    Select, // TODO
} from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import KeyboardControlsProvider from "../../components/KeyboardControlsProvider";


import { useEditorStore } from '../../stores/editor';

import Transform from '../../components/Transform';
import Player from "../../components/Player";

function GridHelper(props) {
    // TODO
    return (
        <Grid
            position={[0, 0.05, 0]}
            fadeDistance={50}
            fadeStrength={0.5}
            infiniteGrid
        />
    );
}

function Plane(props) {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], ...props }))
    return (
        <mesh
            ref={ref}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
        </mesh>
    )
}

export function Thing(props) {
    const [ref] = useBox(() => ({ mass: 1.5, position: [0, 10, 0], ...props }))


    return (
        <mesh ref={ref} castShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={0x04ff88} />
        </mesh>
    );
}

export function OrbiterControls(props) {
    const cameraRef = useRef();
    const size = useThree(({ size }) => size);
    const { activeControls } = useEditorStore();

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height
            cameraRef.current.updateProjectionMatrix()
        }
    }, [size, props]);

    return (
        <object3D>
            <PerspectiveCamera makeDefault={activeControls === 'orbit'} name="ORBIT" ref={cameraRef} position={[0, 1, 3]} />
            <OrbitControls enabled={activeControls === 'orbit'} camera={cameraRef.current} />
        </object3D>
    );

}

export function Background() {
    const textureRef = useRef();
    const scene = useThree(state => state.scene);

    // TODO
    // useTweakerSaver => ui for changing values / saving / persistenfce
    // how to save to a structure

    useEffect(() => {
        scene.background = new THREE.Color().setRGB(1, 0.9, 1, THREE.SRGBColorSpace);
        // TODO scene.background = textureRef.current;
    }, [scene]);

    return (
        <>
            {/*
            TODO <GradientTexture
                stops={[0, 1]} // As many stops as you want
                colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
                size={1024} // Size is optional, default = 1024
            /> */}
            {/*
            TODO <GradientTexture
                ref={textureRef}
                stops={[0, 0.5, 1]} // As many stops as you want
                colors={['aquamarine', 'hotpink', 'yellow']} // Colors need to match the number of stops
                size={1024} // Size (height) is optional, default = 1024
                width={1024} // Width of the canvas producing the texture, default = 16
                type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
                innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
                outerCircleRadius={'auto'} // Optional, the radius of the outer circle of the gradient, default = auto
            /> */}
        </>
    );
}

export function EnvironmentDefaults() {
    const pointLightRef = useRef();
    const spotLightRef = useRef();

    useHelper(pointLightRef, THREE.PointLightHelper);
    useHelper(spotLightRef, THREE.SpotLightHelper);

    return (
        <>
            <axesHelper args={[2]} />
            <ambientLight intensity={Math.PI / 10} />
            <Transform object={spotLightRef.current} />
            <spotLight
                ref={spotLightRef}
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={2}
                decay={0}
                intensity={Math.PI}
                castShadow
            />

            <Transform object={pointLightRef.current} />
            <pointLight
                ref={pointLightRef}
                position={[-10, 3, 10]}
                decay={0.1}
                intensity={Math.PI / 2}
                castShadow
            />
        </>
    );
}

export default function HomePage(props) {
    const { showGrid, setShowGrid, activeControls, setActiveControls, setActiveCamera } = useEditorStore();

    const onChangeActiveControls = useCallback((e) => {
        const { target } = e || {};
        const { value } = target || {};
        setActiveControls(value);
        setActiveCamera(value === "pointer" ? "firstPerson" : "orthographic");
    }, [setActiveControls, setActiveCamera]);

    const onSelect = useCallback((e) => {
        console.log(e);
    }, []);

    return (
        <KeyboardControlsProvider>
            <div className="HomePage">
                <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, backgroundColor: "rgb(0 0 0 / 0.2)" }}>
                    Current: <pre>{activeControls}</pre>
                    <label>
                        <input type="radio" name="activeControls" value="pointer" checked={activeControls === "pointer"} onChange={onChangeActiveControls} />
                        FPS (pointer locked)
                    </label>
                    <label>
                        <input type="radio" name="activeControls" value="orbit" checked={activeControls === "orbit"} onChange={onChangeActiveControls} />
                        Orbit
                    </label>
                    <label>
                        <input type="radio" name="activeControls" value="off" checked={activeControls === "off"} onChange={onChangeActiveControls} />
                        Off
                    </label>

                    <div>
                        <label>
                            <input type="checkbox" name="toggleGrid" checked={showGrid} onChange={() => setShowGrid(prev => !prev)} />
                            Toggle Grid
                        </label>
                    </div>
                </div>

                <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "1px", height: "32px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "32px", height: "1px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />

                    <Canvas>
                        <Background />
                        <EnvironmentDefaults />

                        <Physics>
                            <Player />

                            {/* 
                            TODO
                            get transform as "useTransformHGizmo" in Thing
                            get selectable, as "useSelect" / or custom 
                            ... etc
                            */}

                            <Thing />

                            <Plane />
                        </Physics>
                        <OrbiterControls />

                        {showGrid ? <GridHelper /> : null}
                    </Canvas>
                </div>
            </div>
        </KeyboardControlsProvider>
    );
}
