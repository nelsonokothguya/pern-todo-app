import React from "react";
import { TodoType } from "../store/todos/types";
import Todo from "./Todo";

interface TodoListProps {
  todos: TodoType[];
  onToggle: (checked: boolean, todoId: number) => void;
}

class TodoList extends React.Component<TodoListProps> {
  handleTodoToggle = (checked: boolean, todoId: number) => {
    this.props.onToggle(checked, todoId);
  };

  render() {
    const { todos } = this.props;
    return (
      <div>
        <h2>Todo List</h2>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggling={(checked: boolean, todoId: number) =>
              this.handleTodoToggle(checked, todoId)
            }
          />
        ))}
      </div>
    );
  }
}

export default TodoList;
