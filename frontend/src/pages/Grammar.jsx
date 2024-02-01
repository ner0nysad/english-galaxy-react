import "./Grammar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Close from "../components/Close";

const Grammar = ({ grammarData }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index === grammarData.theory.length - 1) {
      navigate("/lesson");
    }
    const currentIndex = index + 1;
    setIndex(currentIndex);
  };

  const classes = ["orange", "yellow", "blue", "green"];

  let classIndex = 0;

  const handleGetExamples = (example) => {
    if (grammarData.examples[index][0] !== example) {
      classIndex += 1;
    }
    if (
      grammarData.examples[index][grammarData.examples[index].length - 1] ===
      example
    ) {
      return (
        <p key={classIndex}>
          <span className={classes[classIndex]}>{example}</span>
        </p>
      );
    } else {
      return (
        <p key={classIndex}>
          <span className={classes[classIndex]}>{example}</span>
          <span className="plus">+</span>
        </p>
      );
    }
  };

  return (
    <section className="grammar">
      <div className="grammar__container container">
        <Close link="/lesson" />
        <div className="grammar__content">
          <div className="grammar__info">
            <div className="grammar__info-text">
              {grammarData.theory[index]}
            </div>
            <div className="grammar__info-example">
              {grammarData.examples[index].map((example) =>
                handleGetExamples(example)
              )}
            </div>
          </div>
          <button onClick={handleNext} className="grammar__check">
            Далее
          </button>
        </div>
      </div>
    </section>
  );
};

export default Grammar;
