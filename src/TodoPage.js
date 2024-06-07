import { useState, useEffect } from "react";
import styles from "./TodoPage.module.css";
import TodoList from "./TodoList";
import TaskDone from "./TaskDone";

const getCurrentDate = () => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const currentDate = new Date().toLocaleDateString(undefined, options);
  return currentDate;
};

function TodoPage({ setIsLoggedIn, setEmail, setPassword, demoUser }) {
  const [todoData, setTodoData] = useState("");
  const [todo, setTodo] = useState(() => {
    const storedValue = localStorage.getItem("todo");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [showTodo, setShowTodo] = useState(false);

  const [task, setTask] = useState(() => {
    const taskValue = localStorage.getItem("task");
    return taskValue ? JSON.parse(taskValue) : [];
  });
  const [showTask, setShowTask] = useState(false);
  const [clickedItems, setClickedItems] = useState(() => {
    const clickedValue = localStorage.getItem("clickedItems");
    return clickedValue ? JSON.parse(clickedValue) : {};
  });

  useEffect(() => {
    // Store todo list in local storage whenever it changes
    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("clickedItems", JSON.stringify(clickedItems));
    setShowTodo(true);
  }, [todo, clickedItems]);

  useEffect(() => {
    // Store todo list in local storage whenever it changes
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  function handleLogout() {
    // Clear authentication status from localStorage and update state
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  }

  function handleTodoSubmit(e) {
    e.preventDefault();
    setTodo([...todo, todoData]);
    setShowTodo(true);
    setTodoData("");
  }

  function handleDelete(todoText) {
    const updateTodo = todo.filter((item) => item !== todoText);
    setTodo(updateTodo);
  }
  function handleTaskDelete(taskText) {
    const updateTask = task.filter((item) => item !== taskText);
    setTask(updateTask);
    const updateTodo = todo.filter((items) => items !== taskText);
    setTodo(updateTodo);
  }
  function handleAddToTask(todoText) {
    const isInTask = task.includes(todoText);
    const updatedCart = isInTask
      ? task.filter((taskItem) => taskItem !== todoText)
      : [...task, todoText];
    setTask(updatedCart);
    setClickedItems((prevClickedItems) => ({
      ...prevClickedItems,
      [todoText]: !prevClickedItems[todoText],
    }));
  }

  function handleBackTodoPage() {
    setShowTask(false);
  }

  if (showTask) {
    return (
      <TaskDone
        task={task}
        handleBackTodoPage={handleBackTodoPage}
        getCurrentDate={getCurrentDate}
        handleTaskDelete={handleTaskDelete}
      />
    );
  }

  return (
    <div className={styles.main}>
      <nav className={styles.user}>
        <span>Welcome, {demoUser.name}</span>
        <button onClick={() => setShowTask(!showTask)}>
          TaskDone {task.length}
        </button>
        <button type="submit" onClick={handleLogout}>
          LogOut
        </button>
      </nav>
      <div>
        <form className={styles.forms} onSubmit={handleTodoSubmit}>
          <label>New Todo:</label>
          <div className={styles.btns}>
            <input
              type="text"
              value={todoData}
              onChange={(e) => setTodoData(e.target.value)}
            />
            <button type="submit" className={styles.btn}>
              Add
            </button>
          </div>
        </form>
        {showTodo && (
          <TodoList
            todo={todo}
            handleDelete={handleDelete}
            handleAddToTask={handleAddToTask}
            clickedItems={clickedItems}
            getCurrentDate={getCurrentDate}
          />
        )}
      </div>
    </div>
  );
}

export default TodoPage;
