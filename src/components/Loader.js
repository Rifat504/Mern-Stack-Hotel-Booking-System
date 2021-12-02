import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);

  return (
    <div>
      <div className="sweet-loading">
        <BounceLoader color="#000" loading={loading} size={150} />
      </div>
    </div>
  );
};

export default Loader;
