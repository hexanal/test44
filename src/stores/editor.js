import { create } from 'zustand';

export const useEditorStore = create((set) => ({
    keyboardEnabled: true,
    setKeyboardEnabled: () => set((value) => ({ keyboardEnabled: value })),

    DEBUG: false,
    setDEBUG: (value) => set({ DEBUG: value }),

    gravity: [0, -9.81, 0],
    setGravity: (value) => set({ gravity: value }),
    
    iterations: 10,
    setIterations: (value) => set({ iterations: value }),
    
    tolerance: 0.001,
    setTolerance: (value) => set({ tolerance: value }),
    
    allowSleep: true,
    setAllowSleep: (value) => set({ allowSleep: value }),

    showReticle: true,
    setShowReticle: (value) => set({ showReticle: value }),

    showGrid: false,
    setShowGrid: (value) => set({ showGrid: value }),

    showSky: false,
    setShowSky: (value) => set({ showSky: value }),

    boxSelectActive: false,
    setBoxSelectActive: (target) => set({ boxSelectActive: target }),

    activeControls: 'pointer',
    setActiveControls: (control) => set({ activeControls: control }),

    activeCamera: "firstPerson",
    setActiveCamera: (name) => set({ activeCamera: name }),
    switchToFirstPersonCamera: () => set({ activeCamera: "firstPerson" }),
    switchToOrbitCamera: () => set({ activeCamera: "orbit" }),

    transformMode: "translate",
    setTransformMode: (mode) => set({ transformMode: mode }),

    fpsCameraFOV: 50,
    setFpsCameraFOV: (value) => set({ fpsCameraFOV: value }),

    selected: null,
    setSelected: (object) => set({ selected: object }),

    showBoundingBox: true,
    setBoundingBox: (value) => set({ showBoundingBox: value }),
    toggleShowBoundingBox: () => set((state) => ({ showBoundingBox: !state.showBoundingBox })),

    showAxesHelper: true,
    setShowAxesHelper: (value) => set({ showAxesHelper: value }),
    toggleShowAxesHelper: () => set((state) => ({ showAxesHelper: !state.showAxesHelper })),

    linearDamping: 0.1,
    setLinearDamping: (value) => set({ linearDamping: value }),

    angularDamping: 0.99,
    setAngularDamping: (value) => set({ angularDamping: value }),

    moveForceMagnitude: 5,
    setMoveForceMagnitude: (value) => set({ moveForceMagnitude: value }),

    jumpForceMagnitude: 10,
    setJumpForceMagnitude: (value) => set({ jumpForceMagnitude: value }),

    multiplier: 1,
    setMultiplier: (value) => set({ multiplier: value }),

    shiftMultiplier: 0.01,
    setShiftMultiplier: (value) => set({ shiftMultiplier: value }),

    isJumping: false,
    setIsJumping: (value) => set({ isJumping: value }),

    playerMass: 1,
    setPlayerMass: (value) => set({ playerMass: value }),

    panHorizontalSensitivity: 0.5,
    setPanHorizontalSensitivity: (value) => set({ panHorizontalSensitivity: value }),

    panVerticalSensitivity: 0.015,
    setPanVerticalSensitivity: (value) => set({ panVerticalSensitivity: value }),

    ambientLightIntensity: 0.5,
    setAmbientLightIntensity: (value) => set({ ambientLightIntensity: value }),
}));
