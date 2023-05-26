import { configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./todos/reducer";
import { deletedTodoReducer} from "./deletedtodos/reducer";



export const store = configureStore({
  reducer: {
    todos: todoReducer,
    deletedTodos: deletedTodoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

