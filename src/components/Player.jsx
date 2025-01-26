import * as THREE from "three";
import { usePlayerLevaSettings } from "./usePlayerLevaSettings";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { useBox, useSphere } from '@react-three/cannon';

import useGamepads from "../hooks/useGamepads";
import { useKeyboardControls } from "../hooks/KeyboardControls";
import { useEditorStore } from "../stores/editor";

const _up = new THREE.Vector3(0, 1, 0);

export default function Player(props) {
    const {
        activeControls,
        activeCamera,
        keyboardEnabled,
        fpsCameraFOV,
        moveForceMagnitude,
        jumpForceMagnitude,
        multiplier,
        shiftMultiplier,
        linearDamping,
        angularDamping,
        playerMass,
        panHorizontalSensitivity,
        panVerticalSensitivity,
    } = useEditorStore();

    usePlayerLevaSettings();

    const [bodyRef, api] = useSphere(() => ({
        type: "Dynamic",
        args: [0.5, 1.5], // Capsule-like radius and height
        position: [0, 1, 0],
        friction: 0.01, 
        angularFactor: [0, 1, 0], // Prevent tipping
        mass: playerMass,
        linearDamping,
        angularDamping,
    }));
    const headRef = useRef();
    const cameraRef = useRef();

    const _lngDir = useRef(new THREE.Vector3());
    const _latDir = useRef(new THREE.Vector3());

    const size = useThree(({ size }) => size);

    const [locked, setLocked] = useState(false);

    const longitudinalForceRef = useRef(0);
    const lateralForceRef = useRef(0);
    const jumpForceRef = useRef(0);
    const verticalTorqueRef = useRef(0);
    const horizontalTorqueRef = useRef(0);

    const handlePointerLockChange = useCallback(() => {
        if (activeControls !== 'pointer') return;

        const root = document.getElementById('canvas');
        if (document.pointerLockElement === root) {
            setLocked(true);
        } else {
            setLocked(false);
        }
    }, [setLocked, activeControls]);

    const handlePointerLockError = useCallback(() => {
        console.error("Pointer lock failed");
    }, []);

    const requestPointerLock = useCallback(() => {
        if (activeControls !== 'pointer') return;

        const root = document.getElementById('canvas');
        if (root) {
            root.requestPointerLock();
        }
    }, [activeControls]);

    useEffect(() => {
        const root = document.getElementById('canvas');
        if (root) {
            root.addEventListener('click', requestPointerLock);
        }
        document.addEventListener('pointerlockchange', handlePointerLockChange);
        document.addEventListener('pointerlockerror', handlePointerLockError);
        return () => {
            if (root) {
                root.removeEventListener('click', requestPointerLock);
            }
            document.removeEventListener('pointerlockchange', handlePointerLockChange);
            document.removeEventListener('pointerlockerror', handlePointerLockError);
        };
    }, [handlePointerLockChange, handlePointerLockError, requestPointerLock]);

    useEffect(() => {
        cameraRef.current.fov = fpsCameraFOV;
    }, [fpsCameraFOV]);

    const handleMouseMove = useCallback((event) => {
        if (!locked) return;

        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        const panHorizontal = movementX * 0.075;
        const panVertical = movementY * 0.025;

        horizontalTorqueRef.current = panHorizontal;
        verticalTorqueRef.current = panVertical;

        bodyRef.current.getWorldDirection(_lngDir.current);

        _latDir.current.copy(_lngDir.current);
        _latDir.current.setY(0);
        _latDir.current.applyAxisAngle(_up, Math.PI / 2);
    }, [locked, panHorizontalSensitivity, panVerticalSensitivity]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    useLayoutEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.aspect = size.width / size.height;
            cameraRef.current.updateProjectionMatrix();
        }
    }, [size, props]);

    const [_keys, getKeyboardInputs] = useKeyboardControls();
    const [_gamepads, getGamepadInputs] = useGamepads();

    const handleGamepadInput = useCallback((player1) => {
        const { leftStick, rightStick, buttonA } = player1 || {};
        const [leftX, leftY] = leftStick || [];
        const [rightX, rightY] = rightStick || [];

        bodyRef.current.getWorldDirection(_lngDir.current);

        _latDir.current.copy(_lngDir.current);
        _latDir.current.setY(0);
        _latDir.current.applyAxisAngle(_up, Math.PI / 2);

        const currentMultiplier = 1;
        const longitudinalSpeed = (Math.abs(leftY) > 0.1 ? leftY : 0) * currentMultiplier;
        const lateralSpeed = (Math.abs(leftX) > 0.1 ? leftX : 0) * currentMultiplier;

        const panHorizontal = (Math.abs(rightX) > 0.1 ? rightX : 0);
        const panVertical = (Math.abs(rightY) > 0.1 ? rightY : 0);

        let jumpSpeed = 0;
        if (buttonA) {
            jumpSpeed = 1 * jumpForceMagnitude;
        }

        longitudinalForceRef.current = longitudinalSpeed;
        lateralForceRef.current = lateralSpeed;
        jumpForceRef.current = jumpSpeed;
        horizontalTorqueRef.current = panHorizontal;
        verticalTorqueRef.current = panVertical;
    }, [multiplier, panHorizontalSensitivity, panVerticalSensitivity, jumpForceMagnitude]);

    const handleKeyboardInput = useCallback(() => {
        let longitudinalSpeed = 0;
        let lateralSpeed = 0;
        let jumpSpeed = 0;
        const currentMultiplier = getKeyboardInputs().MODIFIER_SHIFT ? shiftMultiplier : multiplier;

        if (getKeyboardInputs().FORWARD) {
            longitudinalSpeed = -1 * currentMultiplier;
        }
        if (getKeyboardInputs().BACKWARD) {
            longitudinalSpeed = 1 * currentMultiplier;
        }
        if (getKeyboardInputs().LEFTWARD) {
            lateralSpeed = 0.5 * currentMultiplier;
        }
        if (getKeyboardInputs().RIGHTWARD) {
            lateralSpeed = -0.5 * currentMultiplier;
        }
        if (getKeyboardInputs().JUMP) {
            jumpSpeed = 1 * jumpForceMagnitude;
        }

        longitudinalForceRef.current = longitudinalSpeed;
        lateralForceRef.current = lateralSpeed;
        jumpForceRef.current = jumpSpeed;
    }, [getKeyboardInputs, multiplier, shiftMultiplier, jumpForceMagnitude]);

    useFrame(() => {
        if (activeControls !== 'pointer') return;

        const player1 = getGamepadInputs(0);

        if (player1 && !locked) {
            handleGamepadInput(player1);
        } else if (keyboardEnabled) {
            handleKeyboardInput();
        }

        if (headRef.current) {
            const headRot = headRef.current.rotation.clone();
            headRot.x += verticalTorqueRef.current * -panVerticalSensitivity;
            headRef.current.rotation.copy(headRot);
        }

        const longitudinalVector = _lngDir.current.clone().multiplyScalar(longitudinalForceRef.current * moveForceMagnitude);
        const lateralVector = _latDir.current.clone().multiplyScalar(lateralForceRef.current * moveForceMagnitude);
        const jumpVector = new THREE.Vector3(0, jumpForceRef.current, 0);
        api.applyForce(longitudinalVector.toArray(), [0, 0, 0]);
        api.applyForce(lateralVector.toArray(), [0, 0, 0]);
        api.applyForce(jumpVector.toArray(), [0, 0, 0]);
        api.applyTorque([0, horizontalTorqueRef.current * -panHorizontalSensitivity, 0]);
    });

    return (
        <object3D ref={bodyRef}>
            <axesHelper args={[0.25]} />

            <mesh position={[0, 0, 0]} visible={activeCamera !== 'firstPerson'}>
                <boxGeometry args={[1, 1.8, 1]} />
                <meshBasicMaterial color={0xff00ff} wireframe />
            </mesh>

            <object3D ref={headRef} position={[0, 1.5, 0]}>
                <axesHelper args={[0.25]} />
                <mesh position={[0, 0, 0]} visible={activeCamera !== 'firstPerson'}>
                    <boxGeometry args={[1, 1.8, 1]} />
                    <meshBasicMaterial color={0xff00ff} wireframe />
                </mesh>
                <PerspectiveCamera makeDefault={activeCamera === "firstPerson"} ref={cameraRef}>
                    <Reticle />
                </PerspectiveCamera>
            </object3D>
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