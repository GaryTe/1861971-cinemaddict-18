const getValuesToFilters = (temporaryDatas) => {
  const values1 = [];
  const values2 = [];
  const values3 = [];
  let filter = {};

  for (const temporaryValues of temporaryDatas) {
    const {userDetails} = temporaryValues;

    if (userDetails.watchlist === true) {
      values1.push (userDetails.watchlist);
    }
    if (userDetails.alreadyWatched === true) {
      values2.push (userDetails.alreadyWatched);
    }
    if (userDetails.favorite === true) {
      values3.push (userDetails.favorite);
    }
  }

  filter = {
    watchlist: values1.length,
    alreadyWatched: values2.length,
    favorite: values3.length
  };
  return filter;
};


export {getValuesToFilters};
