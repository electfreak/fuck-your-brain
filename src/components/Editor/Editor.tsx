import { useRef, useState, useEffect } from "react";
import styles from "./Editor.module.css";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { IProblem } from "../../shared/api/api";

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export const Editor = ({ problem }: { problem: IProblem }) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  function runCode() {
    eval(editor?.getValue() || "alert('no code')");
  }

  function runTest() {
    if ("test" in problem && typeof problem.test == "string") {
      const res = eval(problem.test) as boolean;
      alert(res ? "Right!" : "Wrong");
    }
  }

  useEffect(() => {
    if (monacoEl) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: problem.initialCode,
          language: "javascript",
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        });
      });
    }

    return () => editor?.dispose();
  }, [editor, problem]);

  return (
    <div className={styles.editor}>
      <div className={styles.monaco} ref={monacoEl} />

      <div className={styles.controls}>
        <button type="button" onClick={runCode}>
          Run code
        </button>

        <button type="button" onClick={runTest}>
          Run tests
        </button>
      </div>
    </div>
  );
};
