import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

let nextId = 0;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'SHOW_ALL', // set of filters = {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED}
      todos: []           // array of todo objects, each having id, text, completed
    }

    this.onAddTodo = this.onAddTodo.bind(this);
    this.onTodoClick = this.onTodoClick.bind(this);
    this.onSelectFilter = this.onSelectFilter.bind(this);

    this.onTodoDelete = this.onTodoDelete.bind(this);
    this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
  }

  onAddTodo(newTodo) {
    this.setState({
      todos: [...this.state.todos, {
        id: nextId++,
        completed: false,
        text: newTodo
      }]
    });
  }

  onTodoClick(todoId) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    });
  }

  onTodoDelete(todoId) {
    function notDeleted(todo){
      return todo.id !== todoId
    }
    this.setState({
      todos: this.state.todos.filter(notDeleted)
    });
  }

  onSelectFilter(filter) {
    this.setState({
      filter: filter
    });
  }

  onDeleteCompleted(){
    function isActive(todo){
      return todo.completed === false;
    }
    this.setState({
      todos: this.state.todos.filter(isActive)
    });
  }

  render() {
    return (
      <div>
        <AddTodo
          onAddTodo={ this.onAddTodo } />

        <TodoList
          todos={ this.state.todos }
          filter={ this.state.filter }
          onTodoClick={ this.onTodoClick }
          onTodoDelete={ this.onTodoDelete } />

        <Footer
          selectedFilter={ this.state.filter }
          onSelectFilter={ this.onSelectFilter }
          onDeleteCompleted={ this.onDeleteCompleted } />
      </div>
    );
  }
}

export default App
