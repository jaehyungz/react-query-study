"use client";

import React, { useEffect } from "react";

interface Props {}

function Error(props: any) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => props.reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

export default Error;
