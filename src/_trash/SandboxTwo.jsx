import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameStore } from '../stores/game';
import { Position, Rotation, Scale } from './components';

function Box({ entity }) {
  const { world } = useGameStore();
  return (
    <mesh
      position={[Position.x[entity], Position.y[entity], Position.z[entity]]}
      rotation={[Rotation.x[entity], Rotation.y[entity], Rotation.z[entity]]}
      scale={[Scale.x[entity], Scale.y[entity], Scale.z[entity]]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Game() {
  const { entities, snapshot, restore } = useGameStore();

  const handleSnapshot = () => {
    const snap = snapshot();
    localStorage.setItem('gameSnapshot', snap);
  };

  const handleRestore = () => {
    const savedSnapshot = localStorage.getItem('gameSnapshot');
    if (savedSnapshot) {
      restore(savedSnapshot);
    }
  };

  return (
    <div>
      <button onClick={handleSnapshot}>Snapshot</button>
      <button onClick={handleRestore}>Restore</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {Object.values(entities).map((entity, index) => (
          <Box key={index} entity={entity} />
        ))}
      </Canvas>
    </div>
  );
}

export default Game;