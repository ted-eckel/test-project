import React, { PropTypes } from 'react'
import Todo from './Todo'

function getFilteredTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      function isActive(todo) {
        return todo.completed === false;
      };
      return todos.filter(isActive);
    case 'SHOW_COMPLETED':
      function isCompleted(todo) {
        return todo.completed === true;
      };
      return todos.filter(isCompleted);
    default:
      return todos;
  }
}

const TodoList = ({
  todos,
  filter,
  onTodoClick,
  onTodoDelete
}) => (
  <ul>
    {getFilteredTodos(todos, filter).map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        onDelete={() => onTodoDelete(todo.id)}
      />
    )}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired
};

export default TodoList;
