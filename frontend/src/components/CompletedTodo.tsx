import * as React from "react";
import { DeletedTodoType } from "../store/deletedtodos/types";
import TodoCheckbox from "./Checkbox";
import { ListItem } from "@mui/material";

interface CompletedTodoProps {
  deletedTodo: DeletedTodoType;
  onToggle: (checked: boolean, todoId: number) => void;
}

export class CompletedTodo extends React.Component<CompletedTodoProps> {
  handleCheckboxChange = (checked: boolean) => {
    this.props.onToggle(checked, this.props.deletedTodo.id);
  };

  render() {
    return (
      <ListItem>
        <TodoCheckbox
          completed={this.props.deletedTodo.completed}
          onCheckboxChange={this.handleCheckboxChange}
          label={this.props.deletedTodo.title}
          id={this.props.deletedTodo.id}
        />
      </ListItem>
    );
  }
}
