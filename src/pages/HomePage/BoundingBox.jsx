// import * as THREE from 'three';
// import { useEffect } from 'react';
// import { useThree } from '@react-three/fiber';

export function BoundingBox() {
    // const textureRef = useRef();
    // const scene = useThree(state => state.scene);

    box3Ref.current.setFromObject(object.current);
    box3HelperRef.current.box = box3Ref.current;

    return (
        <box3Helper ref={box3HelperRef} args={[box3Ref.current]} />
    );
}

  // useHelper(box3Ref, THREE.Box3Helper);