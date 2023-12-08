import { useLoaderData } from "react-router-dom";
import { Editor } from "../../components/Editor/Editor";
import TaskDescription from "../../components/TaskDescription/TaskDescription";
import { IProblem } from "../../shared/api/api";
import Splitter from "../../shared/splitter/Splitter";

export default function Task() {
  const problem = useLoaderData() as IProblem;

  return (
    <>
      <Splitter
        leftPane={<TaskDescription text={problem.description} />}
        rightPane={<Editor problem={problem} />}
        leftPaneInitWidth={30}
      />
    </>
  );
}
