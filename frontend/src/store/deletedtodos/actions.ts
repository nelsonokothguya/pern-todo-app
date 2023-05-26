import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeletedTodo } from "./types";

// DeletedTodos slice
export const deletedTodosSlice = createSlice({
  name: "deletedTodos",
  initialState: [] as DeletedTodo[],
  reducers: {
    addDeletedTodo: (initialState, action: PayloadAction<DeletedTodo>) => {
      initialState.push(action.payload);
    },
    restoreTodo: (initialState, action: PayloadAction<number>) => {
      const foundIndex = initialState.findIndex((todo) => todo.id === action.payload);
      if (foundIndex !== -1) {
        initialState.splice(foundIndex, 1);
      }
    },
  },
});

export const { addDeletedTodo, restoreTodo} = deletedTodosSlice.actions;
