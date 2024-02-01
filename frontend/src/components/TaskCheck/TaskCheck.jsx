import { useNavigate } from "react-router-dom";
import "./TaskCheck.css";

const TaskCheck = ({
  length,
  isChecked,
  onChangeIndex,
  index,
  currentUser,
  onChangeIsChecked,
}) => {
  const navigate = useNavigate();

  const handleCheck = (event) => {
    let checkbox = null;
    const checkboxes = document.querySelectorAll(".checkbox-title");
    if (event.target.textContent === "Проверить") {
      for (checkbox of checkboxes) {
        if (checkbox.getAttribute("id") === "checkbox-true") {
          checkbox.classList.toggle("true");
        } else {
          checkbox.classList.toggle("false");
        }
      }

      const audio = new Audio("../../public/sound/succes.mp3");

      audio.play();

      if (currentUser.vibr) {
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(500);
        }
      }

      event.target.textContent = "Далее";
    } else if (event.target.textContent === "Далее") {
      if (index === length - 1) {
        navigate("/lesson");
      }
      const currentIndex = index + 1;
      onChangeIndex(currentIndex);
      event.target.textContent = "Проверить";
      onChangeIsChecked();
      for (checkbox of checkboxes) {
        if (checkbox.getAttribute("id") === "checkbox-true") {
          checkbox.classList.toggle("true");
        } else {
          checkbox.classList.toggle("false");
        }
      }
    }
  };

  return (
    <button
      className={isChecked ? "task__check" : "task__check task__check-disabled"}
      onClick={(event) => handleCheck(event)}
    >
      Проверить
    </button>
  );
};

export default TaskCheck;
