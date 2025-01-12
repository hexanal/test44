// import * as THREE from 'three';
import { useCallback, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Select, useSelect, TransformControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import KeyboardControlsProvider from "../../components/KeyboardControlsProvider";

import { useEditorStore } from '../../stores/editor';

import Player from "../../components/Player";

import { Background } from './Background';
import { Environment } from './Environment';
import { GridHelper } from './GridHelper';
import { Plane } from './Plane';
import { OrbiterControls } from './OrbiterControls';

export function Thing(props) {
    const { position = [0, 10, 0] } = props || {};
    const [ref] = useBox(() => ({ mass: 1.5, position, ...props }))
    const { transformMode } = useEditorStore();

    const selected = useSelect();
    // setSelection();

    return (
        <TransformControls
            mode={transformMode}
            object={ref}
            // makeDefault={selected}
        >
            <mesh ref={ref} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={0x04ff88} />
            </mesh>
        </TransformControls>
    );
}

export default function HomePage(props) {
    const { showGrid, setShowGrid, activeControls,
        boxSelectActive,
        setBoxSelectActive,
        setActiveControls,
        setActiveCamera,
        transformMode,
        // setTransformMode,
    } = useEditorStore();

    const [selection, setSelection] = useState(null);

    const onChangeActiveControls = useCallback((e) => {
        const { target } = e || {};
        const { value } = target || {};
        setActiveControls(value);
        setActiveCamera(value === "pointer" ? "firstPerson" : "orthographic");
    }, [setActiveControls, setActiveCamera]);

    const onChangePointerUpSelect = useCallback((e) => {
        const [newObject = null] = e || [];

        setSelection(newObject);
    }, [transformMode, selection, setSelection]);

    const onClickSelect = useCallback((e) => {
        const { object = null } = e || {};

        let newObject = object;

        console.log({ e, selection });

        // if (sel.length === 0) {
        //     newObject = null;
        // }

        setSelection(newObject);

        // TODO handle select multiple
        // if (sel.length > 1) {
        //     setSelection(sel[0]);
        // }
    }, [transformMode, selection, setSelection]);

    const { name, type } = useMemo(() => {
        return selection || {};
    }, [selection])

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
                            <input type="checkbox" name="toggleGrid" value={showGrid} onChange={() => setShowGrid(prev => !prev)} />
                            Toggle Grid
                        </label>
                        <label>
                            <input type="checkbox" name="toggleBoxSelect" value={boxSelectActive} onChange={() => setBoxSelectActive(prev => !prev)} />
                            Box select active
                        </label>
                    </div>

                    {selection ? (
                        <div>
                            Selection:
                            <pre>name: {name} / type: {type}</pre>
                            {/* Selection: {selection} */}
                        </div>
                    ) : null}
                </div>

                <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "1px", height: "32px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "32px", height: "1px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />

                    <Canvas>
                        {/* {selection ? <TransformControls
                            mode={transformMode}
                            object={selection}
                        >
                        </TransformControls>
                            : null} */}

                        <Background />
                        <Environment />

                        <Physics>
                            <Player />

                            <Select
                                box={boxSelectActive}
                                onClick={onClickSelect}
                                onChangePointerUp={onChangePointerUpSelect}
                            // onChange={onChange}
                            >
                                <Thing />
                            </Select>

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
