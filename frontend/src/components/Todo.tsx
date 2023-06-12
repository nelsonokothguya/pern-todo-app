import React from "react";
import Checkbox from "./Checkbox";
import { TodoType } from "../store/todos/types";
import { ListItem } from "@mui/material";
import { Edit } from "./Edit";

interface TodoProps {
  todo: TodoType;
  onToggling: (checked: boolean, todoId: number) => void;
  onEditing: (title: string, todoId: number) => void;
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
        <Edit
          onEditAndSave={(title: string) =>
            this.props.onEditing(title, this.props.todo.id)
          }
        />
      </ListItem>
    );
  }
}

export default Todo;
