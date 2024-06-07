import styles from "./TodoPage.module.css";

function TaskDone({
  task,
  handleBackTodoPage,
  getCurrentDate,
  handleTaskDelete,
}) {
  return (
    <div className={styles.main}>
      <button
        className={styles.user}
        onClick={() => {
          handleBackTodoPage();
        }}
      >
        &times;
      </button>
      {task.length > 0 ? (
        <ul className={styles.taskList}>
          {task.map((taskText) => (
            <li key={taskText} className={styles.todoList}>
              <h3 className={styles.name}>{taskText}</h3>
              <h3 className={styles.name}>is Completed on</h3>
              <time className={styles.date}>({getCurrentDate()})</time>
              <button
                onClick={() => handleTaskDelete(taskText)}
                className={styles.deleteBtn}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className={styles.message}>No tasks completed</h3>
      )}
    </div>
  );
}
export default TaskDone;
