const CategoriesCard = ({ onChange, category, categoryId }) => {
  return (
    <div className="categories__card">
      <button
        className="categories__link"
        id={categoryId}
        onClick={(event) => {
          onChange(event.target.id);
        }}
      >
        {category}
      </button>
    </div>
  );
};

export default CategoriesCard;
