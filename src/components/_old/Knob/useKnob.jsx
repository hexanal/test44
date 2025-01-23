import { useMemo, useState } from "react";
import Knob from "./Knob";

export default function useKnob(props) {
    const {
        // className,
        // label,
        // value stuff:
        value: initialValue = 0,
        // min = null,
        // max = null,
        // ui stuff:
        // theme = "basic",
        // minAngle = -Infinity,
        // maxAngle = Infinity,
        // withInteractHelper = false,
        // sensitivity = 1,
        // onChange: onSetValueCallback = () => { },
    } = props || {};
    const [value, setValue] = useState(initialValue);

    const KnobInstance = (props) => <Knob {...props} value={value} onChange={setValue} />;

    // return [value, (props) => <Knob {...props} value={value} onChange={setValue} />];
    return [value, KnobInstance];
}
