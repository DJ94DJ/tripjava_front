import "../../styles/style.scss";

import React from "react";

function Main({ children }) {
  return (
    <div className="main_body">
      <main>{children}</main>
    </div>
  );
}

export default Main;
