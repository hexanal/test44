// import * as THREE from 'three';
// import { useRef } from 'react';

import { GridHelper } from './GridHelper';

import { PointLightEntity } from './PointLightEntity';
import { DirectionalLightEntity } from './DirectionalLightEntity';
import { useEditorStore } from '../../stores/editor';

export function Environment() {
    const { showGrid } = useEditorStore();
    // knobs and switching and shit, for those 

    return (
        <>
            {showGrid ? <GridHelper /> : null}
            <axesHelper args={[2]} />
            <ambientLight intensity={Math.PI / 10} />
            <PointLightEntity />
            <DirectionalLightEntity />
        </>
    );
}