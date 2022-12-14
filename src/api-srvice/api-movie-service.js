import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiMovieService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updatedFilm = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer (movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };


  #adaptToServer = (movie) => {

    const adaptedMovie = {...movie,
      'film_info': {
        ...movie.filmInfo,
        'age_rating': movie.filmInfo.ageRating ,
        'alternative_title': movie.filmInfo.alternativeTitle,
        'release':{
          ...movie.filmInfo.release,
          'release_country': movie.filmInfo.release.releaseCountry
        },
        'total_rating': movie.filmInfo.totalRating,
      },
      'user_details':{
        ...movie.userDetails,
        'already_watched': movie.userDetails.alreadyWatched,
        'watching_date': movie.userDetails.watchingDate
      }
    };

    delete adaptedMovie ['film_info'].ageRating;
    delete adaptedMovie ['film_info'].alternativeTitle;
    delete adaptedMovie ['film_info'] ['release'].releaseCountry;
    delete adaptedMovie ['film_info'].totalRating;
    delete adaptedMovie ['user_details'].alreadyWatched;
    delete adaptedMovie ['user_details'].watchingDate;
    delete adaptedMovie.userDetails;
    delete adaptedMovie.filmInfo;

    return adaptedMovie;
  };
}
