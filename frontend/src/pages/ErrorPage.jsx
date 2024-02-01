import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="error-page">
      <div className="error-page__container container">
        <div className="error-page__body">
          <img className="error-page__image-404" src="src/images/404/404.svg" />
          <button onClick={() => navigate("/")} className="error-page__btn">
            На главную
          </button>
        </div>
        <div className="error-page__objects">
          <img
            className="error-page__object-rocket"
            src="src/images/404/rocket.svg"
          />
          <div className="error-page__earth-moon">
            <img
              className="error-page__object-earth"
              src="src/images/404/earth.svg"
            />
            <img
              className="error-page__object-moon"
              src="src/images/404/moon.svg"
            />
          </div>
          <div className="error-page__objects__box-astronaut">
            <img
              className="error-page__object-astronaut"
              src="src/images/404/astronaut.svg"
            />
          </div>
        </div>
        <div className="error-page__glowing-stars">
          <div className="error-page__star"></div>
          <div className="error-page__star"></div>
          <div className="error-page__star"></div>
          <div className="error-page__star"></div>
          <div className="error-page__star"></div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
