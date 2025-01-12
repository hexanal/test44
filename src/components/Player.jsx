import * as THREE from "three";
import { PerspectiveCamera, PointerLockControls, useHelper } from "@react-three/drei";
import { useEditorStore } from '../stores/editor';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useKeyboardControls } from '../hooks/KeyboardControls';

const _lngDir = new THREE.Vector3(0, 0, -1);
const _latDir = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

export default function Player(props) {
    const bodyRef = useRef();
    const headRef = useRef();
    const cameraRef = useRef();
    const controlsRef = useRef();

    const size = useThree(({ size }) => size);

    // useHelper(cameraRef, THREE.CameraHelper);

    const { activeControls, activeCamera } = useEditorStore();
    const [locked, setLocked] = useState(false);

    const onLock = useCallback(e => {
        setLocked(true);
    }, [setLocked]);

    const onUnlock = useCallback(e => {
        setLocked(false);
    }, [setLocked]);

    // const unlock = useCallback(e => {
    //     console.log('unlock?', controlsRef.current);
    //     controlsRef.current.unlock();

    //     onUnlock();
    // }, [onUnlock]);

    // useEffect(() => {
    //     if (activeControls === "pointer") {
    //         console.log('pointer mode active');
    //         controlsRef.current.domElement.addEventListener("mouseup", unlock);
    //     } else {
    //         controlsRef.current.domElement.removeEventListener("mouseup", unlock);
    //     }
    // }, [activeControls, unlock]);

    const onPointerLockControlsChange = useCallback(e => {
        const { target } = e || {};
        const { camera } = target || {};

        camera.getWorldDirection(_lngDir);

        _latDir.copy(_lngDir);
        _latDir.setY(0);
        _latDir.applyAxisAngle(_up, Math.PI / 2);

        // console.log(target);
    // }, [dctiveCamera, activeControls]);
    }, []);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size, props]);

    const [_, get] = useKeyboardControls();

    useFrame(() => {
        if (!locked) return;
        let longitudinalSpeed = 0;
        let lateralSpeed = 0;
        let multiplier = get().MODIFIER_SHIFT ? 0.02 : 0.2;

        if (get().FORWARD) {
            longitudinalSpeed = 1 * multiplier;
        }
        if (get().BACKWARD) {
            longitudinalSpeed = -1 * multiplier;
        }
        if (get().LEFTWARD) {
            lateralSpeed = 0.5 * multiplier;
        }
        if (get().RIGHTWARD) {
            lateralSpeed = -0.5 * multiplier;
        }
        // TODO to implement jump... this is where things get complicated :)

        bodyRef.current.position.addScaledVector(_lngDir, longitudinalSpeed);
        bodyRef.current.position.addScaledVector(_latDir, lateralSpeed);
    });

    return (
        <object3D ref={bodyRef}>
            <object3D ref={headRef}>
                <PerspectiveCamera makeDefault={activeCamera === "firstPerson"} ref={cameraRef} position={[0, 1.5, -15]} />
            </object3D>

            <PointerLockControls
                ref={controlsRef}
                enabled={activeControls === 'pointer'}
                selector="#canvas"
                onChange={onPointerLockControlsChange}
                onLock={onLock}
                onUnlock={onUnlock}
            />
        </object3D >
    );
}