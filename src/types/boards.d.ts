export interface IBoards {
  name: string;
  columns: IColumns[];
}

export interface IColumns {
  name: string;
  tasks: ITasks[];
}

export interface ITasks {
  title: string;
  description: string;
  status: string;
  subtasks: ISubtasks[];
}

export interface ISubtasks {
  title: string;
  isCOmpleted: boolean;
}
