import styles from "./TodoList.module.css";
import pageStyles from "./TodoPage.module.css";

function TaskDone({
  task,
  handleBackTodoPage,
  getCurrentDate,
  handleTaskDelete,
}) {
  return (
    <div className={pageStyles.main}>
      <button
        className={pageStyles.user}
        onClick={() => {
          handleBackTodoPage();
        }}
      >
        &times;
      </button>
      {task.length > 0 ? (
        <>
          <h3 className={styles.heading}>List of Task completed</h3>
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
        </>
      ) : (
        <h3 className={styles.message}>No tasks completed</h3>
      )}
    </div>
  );
}
export default TaskDone;
