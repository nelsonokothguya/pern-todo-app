import * as React from "react";
import { connect } from "react-redux";
import {
  addTodo,
  removeTodo,
  fetchTodos,
} from "../store/todos/todosActionCreatorsAndReducer";
import {
  addDeletedTodo,
  removefromDeletedTodos,
  fetchDeletedTodos,
} from "../store/deletedtodos/deletedTodosActionCreatorsAndReducers";
import { TodoType } from "../store/todos/types";
import { DeletedTodoType } from "../store/deletedtodos/types";
import { RootState } from "../store/store";
import { MyForm } from "./Form";
import TodoList from "./TodoList";
import DeletedTodoList from "./DeletedTodoList";
import axios from "axios";

interface AppProps {
  todo: TodoType;
  deletedTodo: DeletedTodoType;
  todos: TodoType[];
  deletedTodos: DeletedTodoType[];
  addTodo: typeof addTodo;
  fetchTodos: typeof fetchTodos;
  fetchDeletedTodos: typeof fetchDeletedTodos;
  removeTodo: typeof removeTodo;
  addDeletedTodo: typeof addDeletedTodo;
  removefromDeletedTodos: typeof removefromDeletedTodos;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.fetchTodosFromServer();
    this.fetchDeletedTodosFromServer();
  }
  private fetchTodosFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:8080/activetodos");
      const todos: TodoType[] = response.data;
      this.props.fetchTodos(todos);
    } catch (error) {
      return error;
    }
  };
  private fetchDeletedTodosFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:8080/deletedtodos");
      const deletedTodos: DeletedTodoType[] = response.data;
      this.props.fetchDeletedTodos(deletedTodos);
    } catch (error) {
      return error;
    }
  };

  public handleAddTodo = async (title: string) => {
    try {
      const response = await axios.post("http://localhost:8080/activetodos", {
        title,
        completed: false,
      });
      this.props.addTodo(response.data);
    } catch (error) {
      return error;
    }
  };

  public deleteTodoFromActiveTodos = async (completed: boolean, id: number) => {
    try {
      const deletedResponse = await axios.delete(
        `http://localhost:8080/activetodos/${id}`
      );
      const deletedTodo: DeletedTodoType = deletedResponse.data;
      this.props.removeTodo(id);
      this.props.addDeletedTodo(deletedTodo);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  public deleteTodoFromDeletedTodos = async (
    completed: boolean,
    id: number
  ) => {
    try {
      const deletedResponse = await axios.delete(
        `http://localhost:8080/deletedtodos/${id}`
      );
      const deletedTodo: DeletedTodoType = deletedResponse.data;
      console.log("deletedTodo", deletedTodo);
      this.props.removefromDeletedTodos(id);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  render() {
    return (
      <div>
        <MyForm onAddTodo={this.handleAddTodo} />
        <TodoList
          todos={this.props.todos}
          onToggle={this.deleteTodoFromActiveTodos}
        />
        <DeletedTodoList
          deletedTodos={this.props.deletedTodos}
          onToggle={this.deleteTodoFromDeletedTodos}
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
  removefromDeletedTodos,
  fetchDeletedTodos,
  fetchTodos,
})(App);
