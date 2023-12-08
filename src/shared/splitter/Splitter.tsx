/* eslint-disable react-hooks/exhaustive-deps */

import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import styles from "./splitter.module.css";

function Resizer({
  setLeftPaneWidth,
}: {
  setLeftPaneWidth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const resizerRef = useRef<HTMLDivElement>(null);

  const documentMouseMoveListener = useCallback((event: MouseEvent) => {
    const { current: resizer } = resizerRef;

    if (resizer === null || resizer.parentElement === null) {
      return;
    }

    const containerRect = resizer.parentElement.getBoundingClientRect();
    const leftPaneWidth =
      Math.ceil(
        ((event.clientX - containerRect.left) / containerRect.width) * 10000,
      ) / 100;

    setLeftPaneWidth(leftPaneWidth);
  }, []);

  const documentMouseUpListener = useCallback(() => {
    resizerRef.current?.classList.remove(styles.active);
    document.removeEventListener("mousemove", documentMouseMoveListener);
  }, []);

  function mouseDown() {
    resizerRef.current?.classList.add(styles.active);
    document.addEventListener("mousemove", documentMouseMoveListener);
  }

  useEffect(() => {
    document.addEventListener("mouseup", documentMouseUpListener);

    return () => {
      document.removeEventListener("mouseup", documentMouseUpListener);
    };
  }, []);

  return (
    <>
      <div
        ref={resizerRef}
        onMouseDown={mouseDown}
        className={styles.resizer}
      ></div>
    </>
  );
}

export default function Splitter({
  leftPane,
  rightPane,
  leftPaneInitWidth,
}: {
  leftPane: ReactElement;
  rightPane: ReactElement;
  leftPaneInitWidth: number;
}) {
  const [leftPaneWidth, setLeftPaneWidth] = useState(leftPaneInitWidth);

  return (
    <>
      <div className={styles.splitter}>
        <div className={styles.pane} style={{ width: `${leftPaneWidth}%` }}>
          {leftPane}
        </div>
        <Resizer setLeftPaneWidth={setLeftPaneWidth} />
        <div
          className={styles.pane}
          style={{ width: `${100 - leftPaneWidth}%` }}
        >
          {rightPane}
        </div>
      </div>
    </>
  );
}
