import Close from "../components/Close";
import Word from "../components/Word";
import { useState } from "react";
import "./Mistake.css";
import TaskCheck from "../components/TaskCheck/TaskCheck";

const Mistake = ({ currentUser, mistakeData }) => {
  const [index, setIndex] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <section className="mistake">
      <div className="mistake__container container">
        <Close link={"/lesson"} />
        <div className="mistake__content">
          <h2 className="mistake__content-title">
            Отметьте неправильное предложение
          </h2>
          <div className="mistake__content-answers">
            <fieldset className="checkbox-group">
              {mistakeData.list[index].map((element) => (
                <Word
                  key={element}
                  element={element}
                  correct={mistakeData.correct[index]}
                  onSetChecked={() => setIsChecked(true)}
                />
              ))}
            </fieldset>
          </div>
        </div>
        <TaskCheck
          length={mistakeData.list.length}
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

export default Mistake;
