import "./DictionaryCategories.css";
import CategoriesCard from "./CategoriesCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import axios from "axios";

const DictionaryCategories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);
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
    axios.get("http://localhost:8081/categories", config).then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      {loaderStatus ? (
        <Loader />
      ) : (
        categories
          .sort()
          .map((category) => (
            <CategoriesCard
              key={category.id}
              {...category}
              onChange={onChange}
            />
          ))
      )}
    </>
  );
};

export default DictionaryCategories;
