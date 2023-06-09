import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeletedTodoType } from "./types";



export const deletedTodosSlice = createSlice({
  name: "deletedTodos",
  initialState: [] as DeletedTodoType[],
  reducers: {
    addDeletedTodo: (state, action: PayloadAction<DeletedTodoType>) => {
      //ADD DELETED TODO TO DELETED TODOS ARRAY
      state.push(action.payload);
    },
    removefromDeletedTodos: (state, action: PayloadAction<number>) => {
      const todoId = action.payload;
      return state.filter(todo => todo.id !== todoId);
    },
    fetchDeletedTodos: (state, action: PayloadAction<DeletedTodoType[]>) => {
      return action.payload;
    }

  },
});


export const deletedTodoReducer = deletedTodosSlice.reducer;
export const { addDeletedTodo, removefromDeletedTodos, fetchDeletedTodos} = deletedTodosSlice.actions;
