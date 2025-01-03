import { create } from 'zustand';

export const useEditorStore = create((set) => ({
    activeControls: 'pointer',
    setActiveControls: (control) => set({ activeControls: control }),
    toggleActiveControls: () => set(state => ({ ...state, activeControls: state.activeControls === "pointer" ? "pivot" : "pointer" })),
}));
