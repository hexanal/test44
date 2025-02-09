import * as THREE from 'three';
import { useControls, folder, button } from 'leva';
import { Fragment, forwardRef, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Html, Sky } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';

import KeyboardControlsProvider from "../components/KeyboardControlsProvider";
import Transform from "../components/Transform";
import { OrbiterControls } from "../components/OrbiterControls";

import { Background } from '../components/Background';
import { Environment } from '../components/Environment';

import { useGamepads } from '../hooks/useGamepads';
import { useKeyboardControls } from '../hooks/KeyboardControls';
import { useEditorStore } from '../stores/editor';
import { loadDocument } from '../utils/loadDocument';

// import { useDrag } from '@use-gesture/react'
import { useAnimate, spring } from '@animini/react-three';
import { spring as levaSpring } from '@leva-ui/plugin-spring'

export const RoundButton = ({ button = false, color, label, position, springConfig = { damping: 15, stiffness: 200 } }) => {
    const { player1Controls, activateOrbitControls, activateFirstPersonControls } = useEditorStore();
    const [mesh, setMesh] = useAnimate();
    const pressure = useRef(0);

    useEffect(() => {
        activateOrbitControls();
    }, []);

    // useEffect(() => {
    //     console.log(springConfig);
    // }, [springConfig]);

    const [_gamepads, getGamepadInputs] = useGamepads();
    const handleGamepadInput = useCallback(() => {
        if (player1Controls !== 'gamepad') return;

        const player1 = getGamepadInputs(0);
        const { leftStick, rightStick, buttonA,
            buttonX, buttonY, buttonB
        } = player1 || {};
        const [leftX, leftY] = leftStick || [];
        const [rightX, rightY] = rightStick || [];

        let p = 0;
        if (buttonA && label === 'A') {
            p = buttonA ? 1 : 0;
        }
        if (buttonX && label === 'X') {
            p = buttonX ? 1 : 0;
        }
        if (buttonY && label === 'Y') {
            p = buttonY ? 1 : 0;
        }
        if (buttonB && label === 'B') {
            p = buttonB ? 1 : 0;
        }

        if (p !== pressure.current) {
            pressure.current = p;

            const config = { easing: spring(springConfig) }
            setMesh.start({ position: { x: 0, y: (pressure.current * -0.09), z: 0 } }, config);
        }
    }, [getGamepadInputs, setMesh, position, springConfig, label, player1Controls]);

    const [_keys, getKeyboardInputs] = useKeyboardControls();
    const handleKeyboardInput = useCallback(() => {
        if (player1Controls !== 'keyboard') return;

        let p = 0;
        if (getKeyboardInputs().JUMP && label === 'A') {
            p = 1;
        }
        if (getKeyboardInputs().INTERACT && label === 'X') {
            p = 1;
        }
        if (getKeyboardInputs().RELOAD && label === 'Y') {
            p = 0.5;
        }

        const config = { easing: spring(springConfig) }

        if (p !== pressure.current) {
            pressure.current = p;

            setMesh.start({ position: { x: 0, y: (pressure.current * -0.09), z: 0 } }, config);
        }
    }, [getKeyboardInputs, setMesh, position, springConfig, label, player1Controls]);

    useFrame(() => {
        handleGamepadInput();
        handleKeyboardInput();
    });

    return (
        <object3D
            position={position}
            scale={[0.5, 0.5, 0.5]}
        >
            <object3D ref={mesh}>
                <Html
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={3}
                    center
                    transform
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontFamily: 'monospace',
                        color: 'white',
                        fontSize: '16px',
                        textShadow: '0.05em 0.05em 0 rgb(0 0 0 / 100%)',
                        userSelect: 'none',
                    }}>
                        {label}
                    </div>
                </Html>
                <mesh>
                    <cylinderGeometry args={[1, 1, 0.1, 32]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            </object3D>
            <mesh position={[0, -0.1, 0]}>
                <cylinderGeometry args={[1.1, 1.1, 0.1, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>

        </object3D>
    );
};

export default function ControllersDebug(props) {
    const {
        DEBUG,
        setPlayer1Controls,
    } = useEditorStore();

    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const config = await loadDocument('/documents/round-buttons.json');
                // console.log('config:', config);
                setButtons(config.buttons);
            } catch (error) {
                console.error('Failed to load configuration for round-buttons:', error);
            }
        };

        fetchConfig();
    }, []);

    useControls('Player 1 controls', {
        useGamepad: button(() => {
            setPlayer1Controls('gamepad');
        }),
        useKeyboard: button(() => {
            setPlayer1Controls('keyboard');
        }),
    });
    const { springConfig } = useControls("Spring", {
        springConfig: levaSpring(),
    });
    useControls('Buttons', {
        addButton: button(() => {
            const newId = buttons.length ? buttons[buttons.length - 1].id + 1 : 1;
            setButtons([...buttons, { id: newId, color: 'white', label: 'New', position: [0, 0, 0] }]);
        }),
        ...buttons.reduce((acc, button, index) => {
            acc[`${button.label} [${button.id}]`] = folder({
                [`color-${button.id}`]: {
                    value: button.color,
                    onChange: (value) => {
                        const newButtons = [...buttons];
                        newButtons[index].color = value;
                        setButtons(newButtons);
                    },
                },
                [`label-${button.id}`]: {
                    value: button.label,
                    onChange: (value) => {
                        const newButtons = [...buttons];
                        newButtons[index].label = value;
                        setButtons(newButtons);
                    },
                },
                [`position-${button.id}`]: {
                    value: { x: button.position[0], y: button.position[1], z: button.position[2] },
                    onChange: (value) => {
                        const newButtons = [...buttons];
                        newButtons[index].position = [value.x, value.y, value.z];
                        setButtons(newButtons);
                    },
                },
            });
            return acc;
        }, {}),
    }, [buttons, setButtons]);

    return (
        <KeyboardControlsProvider>
            <div id="canvas" style={{ position: "fixed", zIndex: 1, width: "100vw", height: "100vh", top: 0, left: 0, }}>
                <Canvas shadows>
                    <scene>
                        <Transform />
                        <Background />
                        <Sky />
                        <Environment />

                        <Suspense fallback={<h1>wait...</h1>}>
                            {buttons.map((button, index) => (
                                <RoundButton
                                    key={index}
                                    color={button.color}
                                    label={button.label}
                                    position={button.position}
                                    springConfig={springConfig}
                                />
                            ))}
                            {/* <object3D
                                position={[-1.25, 0, -0.75]}
                                scale={[0.5, 0.5, 0.5]}
                            >
                                <RoundButton color="green" label="X" />
                            </object3D>
                            <object3D
                                scale={[0.5, 0.5, 0.5]}
                                position={[0, 0, -2]}
                            >
                                <RoundButton color="yellow" label="Y" />
                            </object3D>

                            <object3D
                                scale={[0.5, 0.5, 0.5]}
                            >
                                <RoundButton color="red" label="A" />
                            </object3D>
                            <object3D position={[1.25, 0, -0.75]}
                                scale={[0.5, 0.5, 0.5]}
                            >
                                <RoundButton color="blue" label="B" />
                            </object3D> */}
                            <OrbiterControls />
                        </Suspense>
                    </scene>
                </Canvas>
            </div>
        </KeyboardControlsProvider >
    );
}
