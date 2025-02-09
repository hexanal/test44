import { useControls, folder } from 'leva';

import { GridHelper } from './GridHelper';

import { PointLightEntity } from './PointLightEntity';
import { DirectionalLightEntity } from './DirectionalLightEntity';
import { useEditorStore } from '../stores/editor';

export function Environment() {
    const { DEBUG, showGrid, setShowGrid,
        showAxesHelper, setShowAxesHelper,
        ambientLightIntensity, setAmbientLightIntensity } = useEditorStore();

    useControls({
        Environment: folder({
            ShowGrid: {
                value: showGrid,
                onChange: (value) => setShowGrid(value),
            },
            ShowAxes: {
                label: 'Show Axes Helper',
                value: showAxesHelper,
                onChange: (value) => setShowAxesHelper(value),
            },
            AmbientLightIntensity: {
                min: 0,
                max: 2,
                step: 0.01,
                label: 'Ambient Light Intensity',
                value: ambientLightIntensity,
                onChange: (value) => setAmbientLightIntensity(value),
            },
        }),
    });

    return (
        <>
            {showGrid && <GridHelper />}
            {showAxesHelper && <axesHelper args={[2]} />}
            <ambientLight intensity={ambientLightIntensity} />
            <PointLightEntity />
            <DirectionalLightEntity />
        </>
    );
}