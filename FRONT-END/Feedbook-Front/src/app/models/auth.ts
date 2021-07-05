export interface Credentials {
  email: string;
  password: string;
}
export interface UserData {
  user: User;
  token: string;
}
export interface User {
  name: string;
  surname: string;
  email: string;
  id: number;
}

export interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
}
