import Footer from "../components/footer";
import Modal from "../components/Modal/Modal";
import "./Profile.css";
import ChangePasswordValidation from "../Validations/ChangePasswordValidation";
import ChangeUserInfoValidation from "../Validations/ChangeUserInfoValidation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ currentUser, onSetCurrentUser, onChangeImage }) => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [passwordsErrors, setPasswordsErrors] = useState([]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    onSetCurrentUser({});
    navigate(`/`);
  };

  const handleDeleteAccount = () => {
    axios
      .delete("http://localhost:8081/delete-account", {
        params: {
          id: currentUser.id,
        },
      })
      .then((res) => {
        if (res.data === "Error") {
        } else if (res.data === "Success") {
          axios
            .delete("http://localhost:8081/delete-account-favorite", {
              params: {
                id: currentUser.id,
              },
            })
            .then((res) => {
              if (res.data === "Error") {
              } else if (res.data === "Success") {
                onSetCurrentUser({});
                navigate(`/`);
              }
            })
            .catch((err) => {});
        }
      })
      .catch((err) => {});
  };

  const handleChangePassworInput = (event) => {
    setPasswords((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    setPasswordsErrors(
      ChangePasswordValidation(passwords, currentUser.password)
    );
  };

  useEffect(() => {
    if (
      passwordsErrors.currentPassword === "" &&
      passwordsErrors.newPassword === ""
    ) {
      axios
        .put("http://localhost:8081/update-password", {
          password: passwords.newPassword,
          id: currentUser.id,
        })
        .then((res) => {
          if (res.data === "Error") {
          } else if (res.data === "Success") {
            onSetCurrentUser((prev) => ({
              ...prev,
              password: passwords.newPassword,
            }));
            setIsChangePasswordModalOpen(false);
          }
        })
        .catch((err) => {});
    }
  }, [passwordsErrors]);

  const [readOnlyStatus, setReadOnlyStatus] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: currentUser.name,
    surname: currentUser.surname,
    email: currentUser.email,
  });
  const [userInfoErrors, setUserInfoErrors] = useState([]);

  const handleChangeUserInfoInput = (event) => {
    setUserInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeInfo = (event) => {
    event.preventDefault();

    if (event.target.textContent === "Изменить данные") {
      event.target.textContent = "Сохранить";
      setReadOnlyStatus(false);
    } else if (event.target.textContent === "Сохранить") {
      event.target.textContent = "Изменить данные";
      setReadOnlyStatus(true);
      setUserInfoErrors(ChangeUserInfoValidation(userInfo));
    }
  };

  useEffect(() => {
    if (
      userInfoErrors.surname === "" &&
      userInfoErrors.name === "" &&
      userInfoErrors.email === ""
    ) {
      axios
        .put("http://localhost:8081/update-user-info", {
          name: userInfo.name,
          surname: userInfo.surname,
          email: userInfo.email,
          id: currentUser.id,
        })
        .then((res) => {
          if (res.data === "Error") {
          } else if (res.data === "Success") {
            onSetCurrentUser((prev) => ({
              ...prev,
              name: userInfo.name,
              surname: userInfo.surname,
              email: userInfo.email,
            }));
          }
        })
        .catch((err) => {});
    }
  }, [userInfoErrors]);

  const [userImage, setUserImage] = useState("");

  const handleChangeUserImage = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    axios
      .post("http://localhost:8081/upload", formData)
      .then((res) => {})
      .catch((err) => {});

    axios
      .put("http://localhost:8081/update-user-image", {
        id: currentUser.id,
        image: event.target.files[0].name,
      })
      .then((res) => {
        if (res.data === "Error") {
        } else if (res.data === "Success") {
          onChangeImage(event.target.files[0].name);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (
      currentUser.image !== "" &&
      currentUser.image !== undefined &&
      currentUser.image !== null
    ) {
      setUserImage(`src/images/avatars/${currentUser.image}`);
    }
  }, [currentUser.image]);

  return (
    <section className="profile">
      <div className="container">
        <div className="profile__container">
          <div className="profile__image">
            <img
              src={
                userImage === "" ? "src/images/avatars/default.jpg" : userImage
              }
              alt=""
              accept="image/gif, image/jpeg, image/png, image/jpg"
            />
          </div>
          <div className="profile__change-content">
            <form method="post">
              <label className="profile__change-input">
                <input
                  onChange={handleChangeUserImage}
                  id="file"
                  type="file"
                  name="file"
                />
                <span>Загрузить фотографию</span>
              </label>
            </form>
            <div className="profile__change-login-box">
              <form action="">
                <input
                  readOnly={readOnlyStatus}
                  placeholder="Имя"
                  name="name"
                  type="text"
                  value={userInfo.name}
                  onChange={handleChangeUserInfoInput}
                />
                <div className="profile__change-error">
                  {userInfoErrors.name && <span>{userInfoErrors.name}</span>}
                </div>
                <input
                  readOnly={readOnlyStatus}
                  placeholder="Фамилия"
                  name="surname"
                  type="text"
                  value={userInfo.surname}
                  onChange={handleChangeUserInfoInput}
                />
                <div className="profile__change-error">
                  {userInfoErrors.surname && (
                    <span>{userInfoErrors.surname}</span>
                  )}
                </div>
                <input
                  readOnly={readOnlyStatus}
                  placeholder="Е-mail"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  onChange={handleChangeUserInfoInput}
                />
                <div className="profile__change-error">
                  {userInfoErrors.name && <span>{userInfoErrors.name}</span>}
                </div>
                <button
                  className="profile__change-button"
                  onClick={handleChangeInfo}
                >
                  Изменить данные
                </button>
              </form>
            </div>
            <div className="profile__change-buttons">
              <button
                className="profile__change-button"
                onClick={(event) => {
                  event.preventDefault();
                  setIsChangePasswordModalOpen(true);
                }}
              >
                Изменить пароль
              </button>
              <button
                className="profile__change-button"
                onClick={handleSignOut}
              >
                Выйти
              </button>
              <button
                className="profile__change-button"
                onClick={handleDeleteAccount}
              >
                Удалить аккаунт
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal open={isChangePasswordModalOpen}>
        <form className="modal__form" action="" onSubmit={handleChangePassword}>
          <div className="modal__input">
            <label>Старый пароль</label>
            <input
              placeholder="Старый пароль"
              name="currentPassword"
              value={passwords.currentPassword}
              type="password"
              onChange={handleChangePassworInput}
            />
            <div className="modal__error">
              {passwordsErrors.currentPassword}
            </div>
          </div>
          <div className="modal__input">
            <label>Новый пароль</label>
            <input
              placeholder="Новый пароль"
              name="newPassword"
              type="password"
              onChange={handleChangePassworInput}
            />
            <div className="modal__error">{passwordsErrors.newPassword}</div>
          </div>

          <button className="modal__button">Изменить пароль</button>
        </form>
        <div
          className="modal__close"
          onClick={() => setIsChangePasswordModalOpen(false)}
        ></div>
      </Modal>
    </section>
  );
};

export default Profile;
