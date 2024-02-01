import DictionaryCard from "./DictionaryCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const DictionaryFavoriteWords = ({ currentUser, currentList }) => {
  const [wordsList, setWordsList] = useState("");
  const [words, setWords] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);

  const deleteFavoriteWord = (event) => {
    let wordToDelete = event.target.querySelector(
      ".dictionary__card-delete-input"
    ).name;

    axios
      .get("http://localhost:8081/words-favorite", {
        params: {
          userId: currentUser.id,
        },
      })
      .then((res) => {
        let currentWordsList = "";
        res.data[0].words
          .split(";")
          .filter((word) => word !== wordToDelete)
          .map((word) => {
            !currentWordsList
              ? (currentWordsList += word)
              : (currentWordsList += ";" + word);
          });

        axios
          .put("http://localhost:8081/update-favorite-word", {
            words: currentWordsList,
            userId: currentUser.id,
          })
          .then((res) => {
            if (res.data === "Error") {
            } else {
              setWordsList(currentWordsList);
            }
          })
          .catch((err) => {});
      });
  };

  useEffect(() => {
    if (currentUser) {
      axios
        .get("http://localhost:8081/words-favorite", {
          params: {
            userId: currentUser.id,
          },
        })
        .then((res) => {
          if (res.data[0].words !== "") setWordsList(res.data[0]);
        });
    }
  }, []);

  useEffect(() => {
    if (words.length === 0) {
      let newWordsList = [];
      if (wordsList.words !== undefined && wordsList.words !== null) {
        newWordsList = wordsList.words.split(";");
      }

      newWordsList.sort().map((newWord) => {
        axios
          .get("http://localhost:8081/get-favorite-words", {
            params: {
              word: newWord,
            },
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
          })
          .then((res) => {
            setWords((prev) => [...prev, res.data[0]]);
          });
      });
    }
  }, [wordsList]);

  return (
    <>
      {loaderStatus ? (
        <Loader />
      ) : (
        words.length > 0 &&
        words.map((word) => (
          <DictionaryCard
            key={word.id}
            {...word}
            currentList={currentList}
            onDeleteFavoriteWord={deleteFavoriteWord}
          />
        ))
      )}
    </>
  );
};

export default DictionaryFavoriteWords;
