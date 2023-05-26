import * as React from "react";
import { Todo } from "../store/todos/types";
import{ TodoItem} from "./Todo";

interface TodoListProps {
  todos: Todo[];
  onTodoDelete: (id: number) => void;
     toggleCompletion: (id: number) => void;
}

class TodoList extends React.Component<TodoListProps> {
  render() {
    return (
      <div>
        <h2>Todo List</h2>
        {this.props.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onTodoDelete={this.props.onTodoDelete} onToggle={() => this.props.toggleCompletion(todo.id)} />
        ))}
      </div>
    );
  }
}

export default TodoList;

