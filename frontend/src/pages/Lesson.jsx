import Close from "../components/Close";
import LessonCard from "../components/LessonCard";
import Footer from "../components/footer";
import "./Lesson.css";

const Lesson = ({ currentLesson, lesson }) => {
  const lessonData = [
    {
      id: 1,
      title: "Теория",
      description: "Ознакомьтесь с важнейшими грамматическими правилами",
      type: "grammar",
    },
    {
      id: 2,
      title: "Проверка слов",
      description: "Расширяйте свой словарный запас",
      type: "words",
    },
    {
      id: 3,
      title: "Найти ошибку",
      description: "Выберите неверное предложение",
      type: "mistake",
    },
    {
      id: 4,
      title: "Тест",
      description: "Заполните пропуск",
      type: "test",
    },
    {
      id: 5,
      title: "Мэтчинг",
      description: "Закрепляйте изученные слова",
      type: "matching",
    },
  ];

  return (
    <section className="lesson">
      <div className=" container">
        <div className="lesson__container">
          <Close link="/main" />
          <h4 className="lesson__title">
            Урок {currentLesson.replace("lesson", "")}
          </h4>
          <div className="lesson__cards">
            {lessonData.map(
              (data) =>
                lesson &&
                lesson.hasOwnProperty(data.type) && (
                  <LessonCard key={data.id} {...data} />
                )
            )}
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

export default Lesson;
