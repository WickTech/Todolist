import React, { SetStateAction, useEffect } from "react";
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
  
  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    const storedDoing = localStorage.getItem("doing");
    if (storedDoing) {
      setDoing(JSON.parse(storedDoing));
    }

    const storedDone = localStorage.getItem("done");
    if (storedDone) {
      setDone(JSON.parse(storedDone));
    }
  }, [setDoing, setDone, setTodos]); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    // Save tasks to local storage whenever tasks are updated
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // Save doing tasks to local storage whenever doing tasks are updated
    localStorage.setItem("doing", JSON.stringify(Doing));
  }, [Doing]);

  useEffect(() => {
    // Save done tasks to local storage whenever done tasks are updated
    localStorage.setItem("done", JSON.stringify(Done));
  }, [Done]);

  function handleUpdateTodos(value: SetStateAction<Todo[]>): void {
    throw new Error("Function not implemented.");
  }

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
                setTodos={handleUpdateTodos}
                doing={Doing}
                setDoing={handleUpdateTodos}
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
                setTodos={handleUpdateTodos}
                doing={Doing}
                setDoing={handleUpdateTodos}
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
                setTodos={handleUpdateTodos}
                doing={Doing}
                setDoing={handleUpdateTodos}
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
