import * as THREE from "three";
import { useControls, folder } from "leva";
import { useEditorStore } from "../stores/editor";

export function usePlayerLevaSettings(props) {
    const {
        keyboardEnabled,
        setKeyboardEnabled,
        fpsCameraFOV,
        moveForceMagnitude,
        jumpForceMagnitude,
        multiplier,
        shiftMultiplier,
        linearDamping,
        angularDamping,
        playerMass,
        setFpsCameraFOV,
        setMoveForceMagnitude,
        setJumpForceMagnitude,
        setMultiplier,
        setShiftMultiplier,
        setLinearDamping,
        setAngularDamping,
        setPlayerMass,
        panHorizontalSensitivity,
        setPanHorizontalSensitivity,
        panVerticalSensitivity,
        setPanVerticalSensitivity,
    } = useEditorStore();

    useControls({
        Player: folder({
            keyboardEnabled: {
                value: keyboardEnabled,
                label: 'Enable Keyboard Controls',
                onChange: (value) => setKeyboardEnabled(value),
            },
            FpsCameraFOV: {
                value: fpsCameraFOV,
                min: 10,
                max: 120,
                onChange: (value) => setFpsCameraFOV(value),
            },
            MoveForceMagnitude: {
                value: moveForceMagnitude,
                min: 0,
                max: 10,
                step: 0.01,
                onChange: (value) => setMoveForceMagnitude(value),
            },
            JumpForceMagnitude: {
                value: jumpForceMagnitude,
                min: 0,
                max: 10,
                step: 0.01,
                onChange: (value) => setJumpForceMagnitude(value),
            },
            Multiplier: {
                value: multiplier,
                min: 0,
                max: 10,
                onChange: (value) => setMultiplier(value),
            },
            ShiftMultiplier: {
                value: shiftMultiplier,
                min: 0,
                max: 10,
                onChange: (value) => setShiftMultiplier(value),
            },
            LinearDamping: {
                value: linearDamping,
                min: 0,
                max: 1,
                onChange: (value) => setLinearDamping(value),
            },
            AngularDamping: {
                value: angularDamping,
                min: 0,
                max: 1,
                onChange: (value) => setAngularDamping(value),
            },
            PlayerMass: {
                value: playerMass,
                min: 0,
                max: 100,
                onChange: (value) => setPlayerMass(value),
            },
            PanHorizontalSensitivity: {
                value: panHorizontalSensitivity,
                min: 0,
                max: 4,
                step: 0.01,
                onChange: (value) => setPanHorizontalSensitivity(value),
            },
            PanVerticalSensitivity: {
                value: panVerticalSensitivity,
                min: 0,
                max: 0.1,
                step: 0.001,
                onChange: (value) => setPanVerticalSensitivity(value),
            },
        }),
    });

    return;
}
