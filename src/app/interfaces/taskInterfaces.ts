export interface Tasks {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface TaskState {
  tasks: Tasks[];
  favorites: string[];
  checked: string[];
  description: string;
  title: string;
  setFavorites: (favorites: string[] | undefined) => void;
  setChecked: (checked: string[] | undefined) => void;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  getTasks: (userId: string | undefined) => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  deleteFavorites: (id: string) => Promise<void>;
  addChecked: (id: string) => Promise<void>;
  deleteChecked: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
