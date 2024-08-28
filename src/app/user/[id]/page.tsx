import React from "react";
import UserDetail from "../../components/UserDetail/UserDetail";

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  return {
    title: `유저${params.id}`,
  };
};

function Page(props: Props) {
  const {
    params: { id },
  } = props;

  return (
    <div>
      <UserDetail id={id} />
    </div>
  );
}

export default Page;
