"use client";
import React, { useEffect, useRef, useState } from "react";

import "./style.css";
interface Props {}

function Page(props: Props) {
  const {} = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  return (
    <>
      <div
        className="scroll"
        style={{
          backgroundColor: "#4caf50",
          width: `${scrollPercent}%`,
          transition: "width 0.2s ease-out",
        }}
      />
      <div className="ct" ref={ref}>
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
    </>
  );
}

export default Page;
