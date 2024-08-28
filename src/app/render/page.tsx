"use client";
import React, { useState } from "react";
import RenderComponent from "../components/RenderComponent";

interface Props {}

function RenderPage(props: Props) {
  const {} = props;
  const [state, setState] = useState(0);

  return (
    <div>
      <button onClick={() => setState((prev) => prev - 1)}>-1</button>
      <button onClick={() => setState((prev) => prev + 1)}>+1</button>
      {state}
      <RenderComponent />
    </div>
  );
}

export default RenderPage;
