import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoType} from "./types";

export const todosSlice = createSlice({
    name: "todos",
    initialState: [] as TodoType[],
    reducers: {
        addTodo: (state, action: PayloadAction<TodoType>) => {
            //ADD TODO TO TODOS ARRAY
                state.push(action.payload)
           
        },
        removeTodo: (state, action: PayloadAction<number>)=> {
            //REMOVE TODO FROM TODOS ARRAY BASED ON ID
            const todoId = action.payload;
             const filteredTodos = state.filter(todo => todo.id !== todoId);
console.log("filteredTodos", filteredTodos)
             return filteredTodos;
             
    
        },
        fetchTodos: function (state, action: PayloadAction<TodoType[]>) {
            //GET ALL TODOS 
            return [...action.payload];
        },
    }, 
});


export const {addTodo, removeTodo, fetchTodos, } = todosSlice.actions;
export const todoReducer = todosSlice.reducer;