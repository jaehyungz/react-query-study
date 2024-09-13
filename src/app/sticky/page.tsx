import React from "react";

import "./style.css";
interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div className="ct">
      <div className="inner">
        <div className="box1">box</div>
        <div className="box2">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
