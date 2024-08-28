"use client";
import { getEmployees } from "@/api/queries/employee";
import React from "react";

interface Props {}

function EmployeeList(props: Props) {
  const {} = props;
  const { data } = getEmployees();
  return <div></div>;
}

export default EmployeeList;
