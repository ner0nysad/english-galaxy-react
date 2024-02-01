import "./Close.css";
import { useNavigate } from "react-router-dom";

const Close = ({ link }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(link)} className="close"></button>;
};

export default Close;
