import { create } from 'zustand';
import { world, box1, box2, box3 } from './entities';

export const useGameStore = create((set) => ({
  world,
  entities: { box1, box2, box3 },
  snapshot: () => set((state) => ({ snapshot: JSON.stringify(state.entities) })),
  restore: (snapshot) => set(() => ({ entities: JSON.parse(snapshot) })),
}));
