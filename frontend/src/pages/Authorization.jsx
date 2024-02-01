import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginValidation from "../Validations/LoginValidation";
import SignUpValidation from "../Validations/SignUpValidation";
import axios from "axios";
import "./Authorization.css";

const Authorization = ({ currentUser, onChangeCurrentUser }) => {
  const navigate = useNavigate();

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const activeRightPanelHandler = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const [signUpValues, setSignUpValues] = useState({
    surname: "",
    name: "",
    email: "",
    password: "",
  });

  const [signUpErrors, setSignUpErrors] = useState([]);

  const handleSignUpInput = (event) => {
    setSignUpValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    setSignUpErrors(SignUpValidation(signUpValues));
  };

  useEffect(() => {
    if (
      signUpErrors.surname === "" &&
      signUpErrors.name === "" &&
      signUpErrors.email === "" &&
      signUpErrors.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", signUpValues)
        .then((res) => {
          if (res.data === "Error") {
          } else {
            axios
              .get("http://localhost:8081/current-user", {
                params: {
                  email: signUpValues.email,
                },
              })
              .then((res) => {
                onChangeCurrentUser(res.data);
              });
          }
        })
        .catch((err) => {});
    }
  }, [signUpErrors]);

  useEffect(() => {
    if (currentUser.id) {
      const userId = currentUser.id;
      axios
        .post("http://localhost:8081/new", { userId: userId })
        .then((res) => {
          navigate("/main");
        })
        .catch((err) => {});
    }
  }, [currentUser]);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({});

  const handleLoginInput = (event) => {
    setLoginValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoginErrors(LoginValidation(loginValues));
  };

  useEffect(() => {
    if (loginErrors.email === "" && loginErrors.password === "") {
      axios
        .post("http://localhost:8081/login", loginValues)
        .then((res) => {
          if (res.data === "Success") {
            axios
              .get("http://localhost:8081/current-user", {
                params: {
                  email: loginValues.email,
                },
              })
              .then((res) => {
                onChangeCurrentUser(res.data);
              });
          } else if (res.data === "Fail") {
            setLoginErrors((prev) => ({
              ...prev,
              password: "Неверная почта или пароль",
            }));
          }
        })
        .catch((err) => {});
    }
  }, [loginErrors]);

  return (
    <section className="authorization">
      <div
        className={
          isRightPanelActive
            ? "authorization__container right-panel-active"
            : "authorization__container"
        }
      >
        <div className="authorization__form-container authorization__sign-up-container">
          <form
            className="authorization__form"
            action=""
            onSubmit={handleSignUpSubmit}
          >
            <h1 className="authorization__form-title">Создать аккаунт</h1>

            <input
              value={signUpValues.surname}
              onChange={handleSignUpInput}
              name="surname"
              type="text"
              placeholder="Фамилия"
            />
            <div className="authorization__form-error">
              {signUpErrors.surname && <span>{signUpErrors.surname}</span>}
            </div>
            <input
              value={signUpValues.name}
              onChange={handleSignUpInput}
              name="name"
              type="text"
              placeholder="Имя"
            />
            <div className="authorization__form-error">
              {signUpErrors.name && <span>{signUpErrors.name}</span>}
            </div>
            <input
              value={signUpValues.email}
              onChange={handleSignUpInput}
              name="email"
              type="email"
              placeholder="Почта"
            />
            <div className="authorization__form-error">
              {signUpErrors.email && <span>{signUpErrors.email}</span>}
            </div>
            <input
              value={signUpValues.password}
              onChange={handleSignUpInput}
              name="password"
              type="password"
              placeholder="Пароль"
            />
            <div className="authorization__form-error">
              {signUpErrors.password && <span>{signUpErrors.password}</span>}
            </div>
            <button>Зарегистрироваться</button>
          </form>
        </div>
        <div className="authorization__form-container authorization__sign-in-container">
          <form action="" onSubmit={handleLoginSubmit}>
            <h1 className="authorization__form-title">Войти</h1>
            <input
              onChange={handleLoginInput}
              name="email"
              type="email"
              placeholder="Почта"
            />
            <div className="authorization__form-error">
              {loginErrors.email && <span>{loginErrors.email}</span>}
            </div>
            <input
              onChange={handleLoginInput}
              name="password"
              type="password"
              placeholder="Пароль"
            />
            <div className="authorization__form-error">
              {loginErrors.password && <span>{loginErrors.password}</span>}
            </div>
            <button type="submit">Войти</button>
          </form>
        </div>
        <div className="authorization__overlay-container">
          <div className="authorization__overlay">
            <div className="authorization__overlay-panel authorization__overlay-left">
              <h1>Войти в аккаунт</h1>
              <p>
                Чтобы оставаться на связи с нами, пожалуйста, введите свои
                данные
              </p>
              <button
                className="authorization__overlay-ghost"
                onClick={activeRightPanelHandler}
              >
                Войти
              </button>
            </div>
            <div className="authorization__overlay-panel authorization__overlay-right">
              <h1>Привет, друг!</h1>
              <p>Введите свои личные данные и начните изучение</p>
              <button
                className="authorization__overlay-ghost"
                onClick={activeRightPanelHandler}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authorization;
