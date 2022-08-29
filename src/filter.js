const getValuesToFilters = (movies) => {
  const listToWatch = [];
  const listAlreadyWatched = [];
  const listFavorite = [];
  let filter = {};

  for (const movie of movies) {
    const {userDetails} = movie;

    if (userDetails.watchlist === true) {
      listToWatch.push (userDetails.watchlist);
    }
    if (userDetails.alreadyWatched === true) {
      listAlreadyWatched.push (userDetails.alreadyWatched);
    }
    if (userDetails.favorite === true) {
      listFavorite.push (userDetails.favorite);
    }
  }

  filter = {
    watchlist: listToWatch.length,
    alreadyWatched: listAlreadyWatched.length,
    favorite: listFavorite.length
  };
  return filter;
};


export {getValuesToFilters};
