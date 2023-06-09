import * as React from "react";
import { DeletedTodoType } from "../store/deletedtodos/types";
import { DeletedTodo } from "./DeletedTodo";

interface DeletedTodoListProps {
  deletedTodos: DeletedTodoType[];
  onToggle: (checked: boolean, deletedTodoId: number) => void;
}

class DeletedTodoList extends React.Component<DeletedTodoListProps> {
  handleDeletedTodoToggle = (checked: boolean, deletedTodoId: number) => {
    this.props.onToggle(checked, deletedTodoId);
  };

  render() {
    return (
      <div>
        <h2>Deleted Todo List</h2>
        {this.props.deletedTodos.map((deletedTodo) => (
          <DeletedTodo
            key={deletedTodo.id}
            deletedTodo={deletedTodo}
            onToggle={this.handleDeletedTodoToggle}
          />
        ))}
      </div>
    );
  }
}

export default DeletedTodoList;
