import Header from "../components/Header";
import Footer from "../components/footer";
import DictionaryCategories from "../components/Dictionary/DictionaryCategories";
import DictionaryAllWords from "../components/Dictionary/DictionaryAllWords";
import DictionaryFavoriteWords from "../components/Dictionary/DictionaryFavoriteWords";
import DictionaryCategoryWords from "../components/Dictionary/DictionaryCategoryWords";
import { useState } from "react";

import "./Dictionary.css";

const Dictionary = ({ currentUser }) => {
  const [list, setList] = useState("all");
  const [category, setCategory] = useState("");

  return (
    <section className="dictionary">
      <div className="dictionary__container container">
        <Header onChangeList={(currentList) => setList(currentList)} />
        {
          <div className="dictionary__cards">
            {list === "all" && (
              <DictionaryAllWords
                currentUser={currentUser}
                currentList={list}
              />
            )}
            {list === "favorite" && (
              <DictionaryFavoriteWords
                currentUser={currentUser}
                currentList={list}
              />
            )}
            {list === "categories" && (
              <DictionaryCategories
                onChange={(newCategory) => {
                  setList("category");
                  setCategory(newCategory);
                }}
              />
            )}
            {list === "category" && (
              <DictionaryCategoryWords category={category} currentList={list} />
            )}
          </div>
        }

        <Footer />
      </div>
    </section>
  );
};

export default Dictionary;
