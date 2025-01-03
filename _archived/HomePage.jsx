// import { OrbitControls, PivotControls } from '@react-three/drei';
import { PivotControls, PointerLockControls, KeyboardControls } from '@react-three/drei';
import { useEditorStore } from '../../stores/editor';

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
        { name: "MODIFIER_SHIFT", keys: ['Shift'] },
      ], [])

    const { activeControls, toggleActiveControls } = useEditorStore();
    // const 
    const onDrag = useCallback((e) => {
        console.log(e);
    }, []);

    const onClickToggleControls = useCallback((e) => {
        toggleActiveControls();
    }, [toggleActiveControls]);

    return (
        <KeyboardControls map={controlsMapping}>
            <div className="HomePage">
                <div style={{ position: "absolute", zIndex: 2, top: 0, left: 0, backgroundColor: "rgb(0 0 0 / 0.2)" }}>
                    Current: <pre>{activeControls}</pre>
                    <button type="button" onClick={onClickToggleControls}>Toggle</button>
                </div>

                <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                    <Canvas >
                        <ambientLight intensity={Math.PI / 2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

                        <Player />
                        {/* {
                            activeControls === 'pointer' ? (
                                <PointerLockControls enabled={activeControls === 'pointer'} selector="#canvas" />
                            ) : null} */}

                        <PivotControls
                            enabled={activeControls === 'pivot'}
                            onDrag={onDrag}
                        >
                            <Thing />
                        </PivotControls>
                        <Grid />
                    </Canvas>
                </div>
            </div>

        </KeyboardControls>
    );
}