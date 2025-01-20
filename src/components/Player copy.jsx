import * as THREE from "three";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, PerspectiveCamera, PointerLockControls, useHelper } from "@react-three/drei";
import { useBox, useSphere } from '@react-three/cannon';

import useGamepads from "../hooks/useGamepads";
import { useKeyboardControls } from "../hooks/KeyboardControls";
import { useEditorStore } from "../stores/editor";

const _lngDir = new THREE.Vector3(0, 0, -1);
const _up = new THREE.Vector3(0, 1, 0);
const _left = new THREE.Vector3(1, 0, 0);

export default function Player(props) {
    const {
        activeControls,
        activeCamera,
        fpsCameraFOV,
        forceMagnitude,
        jumpForceMagnitude,
        multiplier,
        shiftMultiplier,
        linearDamping,
        angularDamping,
        playerMass,
    } = useEditorStore();
    const [bodyRef, api] = useSphere(() => ({
        type: "Dynamic",
        args: [0.5, 1.5], // Capsule-like radius and height
        position: [0, 1, 0],
        angularFactor: [0, 1, 0], // Prevent tipping
        mass: playerMass,
        linearDamping,
        angularDamping,
    }));
    const headRef = useRef();
    const cameraRef = useRef();
    const controlsRef = useRef();

    const _lngDir = useRef(new THREE.Vector3());
    const _latDir = useRef(new THREE.Vector3());

    const state = useThree((state) => state);
    const size = useThree(({ size }) => size);

    const { gamepads, getGamepadInputs } = useGamepads();
    const [locked, setLocked] = useState(false);

    const onLock = useCallback(e => {
        setLocked(true);
    }, [setLocked]);

    const onUnlock = useCallback(e => {
        setLocked(false);
    }, [setLocked]);

    useEffect(() => {
        cameraRef.current.fov = fpsCameraFOV;
    }, [fpsCameraFOV]);

    const onPointerLockControlsChange = useCallback(e => {
        const { target } = e || {};
        const { camera } = target || {};

        camera.getWorldDirection(_lngDir.current);

        _latDir.current.copy(_lngDir.current);
        _latDir.current.setY(0);
        _latDir.current.applyAxisAngle(_up, Math.PI / 2);
    }, []);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size, props]);

    const [_, get] = useKeyboardControls();

    const handleGamepadInput = useCallback((player1) => {
        const { leftStick, rightStick, buttonA } = player1 || {};
        const [leftX, leftY] = leftStick || [];
        const [rightX, rightY] = rightStick || [];

        cameraRef.current.getWorldDirection(_lngDir.current);

        _latDir.current.copy(_lngDir.current);
        _latDir.current.setY(0);
        _latDir.current.applyAxisAngle(_up, Math.PI / 2);

        const currentMultiplier = buttonA ? 0.02 : multiplier;
        const longitudinalSpeed = (Math.abs(leftY) > 0.1 ? leftY : 0) * -currentMultiplier;
        const lateralSpeed = (Math.abs(leftX) > 0.1 ? leftX : 0) * -currentMultiplier;

        const panHorizontal = (Math.abs(rightX) > 0.1 ? rightX : 0);
        const panVertical = (Math.abs(rightY) > 0.1 ? rightY : 0);

        const newRotation = cameraRef.current.rotation.clone();
        newRotation.x = newRotation.x + panVertical * 0.01;
        newRotation.y = newRotation.y + panHorizontal * 0.01;

        cameraRef.current.rotation.copy(newRotation);

        return { longitudinalSpeed, lateralSpeed };
    }, [multiplier]);

    const handleKeyboardInput = useCallback(() => {
        let longitudinalSpeed = 0;
        let lateralSpeed = 0;
        let jumpSpeed = 0;
        const currentMultiplier = get().MODIFIER_SHIFT ? shiftMultiplier : multiplier;

        if (get().FORWARD) {
            longitudinalSpeed = 1 * currentMultiplier;
        }
        if (get().BACKWARD) {
            longitudinalSpeed = -1 * currentMultiplier;
        }
        if (get().LEFTWARD) {
            lateralSpeed = 0.5 * currentMultiplier;
        }
        if (get().RIGHTWARD) {
            lateralSpeed = -0.5 * currentMultiplier;
        }
        if (get().JUMP) {
            jumpSpeed = 1 * jumpForceMagnitude;
        }

        return { longitudinalSpeed, lateralSpeed, jumpSpeed };
    }, [get, multiplier, shiftMultiplier, jumpForceMagnitude]);

    useFrame(() => {
        let longitudinalForce = 0;
        let lateralForce = 0;
        let jumpForce = 0;

        if (cameraRef.current) {
            cameraRef.current.getWorldDirection(_lngDir.current);
        }

        _latDir.current.copy(_lngDir.current);
        _latDir.current.setY(0);
        _latDir.current.applyAxisAngle(_up, Math.PI / 2);

        const player1 = getGamepadInputs(0);

        if (player1 && !locked) {
            const forces = handleGamepadInput(player1);
            longitudinalForce = forces.longitudinalSpeed;
            lateralForce = forces.lateralSpeed;
        } else if (locked) {
            const forces = handleKeyboardInput();
            longitudinalForce = forces.longitudinalSpeed;
            lateralForce = forces.lateralSpeed;
            jumpForce = forces.jumpSpeed;
        }

        const longitudinalVector = _lngDir.current.clone().multiplyScalar(longitudinalForce * forceMagnitude);
        const lateralVector = _latDir.current.clone().multiplyScalar(lateralForce * forceMagnitude);
        const jumpVector = new THREE.Vector3(0, jumpForce, 0);
        api.applyForce(longitudinalVector.toArray(), [0, 0, 0]);
        api.applyForce(lateralVector.toArray(), [0, 0, 0]);
        api.applyForce(jumpVector.toArray(), [0, 0, 0]);
    });

    return (
        <object3D ref={bodyRef} >
            <mesh position={[0, 10, 0]} visible={activeCamera !== 'firstPerson'}>
                {/* <sphereGeometry args={[0.5, 32, 32]} /> */}
                <boxGeometry args={[1, 1.8, 1]} />
                <meshBasicMaterial wireframe />
            </mesh>

            <object3D ref={headRef}>
                <PerspectiveCamera makeDefault={activeCamera === "firstPerson"} ref={cameraRef}>
                    <Reticle />
                </PerspectiveCamera>
            </object3D>

            <PointerLockControls
                ref={controlsRef}
                enabled={activeControls === 'pointer'}
                selector="#canvas"
                onChange={onPointerLockControlsChange}
                onLock={onLock}
                onUnlock={onUnlock}
            />
        </object3D>
    );
}

function Reticle() {
    return (
        <object3D position={[0, 0, -1]}>
            <Html center>
                <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "1px", height: "32px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />
                <div style={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", width: "32px", height: "1px", backgroundColor: "rgb(0 0 0 / 1)", transform: "translate(-50%, -50%)" }} />
            </Html>
        </object3D>
    )
}