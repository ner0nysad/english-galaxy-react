import Authorization from "./pages/Authorization";
import Main from "./pages/Main";
import Lesson from "./pages/Lesson";
import Grammar from "./pages/Grammar";
import Words from "./pages/Words";
import Mistake from "./pages/Mistake";
import Test from "./pages/Test";
import Matching from "./pages/Matching";
import Dictionary from "./pages/Dictionary";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { lessons } from "./Data";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentLesson, setCurrentLesson] = useState("");
  const [lesson, setLesson] = useState({});

  useEffect(() => {
    setLesson(
      lessons.find((lesson) => {
        return lesson.id === currentLesson;
      })
    );
  }, [currentLesson]);

  const changeCurrentUser = (newUser) => {
    setCurrentUser(newUser);
  };

  const changeVibrationStatus = (status) => {
    setCurrentUser((prev) => ({
      ...prev,
      vibr: status,
    }));
  };

  const changeRating = (rating) => {
    setCurrentUser((prev) => ({
      ...prev,
      rating: rating,
    }));
  };

  const changeImage = (image) => {
    setCurrentUser((prev) => ({
      ...prev,
      image: image,
    }));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Authorization
                currentUser={currentUser}
                onChangeCurrentUser={changeCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/main"
            element={
              <Main
                onChangeCurrentLesson={(lesson) => setCurrentLesson(lesson)}
              />
            }
          ></Route>
          <Route
            path="/lesson"
            element={<Lesson lesson={lesson} currentLesson={currentLesson} />}
          ></Route>
          <Route
            path="/grammar"
            element={
              <Grammar
                grammarData={
                  lesson && lesson.hasOwnProperty("grammar") && lesson.grammar
                }
              />
            }
          ></Route>
          <Route
            path="/words"
            element={
              <Words
                currentUser={currentUser}
                wordsData={
                  lesson && lesson.hasOwnProperty("words") && lesson.words
                }
              />
            }
          ></Route>
          <Route
            path="/mistake"
            element={
              <Mistake
                currentUser={currentUser}
                mistakeData={
                  lesson && lesson.hasOwnProperty("mistake") && lesson.mistake
                }
              />
            }
          ></Route>
          <Route
            path="/test"
            element={
              <Test
                currentUser={currentUser}
                testData={
                  lesson && lesson.hasOwnProperty("test") && lesson.test
                }
              />
            }
          ></Route>
          <Route
            path="/matching"
            element={
              <Matching
                matchingData={
                  lesson && lesson.hasOwnProperty("matching") && lesson.matching
                }
              />
            }
          ></Route>
          <Route
            path="/dictionary"
            element={<Dictionary currentUser={currentUser} />}
          ></Route>
          <Route
            path="/settings"
            element={
              <Settings
                currentUser={currentUser}
                onChangeVibrationStatus={changeVibrationStatus}
                onChangeRating={changeRating}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                currentUser={currentUser}
                onSetCurrentUser={(user) => setCurrentUser(user)}
                onChangeImage={changeImage}
              />
            }
          ></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
