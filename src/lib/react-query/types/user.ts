type useGetUsersResponse = {
  limit: number;
  skip: number;
  total: number;
  users: {
    email: string;
    eyeColor: string;
    firstName: string;
    gender: string;
    id: number;
    image: string;
  }[];
};

type useGetUserResponse = {
  email: string;
  eyeColor: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  role: number;
};

type useCreateUserResponse = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

type useCreateUserVariables = {
  firstName: string;
  lastName: string;
  age: number;
};

export type {
  useGetUsersResponse,
  useGetUserResponse,
  useCreateUserResponse,
  useCreateUserVariables,
};
