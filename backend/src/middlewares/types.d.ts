// middlewares/types.d.ts
declare namespace Express {
  export interface Request {
    openAIData?: any;
  }
}


export interface DeletedTodoType {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}
