import { useEffect, useState } from "react";
import styles from "./LoginTodo.module.css";
import TodoPage from "./TodoPage";

const demoUser = {
  name: "abc",
  email: "abc@gmail.com",
  password: "123",
};

function LoginTodo() {
  const [email, setEmail] = useState("abc@gmail.com");
  const [password, setPassword] = useState("123");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the user is logged in from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Update localStorage when the isLoggedIn state changes
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    if (email === demoUser.email && password === demoUser.password) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }
  if (isLoggedIn) {
    return (
      <TodoPage
        setIsLoggedIn={setIsLoggedIn}
        setEmail={setEmail}
        setPassword={setPassword}
        demoUser={demoUser}
      />
    );
  }

  return (
    <div className={styles.login}>
      <h1>Todo-List Signin</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>UserName</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <button type="submit" className={styles.btn}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginTodo;
