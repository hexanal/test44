import { PivotControls, PointerLockControls } from '@react-three/drei';
import { KeyboardControls } from '../../hooks/KeyboardControls';
import { useEditorStore } from '../../stores/editor';
import Transform from '../../components/Transform';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import Player from "../../components/Player";

function Grid(props) {
    // TODO

    return (
        <gridHelper args={[10, 10]} />
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
}

export default function HomePage(props) {
    const controlsMapping = useMemo(()=> [
        { name: "FORWARD", keys: ['ArrowUp', 'KeyW'] },
        { name: "BACKWARD", keys: ['ArrowDown', 'KeyS'] },
        { name: "LEFTWARD", keys: ['ArrowLeft', 'KeyA'] },
        { name: "RIGHTWARD", keys: ['ArrowRight', 'KeyD'] },
        { name: "JUMP", keys: ['Space'] },
        { name: "INTERACT", keys: ['KeyE'] },
        { name: "MODIFIER_SHIFT", keys: ['shiftKey'] },
        { name: "MODIFIER_ALT", keys: ['altKey'] },
      ], [])

    const { activeControls, toggleActiveControls } = useEditorStore();
    // const 

    const onKeyboardControlsChange = useCallback((name, pressed, state) => {
        console.log('HomePage - onKeyboardControlsChange', { name, pressed, state });
    }, []);

    const onClickToggleControls = useCallback((e) => {
        toggleActiveControls();
    }, [toggleActiveControls]);

    return (
        <KeyboardControls map={controlsMapping} onChange={onKeyboardControlsChange}>
            <div className="HomePage">
                <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, backgroundColor: "rgb(0 0 0 / 0.2)" }}>
                    Current: <pre>{activeControls}</pre>
                    <button type="button" onClick={onClickToggleControls}>Toggle</button>
                </div>

                <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "1px", height: "32px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />
                    <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "32px", height: "1px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />

                    <Canvas >
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                        <Player />

                        <Transform>
                            <Thing />
                        </Transform>

                        <Grid />
                    </Canvas>
                </div>
            </div>

        </KeyboardControls>
    );
}