import { useQuery } from "@tanstack/react-query";
import { Employee } from "./type";
import { queryKeys } from "@/api/key-factory";

const getEmployeesFn = async () => {
  const baseURL = "https://dummy.restapiexample.com/api/v1/employees";
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const users: Employee[] = await response.json();
  return users;
};

const getEmployees = () => {
  return useQuery(queryKeys.employee.list());
};

export { getEmployeesFn, getEmployees };
