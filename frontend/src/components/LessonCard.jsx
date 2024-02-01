import "./LessonCard.css";
import { useNavigate } from "react-router-dom";

const LessonCard = ({ title, description, type }) => {
  const navigate = useNavigate();
  return (
    <div className="lesson__card">
      <div className="lesson__card-content">
        <h3 className="lesson__card-title">{title}</h3>
        <p className="lesson__card-description">{description}</p>
      </div>
      <div className="lesson__card-link">
        <button onClick={() => navigate(`/${type}`)}></button>
      </div>
    </div>
  );
};
export default LessonCard;
