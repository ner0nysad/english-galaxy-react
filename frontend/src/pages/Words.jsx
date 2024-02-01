import Close from "../components/Close";
import Word from "../components/Word";
import { useState } from "react";
import "./Words.css";
import TaskCheck from "../components/TaskCheck/TaskCheck";

const Words = ({ currentUser, wordsData }) => {
  const [index, setIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const voice = () => {
    let speech = new SpeechSynthesisUtterance();

    speech.text = wordsData.main[index];
    speech.lang = "en-US";

    speechSynthesis.speak(speech);
  };

  return (
    <section className="words">
      <div className="words__container container">
        <Close link="/lesson" />
        <div className="words__content">
          <h2 className="words__content-title">Выберите правильный перевод</h2>
          <div className="words__content-word">{wordsData.main[index]}</div>
          <button onClick={voice} className="word-listen"></button>
          <div className="words__content-answers">
            <fieldset className="checkbox-group">
              {wordsData.list[index].map((element) => (
                <Word
                  key={element}
                  element={element}
                  correct={wordsData.correct[index]}
                  onSetChecked={() => setIsChecked(true)}
                />
              ))}
            </fieldset>
          </div>
        </div>
        <TaskCheck
          length={wordsData.list.length}
          onChangeIndex={(newIndex) => setIndex(newIndex)}
          onChangeIsChecked={() => setIsChecked(false)}
          index={index}
          isChecked={isChecked}
          currentUser={currentUser}
        />
      </div>
    </section>
  );
};

export default Words;
