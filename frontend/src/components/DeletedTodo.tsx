import * as React from "react";
import {DeletedTodo } from "../store/deletedtodos/types";
import Checkbox from "./Checkbox";
import { ListItem, ListItemText } from '@mui/material';

interface DeletedTodoItemProps {
    deletedTodo: DeletedTodo;
    onTodoRestore: (id: number) => void; 
    onToggle: () => void;
}

export class DeletedTodoItem extends React.Component<DeletedTodoItemProps > {
    render() {
        const {deletedTodo, onToggle} = this.props;
        return (
            <ListItem>
            <Checkbox
            checked={deletedTodo.completed}
            onChange={onToggle}
            label={deletedTodo.title}
            />
            <ListItemText primary={deletedTodo.title} style = {{ textDecoration: 'line-through' }} />
            </ListItem>
        )
    }
}
