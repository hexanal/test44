import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useCubeTexture } from '@react-three/drei';

export function Background() {
    const { scene } = useThree();
    const cubeTexture = useCubeTexture(
        ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
        { path: '/assets/hdri/MEADOW2/' }
    );

    useEffect(() => {
        scene.background = cubeTexture;
    }, [scene, cubeTexture]);

    return null;
}