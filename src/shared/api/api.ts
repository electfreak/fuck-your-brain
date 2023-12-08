export enum Lang {
  ts,
  js,
  html,
}

export interface IProblem {
  id: number;
  description: string;
  initialCode: string;
  lang: Lang;
}

export interface IClientProblem extends IProblem {
  test: string;
}
