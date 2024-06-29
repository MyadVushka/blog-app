import styles from "./ThemeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/app/ThemeWrapper";

const ThemeToggle = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleSwitchTheme = () => {
    setTheme((prevTheme: string) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  return (
    <div onClick={handleSwitchTheme} className={styles.toggle_wrapper}>
      <div
        className={`${styles.toggle_circle} ${
          theme === "light" ? styles.active : ""
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggle;
