import "./Loader.css";
import loaderGif from "../../images/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderGif} />
    </div>
  );
};

export default Loader;
