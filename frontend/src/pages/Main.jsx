import "./Main.css";
import Footer from "../components/footer";
import MainCard from "../components/MainCard";

const Main = ({ onChangeCurrentLesson }) => {
  const cards = [
    {
      id: "lesson1",
      content: "Построение предложений",
    },
    {
      id: "lesson2",
      content: "Артикль, простые конструкции",
    },
    {
      id: "lesson3",
      content: "Артикль, простые конструкции",
    },
    {
      id: "lesson4",
      content: "Конструкции want to, I'd like to",
    },
    {
      id: "lesson5",
      content: "Простое настоящее время",
    },
    {
      id: "lesson6",
      content: "Простое настоящее время",
    },
    {
      id: "lesson7",
      content: "Простое настоящее время, вопрос Do",
    },
    {
      id: "lesson8",
      content: "Простое настоящее время, вопрос Does",
    },
    {
      id: "lesson9",
      content: "Глагол to be: am, is, are",
    },
    {
      id: "lesson10",
      content: "Глагол to be",
    },
  ];

  return (
    <section className="main">
      <div className="container ">
        <div className="main__container">
          <div className="main__content">
            <h4 className="main__title">Beginner</h4>
            <div className="main__cards">
              {cards.map((card) => (
                <MainCard
                  key={card.id}
                  onChangeCurrentLesson={onChangeCurrentLesson}
                  lesson={card.id}
                  content={card.content}
                />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Main;
