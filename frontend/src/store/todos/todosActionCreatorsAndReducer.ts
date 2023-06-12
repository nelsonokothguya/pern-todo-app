import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoType} from "./types";

export const todosSlice = createSlice({
    name: "todos",
    initialState: [] as TodoType[],
    reducers: {
        addTodo: (state, action: PayloadAction<TodoType>) => {
                state.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<number>)=> {

            const todoId = action.payload;
             const filteredTodos = state.filter(todo => todo.id !== todoId);
            console.log("filteredTodos", filteredTodos)
             return filteredTodos;
        },
        editTodo: (state, action: PayloadAction<TodoType>) => {
            const updatedTodo = action.payload;
            return state.map(todo => {
                if (todo.id === updatedTodo.id) {
                    todo.title = updatedTodo.title;
                }
                return todo;
            })
            
        },
        fetchTodos: function (state, action: PayloadAction<TodoType[]>) {
            return [...action.payload];
        },
    }, 
});


export const {addTodo, removeTodo, editTodo, fetchTodos, } = todosSlice.actions;
export const todoReducer = todosSlice.reducer;