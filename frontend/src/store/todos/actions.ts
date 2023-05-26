import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "./types";

export const todoSlice = createSlice({
    name: "todos",
    initialState: [] as Todo[],
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.push(action.payload);
        },

        removeTodo: (state, action: PayloadAction<number>)=> {
            const foundIndex =  state.findIndex(todo => todo.id === action.payload);
            if (foundIndex !== -1){
                state.splice(foundIndex, 1);
            }
        },

        // Toggle Todo Completion
        toggleTodoCompletion: (state, action: PayloadAction<number>)=> {
            const foundTodo =  state.find(todo => todo.id === action.payload);
            if (foundTodo){
                foundTodo.completed = !foundTodo.completed;
            }
        },
    },
});

export const {addTodo, removeTodo, toggleTodoCompletion} = todoSlice.actions;

