import styles from "./TodoList.module.css";
import pageStyles from "./TodoPage.module.css";

function TodoList({
  todo,
  handleDelete,
  handleAddToTask,
  clickedItems,
  getCurrentDate,
}) {
  return (
    <div className={pageStyles.main}>
      <ul>
        {todo.map((todoText) => (
          <li key={todoText} className={styles.todoList}>
            <h3 className={styles.name}>{todoText}</h3>
            <time className={styles.date}>({getCurrentDate()})</time>
            <button
              className={styles.addBtn}
              onClick={() => handleAddToTask(todoText)}
            >
              {clickedItems[todoText] ? "Completed" : "Not Finished"}
            </button>
            <button
              onClick={() => handleDelete(todoText)}
              className={styles.deleteBtn}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
