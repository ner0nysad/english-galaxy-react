import Close from "../components/Close";
import "./Matching.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Matching = ({ matchingData }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");

  const [matching, setMatching] = useState(matchingData);

  const dragWord = useRef(0);
  const draggedOverWord = useRef(0);

  const handleSort = () => {
    const matchingClone = matching.ruList;
    const temp = matchingClone[dragWord.current];

    matchingClone[dragWord.current] = matchingClone[draggedOverWord.current];
    matchingClone[draggedOverWord.current] = temp;

    const items = document.querySelectorAll(".matching__item");
    let item = null;
    if (matchingClone.toString() === matching.correct.toString()) {
      setIsChecked(true);

      for (item of items) {
        setIsCorrect(true);
      }
    } else {
      for (item of items) {
        setIsCorrect(false);
      }
    }

    setMatching((prev) => ({
      ...prev,
      ruList: matchingClone,
    }));
  };

  const handleCheck = () => {
    navigate("/lesson");
  };

  return (
    <section className="matching">
      <div className="matching__container container">
        <Close link="/lesson" />
        <div className="matching__content">
          <h2 className="matching__content-title">
            Соотнесите слова с верным переводом
          </h2>
          <div className="matching__content-answers">
            <div className="matching__content-answers-left">
              <ul className="matching__content-list">
                {matching.enList.map((word) => (
                  <li key={word} className="matching__content-item">
                    {word}
                  </li>
                ))}
              </ul>
            </div>
            <div className="matching__content-answers-right">
              <ul className="matchings__list">
                {matching.ruList.map((word, index) => (
                  <li
                    key={word}
                    className={
                      isCorrect === ""
                        ? "matching__item"
                        : isCorrect
                        ? "matching__item correct-true"
                        : "matching__item correct-false"
                    }
                    draggable
                    onDragStart={() => (dragWord.current = index)}
                    onDragEnter={() => (draggedOverWord.current = index)}
                    onDragEnd={handleSort}
                    onDragOver={(event) => event.preventDefault()}
                  >
                    {word}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <button
          className={
            isChecked
              ? "matching__check"
              : "matching__check matching__check-disabled"
          }
          onClick={handleCheck}
        >
          Далее
        </button>
      </div>
    </section>
  );
};

export default Matching;
