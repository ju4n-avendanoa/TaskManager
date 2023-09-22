export interface Tasks {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface TaskState {
  tasks: Tasks[];
  favorites: number[];
  description: string;
  title: string;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  getTasks: () => Promise<void>;
  addFavorite: (id: number) => void;
  deleteFavorites: (id: number) => void;
  deleteTask: (id: number) => void;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  password: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}
