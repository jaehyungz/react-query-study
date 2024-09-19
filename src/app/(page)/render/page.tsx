"use client";
import React, { useState } from "react";
import RenderComponent from "../../components/RenderComponent";

interface Props {}

function RenderPage(props: Props) {
  const {} = props;

  const [state, setState] = useState({
    startedAt: "2024-08-28",
    endedAt: "2024-12-31",
  });

  return (
    <div>
      {/* <RenderComponent startedAt={state.startedAt} endedAt={state.endedAt} /> */}
      <RenderComponent
        startedAt={state.startedAt}
        endedAt={state.endedAt}
        active
      />
    </div>
  );
}

export default RenderPage;
