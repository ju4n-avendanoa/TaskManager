export interface Tasks {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  favorite: boolean;
  done: boolean;
}

export interface TaskState {
  tasks: Tasks[];
  favorites: Tasks[];
  checked: string[];
  description: string;
  title: string;
  sort: boolean;
  setSort: () => void;
  setTasks: (tasks: Tasks[] | undefined) => void;
  setFavorites: (favorites: Tasks[] | undefined) => void;
  setChecked: (checked: string[] | undefined) => void;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  getTasks: (userId: string | undefined) => Promise<Tasks[]>;
  addFavorite: (task: Tasks) => Promise<void>;
  deleteFavorites: (task: Tasks) => Promise<void>;
  addChecked: (id: string) => Promise<void>;
  deleteChecked: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
