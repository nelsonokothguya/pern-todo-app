import React from "react";
import { TodoType } from "../store/todos/types";
import { ListItem } from "@mui/material";
import Checkbox from "./Checkbox";

interface TodoProps {
  todo: TodoType;
  onToggling: (checked: boolean, todoId: number) => void;
}

class Todo extends React.Component<TodoProps> {
  render() {
    return (
      <ListItem>
        <Checkbox
          completed={this.props.todo.completed}
          label={this.props.todo.title}
          id={this.props.todo.id}
          onCheckboxChange={(checked: boolean) =>
            this.props.onToggling(checked, this.props.todo.id)
          }
        />
      </ListItem>
    );
  }
}

export default Todo;
