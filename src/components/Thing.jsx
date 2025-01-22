import React from 'react';
import { useBox } from '@react-three/cannon';
import { useEditorStore } from '../stores/editor';
import { Selectable } from './Selectable';

export function Thing(props) {
    const { id, position, color = 0x000000, scale, rotation, onSelect } = props || {};
    const [ref] = useBox(() => ({ mass: 1, args: [1, 1, 1], position, rotation }));
    const { selected } = useEditorStore();

    return (
        <Selectable onSelect={onSelect}>
            <mesh
                ref={ref}
                name={id}
                position={position}
                scale={scale}
                rotation={rotation}
                castShadow
            >
                <boxGeometry args={[1, 1, 1]} />
                {selected === ref.current ? (
                    <meshBasicMaterial color={color} />
                ) : (
                    <meshStandardMaterial color={color} />
                )}
            </mesh>
        </Selectable>
    );
}
