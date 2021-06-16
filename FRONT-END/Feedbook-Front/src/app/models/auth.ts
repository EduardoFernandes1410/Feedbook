export interface Credentials {
  email: string;
  password: string;
}

export interface UserNotRegistered {
  email: string;
  name: string;
  picture: string;
  userIdGoogle?: string;
  userIdFace?: string;
}

export interface UserData {
  client: User;
  token: string;
}

export interface UserInfo {
  email: string;
  name: string;
  password?: string;
  picture: string;
  pictureServerPath: string;
  document: string;
  cellphone: string;
  userIdFace?: string;
  userIdGoogle?: string;
}

export interface AccountType {
  code: string;
  description: string;
  id: number;
}

export interface Address {
  id: string;
  cep: string;
  publicPlace?: any;
  street: string;
  observation: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;

  stopId?: number;
}

export interface UserToRegister {
  name: string;
  email: string;
  password: string;
  cellphone: string;
}

export interface FacebookRes {
  authResponse: {
    accessToken: string;
    expiresIn: string;
    session_key: true,
    sig: string;
    userID: string;
  };
  status: string;
}

export interface GoogleRes {
  accessToken: string;
  displayName: string;
  email: string;
  expires: number;
  expires_in: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
  userId: string;
}

export interface LoggedUser {
  token: string;
  student: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  document?: any;
  pmNumber?: any;
  picture?: any;
  phone: string;
  createdAt: string;
  pictureServerPath?: any;
}
