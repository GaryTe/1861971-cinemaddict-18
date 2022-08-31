const getValuesToFilters = (movies) => {
  const listsToWatch = [];
  const listsAlreadyWatched = [];
  const listsFavorite = [];
  let filter = {};

  for (const movie of movies) {
    const {userDetails} = movie;

    if (userDetails.watchlist === true) {
      listsToWatch.push (userDetails.watchlist);
    }
    if (userDetails.alreadyWatched === true) {
      listsAlreadyWatched.push (userDetails.alreadyWatched);
    }
    if (userDetails.favorite === true) {
      listsFavorite.push (userDetails.favorite);
    }
  }

  filter = {
    watchlist: listsToWatch.length,
    alreadyWatched: listsAlreadyWatched.length,
    favorite: listsFavorite.length
  };
  return filter;
};


export {getValuesToFilters};
