export interface Filters {
  favorite: boolean;
  done: boolean;
  pending: boolean;
  setFavorite: (newState: boolean) => void;
  setPending: (newState: boolean) => void;
  setDone: (newState: boolean) => void;
}
