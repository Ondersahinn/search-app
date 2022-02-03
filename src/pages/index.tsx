import React from "react";

import {  Main} from "components/scss";

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Main />
    </div>
  );
};

export default Home;
