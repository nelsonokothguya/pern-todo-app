import * as React from "react";
import Checkbox from "./Checkbox";
import {Todo} from "../store/todos/types";
import { ListItem, ListItemText } from '@mui/material';

interface TodoProps {
    todo: Todo;
    onToggle: () => void;
     onTodoDelete: (id: number) => void;
}

export class TodoItem extends React.Component <TodoProps> {
    render() {
        const {todo, onToggle} = this.props;
        return (
           <ListItem> 
            <Checkbox
            checked ={todo.completed}
            onChange = {onToggle}
            label = {todo.title}
            />

            <ListItemText primary={todo.title} />

            </ListItem>
        )
    }
}
