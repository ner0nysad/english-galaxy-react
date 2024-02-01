import axios from "axios";
import Footer from "../components/footer";
import Feedback from "../components/Feedback";
import "./Settings.css";
import { useState, useEffect } from "react";

const Settings = ({ currentUser, onChangeVibrationStatus, onChangeRating }) => {
  let status;

  if (currentUser.vibr) {
    status = true;
  }
  const [vibrationStatus, setVibrationStatus] = useState(status);

  useEffect(() => {
    let vibr;
    if (vibrationStatus) vibr = 1;
    else vibr = 0;
    axios
      .put("http://localhost:8081/updatevibration", {
        vibr: vibr,
        id: currentUser.id,
      })
      .then((res) => {
        if (res.data === "Error") {
        } else {
          onChangeVibrationStatus(vibr);
        }
      })
      .catch((err) => {});
  }, [vibrationStatus]);

  const [currentRating, setCurrentRating] = useState();

  useEffect(() => {
    axios
      .put("http://localhost:8081/updaterating", {
        rating: currentRating,
        id: currentUser.id,
      })
      .then((res) => {
        if (res.data === "Error") {
        } else {
          onChangeRating(currentRating);
        }
      })
      .catch((err) => {});
  }, [currentRating]);

  return (
    <section className="settings">
      <div className="settings__container container">
        <div className="settings__content">
          <h3 className="settings__title">Обучение</h3>
          <div className="settings__levels">
            <div className="settings__text">Уровень языка</div>
            <div className="settings__level">{currentUser.level}</div>
          </div>
          <h3 className="settings__title">Общие</h3>
          <div className="settings__point">
            <p className="settings__text">Вибрация</p>
            <div>
              <label className="settings__switch">
                <input
                  id="vibration"
                  type="checkbox"
                  defaultChecked={vibrationStatus}
                  onChange={() => setVibrationStatus(!vibrationStatus)}
                />
                <span className="settings__slider"></span>
              </label>
            </div>
          </div>
          <div className="settings__info">
            <Feedback
              onChangeCurrentRating={(newRating) => setCurrentRating(newRating)}
            />
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Settings;
