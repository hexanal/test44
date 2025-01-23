import { useControls } from 'leva';
import { useEffect } from 'react';
import create from 'zustand';

const useEditorStore = create((set) => ({
  setVariable: (id, value) => set((state) => ({ [id]: value })),
}));

export function useZu({ id, type, label, initialValue, ...levaOptions }) {
  const setVariable = useEditorStore((state) => state.setVariable);
  const value = useEditorStore((state) => state[id]);

  const levaConfig = {
    [id]: {
      value: initialValue,
      label: label || id,
      ...levaOptions,
      onChange: (value) => setVariable(id, value),
    },
  };

  const levaControls = useControls(levaConfig);

  useEffect(() => {
    if (levaControls[id] !== value) {
      setVariable(id, levaControls[id]);
    }
  }, [levaControls, value, id, setVariable]);

  return value;
}
