import { configureStore} from "@reduxjs/toolkit";
import { todoReducer } from "./todos/todosActionCreatorsAndReducer";
import { deletedTodoReducer } from "./deletedtodos/deletedTodosActionCreatorsAndReducers";



export const store = configureStore({
  reducer: {
    todos: todoReducer,
    deletedTodos: deletedTodoReducer,
  }, 
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

