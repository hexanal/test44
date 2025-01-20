import { create } from 'zustand';

export const useEditorStore = create((set) => ({
    showReticle: true,
    setShowReticle: (value) => set({ showReticle: value }),

    showGrid: false,
    setShowGrid: (value) => set({ showGrid: value }),

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

    fpsCameraFOV: 35,
    setFpsCameraFOV: (value) => set({ fpsCameraFOV: value }),

    selected: null,
    setSelected: (object) => set({ selected: object }),
    
    showBoundingBox: true,
    toggleShowBoundingBox: () => set((state) => ({ showBoundingBox: !state.showBoundingBox })),

    showAxesHelper: true,
    toggleShowAxesHelper: () => set((state) => ({ showAxesHelper: !state.showAxesHelper })),

    linearDamping: 0.7,
    setLinearDamping: (value) => set({ linearDamping: value }),

    angularDamping: 0.9,
    setAngularDamping: (value) => set({ angularDamping: value }),

    moveForceMagnitude: 35,
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
}));
