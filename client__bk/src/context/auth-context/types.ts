export type AuthContextState = {
  authDetail: {token: string,userId: string;tokenExpiration:number};
  login: (requestBody:object) => void;
  register:(requestBody:object) => void;
  logout: (requestBody:object) => void;
};

export interface IAuth {
  token: string,
  userId: string;
  tokenExpiration:number
}