import { useCallback } from "react";
import Knob from "./Knob";
import { useEditorStore } from "../stores/editor";

export function TweakerPanel(props) {

    const {
        showGrid = false,
        setShowGrid,

        activeControls,
        setActiveControls,

        boxSelectActive = false,
        setBoxSelectActive,

        setActiveCamera,

        fpsCameraFOV,
        setFpsCameraFOV,

        moveForceMagnitude,
        setMoveForceMagnitude,

        jumpForceMagnitude,
        setJumpForceMagnitude,

        selected,
    } = useEditorStore();

    const onChangeActiveControls = useCallback((e) => {
        const { target } = e || {};
        const { value } = target || {};
        setActiveControls(value);
        setActiveCamera(value === "pointer" ? "firstPerson" : "orthographic");
    }, [setActiveControls, setActiveCamera]);

    return (
        <div style={{ position: "absolute", zIndex: 2, top: "0.25rem", left: "0.25rem", backgroundColor: "rgb(255 255 255 / 1)" }}>
            Current: <pre>{activeControls}</pre>
            <label>
                <input type="radio" name="activeControls" value="pointer" checked={activeControls === "pointer"} onChange={onChangeActiveControls} />
                FPS (pointer locked)
            </label>
            <label>
                <input type="radio" name="activeControls" value="orbit" checked={activeControls === "orbit"} onChange={onChangeActiveControls} />
                Orbit
            </label>
            <label>
                <input type="radio" name="activeControls" value="off" checked={activeControls === "off"} onChange={onChangeActiveControls} />
                Off
            </label>

            <div>
                <Knob
                    label={"FOV"}
                    value={fpsCameraFOV}
                    onChange={setFpsCameraFOV}
                    min={10}
                    max={120}
                    minAngle={-100}
                    maxAngle={100}
                    withCurrentValueIndicator
                />

                <Knob
                    label={"Movement Force Magnitude"}
                    value={moveForceMagnitude}
                    onChange={setMoveForceMagnitude}
                    min={1}
                    max={100}
                    minAngle={-100}
                    maxAngle={100}
                    sensitivity={1}
                    withCurrentValueIndicator
                />
                <Knob
                    label={"Jump Force Magnitude"}
                    value={jumpForceMagnitude}
                    onChange={setJumpForceMagnitude}
                    min={1}
                    max={100}
                    minAngle={-100}
                    maxAngle={100}
                    sensitivity={1}
                    withCurrentValueIndicator
                />

                {selected ? (
                    <div>
                        <pre>Type: {selected.type}</pre>
                        <pre>Name: {selected.name}</pre>
                        {selected.position ? (
                            <pre>Position: [{selected.position.toArray().toString()}]</pre>
                        ):null}
                    </div>
                ) : null}

                <label>
                    <input type="checkbox" name="toggleGrid" value={showGrid} onChange={() => setShowGrid(prev => !prev)} />
                    Toggle Grid
                </label>
                <label>
                    <input type="checkbox" name="toggleBoxSelect" value={boxSelectActive} onChange={() => setBoxSelectActive(prev => !prev)} />
                    Box select active
                </label>
            </div>
        </div>
    );
}
