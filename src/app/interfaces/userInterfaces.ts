export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserCredentials {
  id: string;
  name: string;
  email: string;
}

export interface UserState {
  name: string;
  email: string;
  password: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export interface Credentials {
  user: null | UserCredentials;
  setUser: (user: UserCredentials | null) => void;
}
