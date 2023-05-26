import * as React from "react";
import { DeletedTodo } from "../store/deletedtodos/types";
import {DeletedTodoItem} from "./DeletedTodo";


interface DeletedTodoListProps {
  deletedTodos: DeletedTodo[];
  onTodoRestore: (id: number) => void;
    toggleCompletion: (id: number) => void;
}

class DeletedTodoList extends React.Component<DeletedTodoListProps> {
    handleToggle = (id:number) => {
        this.props.toggleCompletion(id);
    }

    render() {
    return (
      <div>
        <h2>Deleted Todo List</h2>
        {this.props.deletedTodos.map((deletedTodo) => (
          <DeletedTodoItem 
            key={deletedTodo.id} 
            deletedTodo={deletedTodo} 
            onTodoRestore={this.props.onTodoRestore}
            onToggle={() => this.handleToggle( deletedTodo.id)}
            />
        ))}
      </div>
    );
  }
}

export default DeletedTodoList;

