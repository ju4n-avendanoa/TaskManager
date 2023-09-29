export interface Tasks {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface TaskState {
  tasks: Tasks[];
  favorites: number[];
  description: string;
  title: string;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  getTasks: (userId: string) => Promise<void>;
  addFavorite: (id: number) => void;
  deleteFavorites: (id: number) => void;
  deleteTask: (id: number) => void;
}
