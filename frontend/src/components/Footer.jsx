import "./Footer.css";
import home from "../images/home.svg";
import book from "../images/book.svg";
import settings from "../images/settings.svg";
import user from "../images/user.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav>
          <ul className="footer__list">
            <li>
              <a className="footer__link" onClick={() => navigate("/main")}>
                <img src={home} alt="Главная" />
                <span className="footer__text">Главная</span>
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                onClick={() => navigate("/dictionary")}
              >
                <img src={book} alt="Словарь" />
                <span className="footer__text">Словарь</span>
              </a>
            </li>
            <li>
              <a className="footer__link" onClick={() => navigate("/settings")}>
                <img src={settings} alt="Настройки" />
                <span className="footer__text">Настройки</span>
              </a>
            </li>
            <li>
              <a className="footer__link" onClick={() => navigate("/profile")}>
                <img src={user} alt="Профиль" />
                <span className="footer__text">Профиль</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
