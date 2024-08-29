import React from "react";
import { json } from "stream/consumers";

interface Props {
  params: {
    id: string;
  };
}

function Page(props: Props) {
  const {
    params: { id },
  } = props;

  const encodedURI = encodeURIComponent(id);
  console.log(encodedURI);

  return <div>{encodedURI}</div>;
}

export default Page;
