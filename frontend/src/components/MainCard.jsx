import { useNavigate } from "react-router-dom";
import "./MainCard.css";

const MainCard = ({ content, lesson, onChangeCurrentLesson }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    onChangeCurrentLesson(lesson);
    navigate("/lesson");
  };

  return (
    <div className="main__card">
      <div className="main__card-content">
        <p>{content}</p>
      </div>
      <div className="main__card-link">
        <button onClick={handleClick}></button>
      </div>
    </div>
  );
};

export default MainCard;
