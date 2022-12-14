import ApiService from '../framework/api-service.js';

const Method = {
  DELETE: 'DELETE',
  POST: 'POST'
};

export default class ApiCommentsService extends ApiService {
  getComments = (movie) => this._load({url: `comments/${movie.id}`})
    .then (ApiService.parseResponse);


  deleteComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  };


  addComment = async (comment) => {
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer (comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };


  #adaptToServer = (movie) => {

    const adaptedMovie = {...movie,
      'comment': movie.description,
      'emotion': movie.emoji,
    };

    delete adaptedMovie.id;
    delete adaptedMovie.description;
    delete adaptedMovie.emoji;

    return adaptedMovie;
  };
}
