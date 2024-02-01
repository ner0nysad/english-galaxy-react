import "./Feedback.css";

const Feedback = ({ onChangeCurrentRating }) => {
  return (
    <div className="feedback">
      <div className="feedback__title">Оцените мою работу:</div>
      <div className="rating">
        <input
          type="radio"
          name="rating"
          id="rating-5"
          onClick={(event) =>
            onChangeCurrentRating(event.target.id.replace("rating-", ""))
          }
        />
        <label htmlFor="rating-5" title="Очень нравится"></label>
        <input
          type="radio"
          name="rating"
          id="rating-4"
          onClick={(event) =>
            onChangeCurrentRating(event.target.id.replace("rating-", ""))
          }
        />
        <label htmlFor="rating-4" title="Нравится"></label>
        <input
          type="radio"
          name="rating"
          id="rating-3"
          onClick={(event) =>
            onChangeCurrentRating(event.target.id.replace("rating-", ""))
          }
        />
        <label htmlFor="rating-3" title="Нормально"></label>
        <input
          type="radio"
          name="rating"
          id="rating-2"
          onClick={(event) =>
            onChangeCurrentRating(event.target.id.replace("rating-", ""))
          }
        />
        <label htmlFor="rating-2" title="Не нравится"></label>
        <input
          type="radio"
          name="rating"
          id="rating-1"
          onClick={(event) =>
            onChangeCurrentRating(event.target.id.replace("rating-", ""))
          }
        />
        <label
          htmlFor="rating-1"
          title="Очень плохо, есть над чем работать"
        ></label>
      </div>
    </div>
  );
};

export default Feedback;
