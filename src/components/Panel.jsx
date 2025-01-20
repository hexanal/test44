import {
    // useEffect,
    // useState,
    // useRef
} from "react";
// import classnames from "classnames";
import styles from "./Panel.module.scss";

export default function Panel(props) {
    const {
        children,
        // className,
        label = null,
        style = null,
        // ...otherProps
    } = props || {};

    return (
        <div
            className={styles.root}
            style={style}
        >
            {label ? (
                <label>{label}</label>
            ): null}
            <div>
                {children}
            </div>
        </div>
    );
}