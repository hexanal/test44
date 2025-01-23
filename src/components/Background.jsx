// import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Html, GradientTexture, useCubeTexture } from '@react-three/drei';
import { useEditorStore } from '../stores/editor';

export function Background() {
    const { scene } = useThree();
    const { DEBUG } = useEditorStore();
    const cubeTexture = useCubeTexture(
        ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
        { path: '/assets/hdri/MEADOW2/' }
    );

    useEffect(() => {
        scene.environment = cubeTexture;
    }, [scene]);

    return (
        <>
            {/* <GradientTexture
                stops={[0, 1]} // As many stops as you want
                colors={['aquamarine', 'hotpink']} // Colors need to match the number of stops
                size={1024} // Size is optional, default = 1024
            /> */}
            {/* 
            TODO <GradientTexture
                ref={textureRef}
                stops={[0, 0.5, 1]} // As many stops as you want
                colors={['aquamarine', 'hotpink', 'yellow']} // Colors need to match the number of stops
                size={1024} // Size (height) is optional, default = 1024
                width={1024} // Width of the canvas producing the texture, default = 16
                type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
                innerCircleRadius={0} // Optional, the radius of the inner circle of the gradient, default = 0
                outerCircleRadius={'auto'} // Optional, the radius of the outer circle of the gradient, default = auto
            /> */}
        </>
    );
}