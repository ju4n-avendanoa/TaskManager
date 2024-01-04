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
  checked: Tasks[];
  pendings: Tasks[];
  description: string;
  title: string;
  sort: boolean;
  setSort: () => void;
  setFavorites: (favorites: Tasks[] | undefined) => void;
  setChecked: (checked: Tasks[] | undefined) => void;
  setDescription: (description: string) => void;
  setTitle: (title: string) => void;
  getTasks: (userId: string | undefined) => Promise<Tasks[]>;
  addFavorite: (task: Tasks) => Promise<void>;
  deleteFavorites: (task: Tasks) => Promise<void>;
  addChecked: (task: Tasks) => Promise<void>;
  deleteChecked: (task: Tasks) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
