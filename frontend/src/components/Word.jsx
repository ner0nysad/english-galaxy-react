import "./Word.css";

const Word = ({ element, onSetChecked, correct }) => {
  let id = "";
  if (correct === element) {
    id = "checkbox-true";
  }

  return (
    <div className="checkbox">
      <label className="checkbox-wrapper">
        <input
          onChange={onSetChecked}
          type="radio"
          className="checkbox-input"
        />
        <span id={id} className="checkbox-title">
          <span className="checkbox-label">{element}</span>
        </span>
      </label>
    </div>
  );
};

export default Word;
