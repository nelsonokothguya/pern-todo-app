import * as React from "react";
import { DeletedTodoType } from "../store/deletedtodos/types";
import Checkbox from "./Checkbox";
import { ListItem } from "@mui/material";

interface DeletedTodoProps {
  deletedTodo: DeletedTodoType;
  onToggle: (checked: boolean, todoId: number) => void;
}

export class DeletedTodo extends React.Component<DeletedTodoProps> {
  handleCheckboxChange = (checked: boolean) => {
    this.props.onToggle(checked, this.props.deletedTodo.id);
  };

  render() {
    return (
      <ListItem>
        <Checkbox
          completed={this.props.deletedTodo.completed}
          onCheckboxChange={this.handleCheckboxChange}
          label={this.props.deletedTodo.title}
          id={this.props.deletedTodo.id}
        />
      </ListItem>
    );
  }
}
