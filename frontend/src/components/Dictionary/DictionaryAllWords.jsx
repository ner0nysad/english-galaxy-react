import DictionaryCard from "./DictionaryCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const DictionaryAllWords = ({ currentList, currentUser }) => {
  const [words, setWords] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);

  const config = {
    onDownloadProgress: (progressEvent) => {
      setLoaderStatus(true);
      const percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (percentage === 100) {
        setTimeout(() => {
          setLoaderStatus(false);
        }, 1000);
      }
    },
  };

  useEffect(() => {
    axios.get("http://localhost:8081/words", config).then((res) => {
      setWords(res.data);
    });
  }, []);

  const addWordToFavorite = (event) => {
    let newFavoriteWord = event.target.previousSibling.name;

    axios
      .get("http://localhost:8081/words-favorite", {
        params: {
          userId: currentUser.id,
        },
      })
      .then((res) => {
        if (
          res.data[0].words === null ||
          res.data[0].words === "" ||
          !res.data[0].words.includes(newFavoriteWord)
        ) {
          if (res.data[0].words) {
            newFavoriteWord = ";" + newFavoriteWord;
          }
          axios
            .put("http://localhost:8081/update-favorite-word", {
              words:
                res.data[0].words === null
                  ? newFavoriteWord
                  : res.data[0].words + newFavoriteWord,
              userId: currentUser.id,
            })
            .then((res) => {
              if (res.data === "Error") {
              }
            })
            .catch((err) => {});
        }
      });
  };

  return (
    <>
      {loaderStatus ? (
        <Loader />
      ) : (
        words
          .sort()
          .map((word) => (
            <DictionaryCard
              currentUser={currentUser}
              key={word.id}
              {...word}
              currentList={currentList}
              onAddWordToFavorite={addWordToFavorite}
            />
          ))
      )}
    </>
  );
};

export default DictionaryAllWords;
