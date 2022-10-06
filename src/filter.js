import {FilterType} from './const';

const getValuesToFilters = (filterTypeKey,movies) => {

  const listsToWatch = [];
  const listsAlreadyWatched = [];
  const listsFavorite = [];


  switch (filterTypeKey) {
    case FilterType.WATCHLIST:
      for (const movie of movies) {
        const {userDetails} = movie;
        if (userDetails.watchlist) {
          listsToWatch.push (userDetails.watchlist);
        }
      }
      return listsToWatch;
    case FilterType.ALREADY_WATCHED:
      for (const movie of movies) {
        const {userDetails} = movie;
        if (userDetails.alreadyWatched) {
          listsAlreadyWatched.push (userDetails.alreadyWatched);
        }
      }
      return listsAlreadyWatched;
    case FilterType.FAVORITE:
      for (const movie of movies) {
        const {userDetails} = movie;
        if (userDetails.favorite) {
          listsFavorite.push (userDetails.favorite);
        }
      }
      return listsFavorite;
  }
};

export {getValuesToFilters};
