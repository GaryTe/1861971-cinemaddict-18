const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_TASK',
  ADD_MOVIE: 'ADD_TASK',
  DELETE_MOVIE: 'DELETE_TASK',
};

const SortType = {
  SORT_BY_DEFAULT: 'Sort by default',
  SORT_BY_DATE: 'Sort by date',
  SORT_BY_RETING: 'Sort by rating',
};


const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite'
};

export {UpdateType, UserAction, SortType, FilterType};
