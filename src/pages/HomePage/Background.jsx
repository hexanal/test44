import * as THREE from 'three';
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export function Background() {
    // const textureRef = useRef();
    const scene = useThree(state => state.scene);

    // TODO
    // useTweakerSaver => ui for changing values / saving / persistenfce
    // how to save to a structure

    useEffect(() => {
        scene.background = new THREE.Color().setRGB(1, 0.9, 1, THREE.SRGBColorSpace);
        // TODO scene.background = textureRef.current;
    }, [scene]);

    return (
        <>
            {/*
            TODO <GradientTexture
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