import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputFeild";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [doing, setDoing] = useState<Array<Todo>>([]);
  const [Done, setDone] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let active = [...todos];
    let inProgress = [...doing];
    let complete = [...Done];
    let add;

    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "InProgress") {
      add = inProgress[source.index];
      inProgress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "InProgress") {
      inProgress.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setDoing(inProgress);
    setDone(complete);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskmanager</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          Doing={doing}
          setDoing={setDoing}
          Done={Done}
          setDone={setDone}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
