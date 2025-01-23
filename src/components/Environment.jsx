import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useControls, folder } from 'leva';

import { GridHelper } from './GridHelper';

import { PointLightEntity } from './PointLightEntity';
import { DirectionalLightEntity } from './DirectionalLightEntity';
import { useEditorStore } from '../stores/editor';

export function Environment() {
    const { DEBUG, showGrid, setShowGrid } = useEditorStore();

    const { showAxes, ambientLightIntensity } = useControls({
        Environment: folder({
            ShowGrid: {
                value: showGrid,
                onChange: (value) => setShowGrid(value),
            },
            ShowAxes: {
                value: true,
                label: 'Show Axes Helper',
            },
            AmbientLightIntensity: {
                value: Math.PI / 10,
                min: 0,
                max: 1,
                step: 0.01,
                label: 'Ambient Light Intensity',
            },
        }),
    });

    return (
        <>
            {showGrid && <GridHelper />}
            {showAxes && <axesHelper args={[2]} />}
            <ambientLight intensity={ambientLightIntensity} />
            <PointLightEntity />
            <DirectionalLightEntity />
        </>
    );
}