import {
    useCallback,
    useEffect,
    useState,
    useMemo,
} from "react";
import classnames from "classnames";
import { DraggableCore } from "react-draggable";
import styles from "./Knob.module.scss";
import mapRange from "../../modules/mapRange";

const calculateBaseSensitivity = (min, max) => {
    const range = Math.abs(max - min);
    return 1 / range;
};

export default function Knob(props) {
    const {
        // className,
        label,
        // value stuff:
        value = 0,
        min = null,
        max = null,
        // ui stuff:
        theme = "basic",
        layout = "horizontal",
        minAngle = -Infinity,
        maxAngle = Infinity,
        withInteractHelper = false,
        withCurrentValueIndicator = false,
        sensitivity = 10,
        onChange: onSetValueCallback = () => { },
    } = props || {};
    // const [value, setValue] = useState(initialValue);
    const [angle, setAngle] = useState(mapRange(
        value,
        [min, max],
        [minAngle, maxAngle]
    ));
    const [interacts, setInteracts] = useState(false);
    const baseSensitivity = useMemo(() => calculateBaseSensitivity(min, max), [min, max]);

    const onDrag = useCallback((e, data) => {
        const { shiftKey, altKey } = e || {};
        const { deltaX } = data || {};
        const altKeyModifier = altKey ? 10 * 1 : 1;
        const shiftKeyModifier = shiftKey ? 0.1 * 1 : 1;
        const moveX = altKeyModifier * shiftKeyModifier * sensitivity * baseSensitivity * deltaX;
        const incX = value + moveX;
        const clampedX = mapRange(incX, [min, max]);

        setInteracts(true);
        onSetValueCallback(clampedX);
    }, [value, sensitivity, min, max, onSetValueCallback, setInteracts]);

    const onDragStop = useCallback((e, data) => {
        setInteracts(false);
    }, [value, setInteracts]);

    useEffect(() => {
        const angle = mapRange(
            value,
            [min, max],
            [minAngle, maxAngle]
        );
        setAngle(angle);
    }, [value, min, max, minAngle, maxAngle, setAngle]);

    return (
        <div>
            {label ? (
                <label>{label}</label>
            ) : null}
            <div className={classnames(styles.root, styles[layout])}>
                <DraggableCore
                    onDrag={onDrag}
                    onStop={onDragStop}
                >
                    <div className={styles.interact} />
                </DraggableCore>

                {interacts ? (
                    <div className={classnames(styles.interact, styles.interactHelper)} />
                ) : null}

                {/* current skin */}
                {theme === "basic" ? (
                    <div className={styles.controls}>
                        <div className={styles.knob}
                            style={{
                                transform: `translate(-50%, -50%)
                                rotate(${angle}deg)
                            `,
                            }}
                        >
                            <div className={styles.indicator} />
                        </div>

                        {withCurrentValueIndicator ? (
                            <div className={styles.valueIndicator}>{value}</div>
                        ) : null}
                    </div>
                ) : null}
            </div>


            {/* {min && max ? (
                <input
                    type="range"
                    min={min}
                    max={max}
                    className={classnames(styles.input, {
                        [className]: className
                    })}
                    onInput={onInputChange}
                    value={value}
                    {...otherProps}
                />
            ) : <input
                type="number"
                className={classnames(styles.input, {
                    [className]: className
                })}
                onInput={onInputChange}
                value={value}
                {...otherProps}
            />} */}
        </div>
    );
}
