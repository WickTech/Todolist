import React from "react";
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  Doing: Todo[];
  setDoing: React.Dispatch<React.SetStateAction<Todo[]>>;

  Done: Todo[];
  setDone: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  Doing,
  setDoing,
  Done,
  setDone,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
                doing={Doing}
                setDoing={setDoing}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="InProgress">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "inprocess" : "completed"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">In Progress</span>
            {Doing?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={Doing}
                todo={todo}
                key={todo.id}
                setTodos={setDoing}
                doing={Doing}
                setDoing={setDoing}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Completed Tasks</span>
            {Done?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={Done}
                todo={todo}
                key={todo.id}
                setTodos={setDone}
                doing={Doing}
                setDoing={setDoing}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
