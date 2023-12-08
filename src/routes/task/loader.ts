// import { LoaderFunction } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { IProblem, Lang } from "../../shared/api/api";
import type { Params } from "react-router-dom";

const loader: LoaderFunction = async ({
  params,
}: {
  params: Params<"problemId">; // params, params2 and Params<"id"> does not work
}) => {
  params; // make eslint happy
  const task: IProblem = {
    id: 0,
    initialCode: "// Your code here\n",
    lang: Lang.ts,
    description:
      "<h2>Write a+b program</h2><p>In this task you should implement simple a + b program.</p>",
  };

  return task;
};

export default loader;
