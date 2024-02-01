import DictionaryCard from "./DictionaryCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const DictionaryCategoryWords = ({ category, currentList }) => {
  const [words, setWords] = useState([]);
  const [loaderStatus, setLoaderStatus] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/words-category", {
        params: {
          category: category,
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
        setWords(res.data);
      });
  }, []);

  return (
    <>
      {loaderStatus ? (
        <Loader />
      ) : (
        words.map((word) => (
          <div key={word.id}>
            <DictionaryCard {...word} currentList={currentList} />
          </div>
        ))
      )}
    </>
  );
};

export default DictionaryCategoryWords;
