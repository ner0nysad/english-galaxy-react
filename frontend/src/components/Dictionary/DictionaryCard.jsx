import "./DictionaryCard.css";
import Sound from "../../images/sound.png";
import { useState } from "react";

const DictionaryCard = ({
  word,
  translation,
  transcription,
  currentList,
  onAddWordToFavorite,
  onDeleteFavoriteWord,
}) => {
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const voice = () => {
    let speech = new SpeechSynthesisUtterance();

    speech.text = word;
    speech.lang = "en-US";

    speechSynthesis.speak(speech);
  };

  return (
    <div className="dictionary__card">
      <div className="dictionary__card-content">
        {currentList === "all" && (
          <div className="dictionary__card-left">
            <div className="dictionary__card-favorite">
              <input
                name={word}
                className="dictionary__card-favorite-input"
                type="radio"
              />
              <label
                title="Добавить в избранное"
                onClick={(event) => onAddWordToFavorite(event)}
              ></label>
            </div>
          </div>
        )}
        {currentList === "favorite" && (
          <div className="dictionary__card-left">
            <div
              className="dictionary__card-delete"
              onClick={(event) => onDeleteFavoriteWord(event)}
            >
              <input
                name={word}
                className="dictionary__card-delete-input"
                type="radio"
              />
              <label title="Добавить в избранное"></label>
            </div>
          </div>
        )}
        <div className="dictionary__card-word">{word}</div>
        <div className="dictionary__card-right">
          <button className="dictionary__card-right-button" onClick={voice}>
            <img src={Sound} alt="" />
          </button>
          <button
            className="dictionary__card-right-more"
            onClick={() => setIsOverlayActive(!isOverlayActive)}
          ></button>
        </div>
      </div>
      <div
        className={
          isOverlayActive
            ? "dictionary__card-overlay"
            : "dictionary__card-overlay dictionary__card-overlay-hide"
        }
      >
        <p className="dictionary__card-translate">Перевод: {translation}</p>
        <p className="dictionary__card-transcription">
          Транскрипция: {transcription}
        </p>
      </div>
    </div>
  );
};

export default DictionaryCard;
