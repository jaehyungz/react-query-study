import React from "react";
import EmployeeList from "../components/EmployeeList";

interface Props {}

function Page(props: Props) {
  const {} = props;

  return (
    <div>
      <EmployeeList />
    </div>
  );
}

export default Page;
