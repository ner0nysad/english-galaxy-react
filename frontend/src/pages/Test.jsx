import Close from "../components/Close";
import Word from "../components/Word";
import TaskCheck from "../components/TaskCheck/TaskCheck";
import { useState } from "react";
import "./Test.css";

const Test = ({ currentUser, testData }) => {
  const [index, setIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className="test">
      <div className="test__container container">
        <Close link={"/lesson"} />
        <div className="test__content">
          <h2 className="test__content-title">Заполните верно пропуск</h2>
          <div className="test__content-text">{testData.main[index]}</div>
          <div className="test__content-answers">
            <fieldset className="checkbox-group">
              {testData.list[index].map((element) => (
                <Word
                  key={element}
                  element={element}
                  correct={testData.correct[index]}
                  onSetChecked={() => setIsChecked(true)}
                />
              ))}
            </fieldset>
          </div>
        </div>
        <TaskCheck
          length={testData.list.length}
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

export default Test;
