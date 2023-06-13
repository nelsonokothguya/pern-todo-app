import * as React from "react";
import { DeletedTodoType } from "../store/deletedtodos/types";
import { CompletedTodo } from "./CompletedTodo";

interface CompletedTodoListProps {
  deletedTodos: DeletedTodoType[];
  onToggle: (checked: boolean, deletedTodoId: number) => void;
}

class CompletedTodoList extends React.Component<CompletedTodoListProps> {
  handleDeletedTodoToggle = (checked: boolean, deletedTodoId: number) => {
    this.props.onToggle(checked, deletedTodoId);
  };

  render() {
    return (
      <div>
        <h2>Completed Todos</h2>
        {this.props.deletedTodos.map((deletedTodo) => (
          <CompletedTodo
            key={deletedTodo.id}
            deletedTodo={deletedTodo}
            onToggle={this.handleDeletedTodoToggle}
          />
        ))}
      </div>
    );
  }
}

export default CompletedTodoList;
