import { 
    // useEffect,
    // useState,
    // useRef
} from "react";
import classnames from "classnames";
import styles from "./Button.module.scss";

export default function Button(props) {
    const {
        children,
        className,
        ...otherProps
    } = props || {};

    return (
        <button
            type="button"
            className={classnames(styles.root, {
                [className]: className
            })}
            // type="button"
            {...otherProps}
        >
            {children}
        </button>
    );
}