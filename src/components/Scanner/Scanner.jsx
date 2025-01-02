import { useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

import styles from "./Scanner.module.css";

export default function Scanner(props) {
  const {
    id = '—',
    size = [10, 2],
    use = null,
    // TODO useHistory / use...Values
    // TODO scaler
    // TODO color utils
    // timeframe = 1000, // TODO
    history = 256,
    processor = null,
    // fade = true, // TODO
    // scale = 'linear', // TODO
    scaleFactor = 1,
    linecolor = 'rgb(255 0 255 / 1)',
    label = null, // TODO!
    // min = 0,
    // max = 1,
    // origin = 0,// TODO
    offset = 0,
    indicator = 'bar', // 'dot' | 'wire' | function...
    revert = false, // TODO
    withValue = false, // TODO
    withLog = false, // TODO
    style = null,
    lineStyle = null,
  } = props || {};
  const v = useRef([]);
  const [width, height] = size;
  const latest = useRef(null);

  useAnimationFrame((t) => {
    const newV = {
      frame: t,
      value: processor !== null ? processor(use) : use,
      raw: use,
    };
    const { frame = null, value = null } = v.current[0] || {};

    latest.current = value;

    if (withLog) {
      console.table(newV);
    }

    if (t !== frame) {
      v.current.unshift(newV);
      v.current = v.current.slice(0, history);
    }
  });

  return (
    <div
      key={id}
      id={id}
      className="scanner"
    >
      {label !== null
        ? (
          <h1
            style={{
              fontSize: '0.6rem',
              fontWeight: '400',
              margin: 0,
            }}
          >
            {label}
          </h1>
        )
        : null
      }

      <div
        className={styles.root}
      >
        <div
          style={{
            position: 'relative',
            width: `${width}rem`,
            height: `${height}rem`,
            backgroundColor: `rgb(0 0 0 / 0.075)`,
            borderLeft: `1px solid rgb(0 0 0 / 1)`,
            borderBottom: !revert ? `1px solid rgb(0 0 0 / 1)` : 0,
            borderTop: revert ? `1px solid rgb(0 0 0 / 1)` : 0,
            ...style
          }}
        >
          <div
            style={{
              position: 'absolute',
              overflow: 'hidden',
              top: 0,
              left: 0,
              width: `100%`,
              height: `100%`,
            }}
          >
            <div style={{
              position: 'absolute',
              top: `50%`,
              width: `100%`,
              height: `0`,
              borderTop: `1px dotted rgb(0 0 0 / 0.5)`
            }}></div>
            {v.current.map(({ frame, value }, i, arr) => (
              // TODO use the Graph SVG graphing componenet... nah? you dumb fuck
              <div
                key={frame}
              >
                {typeof indicator === 'function'
                  ? indicator({
                    arr,
                    i,
                    value,
                    frame,
                  })
                  : null}

                {indicator === 'dot'
                  ? (
                    <div
                      key={frame}
                      style={{
                        position: 'absolute',
                        top: `50%`,
                        left: `${i / arr.length * width}rem`,
                        width: `4px`,
                        height: `4px`,
                        backgroundColor: linecolor,
                        transform: `
                          translateY(${offset}%)
                          translate(-50%, -50%)
                          translateY(${height / 2 * value * scaleFactor}rem)
                        `,
                        ...lineStyle
                      }}
                    >
                    </div>
                  )
                  : null}

                {indicator === 'wire'
                  ? (
                    <div
                      key={frame}
                      style={{
                        position: 'absolute',
                        top: `50%`,
                        left: `${i / arr.length * width}rem`,
                        width: `${width / arr.length}rem`,
                        height: `1px`,
                        backgroundColor: linecolor,
                        transform: `
                          translateY(${offset}%)
                          translateY(${height / 2 * value * scaleFactor}rem)
                        `,
                        ...lineStyle
                      }}
                    >
                    </div>
                  )
                  : null}

                {indicator === 'bar'
                  ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: `0`,
                        left: `${i / arr.length * width}rem`,
                        width: `${width / arr.length}rem`,
                        height: `100%`,
                        backgroundColor: linecolor,
                        transformOrigin: '50% 0',
                        transform: `
                          translateY(${offset}%)
                          scaleY(${1 * value / 2 * scaleFactor})
                        `,
                        ...lineStyle
                      }}
                    >
                    </div>
                  )
                  : null}
              </div>
            ))}
          </div>

          {withValue
            ? (
              <code
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `100%`,
                  backgroundColor: `rgb(0 0 0 / 0.05)`,
                  padding: `0.2rem`,
                  fontSize: `0.5rem`,
                  transform: `
                  translateX(0.1rem)
                `,
                  whiteSpace: 'nowrap',
                }}
              >
                {use}
              </code>
            )
            : null}

          {scaleFactor !== 1
            ? (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `100%`,
                  backgroundColor: `rgb(0 0 0 / 0.05)`,
                  padding: `0.2rem`,
                  fontSize: `0.5rem`,
                  transform: `
                  translateX(0.1rem)
                `,
                }}
              >
                &times;{scaleFactor}
              </div>
            )
            : null}
        </div>
      </div>
    </div>
  );
}
