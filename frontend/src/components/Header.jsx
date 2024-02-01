import "./Header.css";

const Header = ({ onChangeList }) => {
  return (
    <div className="header">
      <nav>
        <ul className="header-list">
          <li>
            <button
              className="header-button"
              id="all"
              onClick={(event) => {
                onChangeList(event.target.id);
              }}
            >
              Список слов
            </button>
          </li>
          <li>
            <button
              className="header-button"
              id="favorite"
              onClick={(event) => {
                onChangeList(event.target.id);
              }}
            >
              Избранное
            </button>
          </li>
          <li>
            <button
              className="header-button"
              id="categories"
              onClick={(event) => {
                onChangeList(event.target.id);
              }}
            >
              Категории
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
