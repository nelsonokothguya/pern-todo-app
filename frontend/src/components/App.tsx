import * as React from "react";
import { connect } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleTodoCompletion,
} from "../store/todos/actions";
import { addDeletedTodo, restoreTodo } from "../store/deletedtodos/actions";
import { Todo } from "../store/todos/types";
import { DeletedTodo } from "../store/deletedtodos/types";
import { RootState } from "../store/store";

import { Form } from "./Form";
import TodoList from "./TodoList";
import DeletedTodoList from "./DeletedTodoList";

interface AppProps {
  todos: Todo[];
  deletedTodos: DeletedTodo[];
  addTodo: typeof addTodo;
  removeTodo: typeof removeTodo;
  toggleTodoCompletion: typeof toggleTodoCompletion;
  addDeletedTodo: typeof addDeletedTodo;
  restoreTodo: typeof restoreTodo;
}

class App extends React.Component<AppProps> {
  handleToggleCompletion = (id: number) => {
    this.props.toggleTodoCompletion(id); // toggle todo's completion state
  };

  handleAddTodo = (title: string) => {
    this.props.addTodo({
      id: Math.random(), // Temporary solution for generating ID
      title,
      completed: false,
    });
  };

  handleDeleteTodo = (id: number) => {
    // Find the todo to be deleted
    const todo = this.props.todos.find((todo) => todo.id === id);
    if (todo) {
      // Add the deleted todo to the deletedTodos state
      this.props.addDeletedTodo({
        id: Math.random(), // Temporary solution for generating ID
        originalId: todo.id,
        title: todo.title,
        completed: true,
      });

      // Remove the deleted todo from the todos state
      this.props.removeTodo(id);
    }
  };

  handleRestoreTodo = (id: number) => {
    // Find the deleted todo to be restored
    const deletedTodo = this.props.deletedTodos.find((todo) => todo.id === id);
    if (deletedTodo) {
      // Add the restored todo back to the todos state
      this.props.addTodo({
        id: deletedTodo.originalId,
        title: deletedTodo.title,
        completed: false,
      });

      // Remove the restored todo from the deletedTodos state
      this.props.restoreTodo(id);
    }
  };

  render() {
    return (
      <div>
        <Form onAddTodo={this.handleAddTodo} />
        <TodoList
          todos={this.props.todos}
          onTodoDelete={this.handleDeleteTodo}
         toggleCompletion={this.handleToggleCompletion}
        />
        <DeletedTodoList
          deletedTodos={this.props.deletedTodos}
          onTodoRestore={this.handleRestoreTodo}
          toggleCompletion={this.handleToggleCompletion}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  todos: state.todos,
  deletedTodos: state.deletedTodos,
});

export default connect(mapStateToProps, {
  addTodo,
  removeTodo,
  addDeletedTodo,
  restoreTodo,
  toggleTodoCompletion,
})(App);
