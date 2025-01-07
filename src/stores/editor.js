import { create } from 'zustand';

export const useEditorStore = create((set) => ({
    showGrid: false,
    setShowGrid: (value) => set({ showGrid: value }),

    activeControls: 'pointer',
    setActiveControls: (control) => set({ activeControls: control }),

    activeCamera: "firstPerson",
    setActiveCamera: (name) => set({ activeCamera: name }),
}));
