type useCreateAccesstokenReponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};

type useCreateAccesstokenVariables = {
  username: string;
  password: string;
};

type useGetUserInfoReponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export type {
  useCreateAccesstokenReponse,
  useCreateAccesstokenVariables,
  useGetUserInfoReponse,
};
