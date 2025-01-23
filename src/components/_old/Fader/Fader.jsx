import {
    useCallback,
    useEffect,
    useState,
} from "react";
import classnames from "classnames";
import { DraggableCore } from "react-draggable";
import styles from "./Fader.module.scss";
import mapRange from "../../modules/mapRange";

export default function Fader(props) {
    const {
        // className,
        label,
        // value stuff:
        value = 0,
        min = 0,
        max = 100,
        // ui stuff:
        // mod = 10, // TODO
        theme = "basic",
        layout = "horizontal",
        sensitivity = 1,
        // withInteractHelper = false,
        onChange: onSetValueCallback = () => { },
        // ...otherProps
    } = props || {};
    // const [value, setValue] = useState(mapRange(initialValue, [min, max]));
    const [progress, setProgress] = useState(mapRange(value, [min, max], [0, 100]));

    // const onInputChange = useCallback(e => {
    //     const { target } = e || {};
    //     const { value: inputValue } = target || {};
    //     const coerced = parseFloat(inputValue);
    //     setValue(coerced);
    // }, [setValue]);

    const [interacts, setInteracts] = useState(false);

    const onDrag = useCallback((e, data) => {
        const { shiftKey, altKey } = e || {};
        const { deltaX, deltaY } = data || {};
        const altKeyModifier = altKey ? 10 * 1 : 1;
        const shiftKeyModifier = shiftKey ? 0.1 * 1 : 1;
        const move = altKeyModifier * shiftKeyModifier * sensitivity * (layout === "vertical" ? -deltaY : deltaX);
        const inc = value + move;
        const clamped = mapRange(inc, [min, max]);

        console.log(layout);
        setInteracts(true);
        onSetValueCallback(clamped);
    }, [value, layout, sensitivity, min, max, onSetValueCallback, setInteracts]);

    const onDragStop = useCallback(() => {
    // const onDragStop = useCallback((e, data) => {
        // console.log({ e, data, value });
        setInteracts(false);
    }, [setInteracts]);

    // useEffect(() => {
    //     console.log('set value to initialValue');
    //     setValue(initialValue);
    //     onSetValueCallback(initialValue);
    // }, [initialValue, onSetValueCallback]);

    // useEffect(() => {
    //     onSetValueCallback(value);
    // }, [onSetValueCallback, value]);

    useEffect(() => {
        const valueProgress = mapRange(
            value,
            [min, max],
            [0, 100]
        );
        setProgress(valueProgress);
    }, [value, min, max, setProgress]);

    return min && max ? (
        <div>
            {label ? (
                <label>{label}</label>
            ) : null}
            <div className={classnames(styles.root, styles[layout])}>
                <DraggableCore onDrag={onDrag} onStop={onDragStop}>
                    <div className={styles.interact} />
                </DraggableCore>

                {interacts ? (
                    <div className={classnames(styles.interact, styles.interactHelper)} />
                ) : null}

                {/* current skin */}
                {theme === "moog" ? (
                    <div className={styles.fader}>
                        <div className={styles.track}>
                            <div className={styles.cursorWrapper}
                                style={{
                                    transform: `
                                        translate${layout === "vertical" ? "Y" : "X"}(${100 - progress}%)
                                `,
                                }}
                            >
                                <div className={styles.cursor}>
                                    <div className={styles.cursorValue}>
                                        {value.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.labels}>
                            <div className={styles.min}>
                                <div className={styles.labelWrapper}>
                                    <div className={styles.labelTitle}>
                                        {min}
                                    </div>
                                    <div className={styles.labelIndicator} />
                                </div>
                            </div>
                            <div className={styles.max}>
                                <div className={styles.labelWrapper}>
                                    <div className={styles.labelTitle}>
                                        {max}
                                    </div>
                                    <div className={styles.labelIndicator} />
                                </div>
                            </div>
                        </div>
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
                />
            ) : null} */}
        </div>
    ) : null;
}
