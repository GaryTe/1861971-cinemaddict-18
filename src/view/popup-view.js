import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDateMonthYear, humanizeHour, humanizeMinute, getRandomInteger } from '../utils.js';

const createPopup = (data) => {
  const {index, filmInfo, comments} = data;

  const getGenre = () => {
    const datas = filmInfo.genre.slice (0,getRandomInteger (0, 2));
    datas.unshift (filmInfo.genre[index]);

    return datas;
  };

  const genres = getGenre();

  return (`<section class="film-details">
<div class="film-details__inner">
  <div class="film-details__top-container">
    <div class="film-details__close">
      <button class="film-details__close-btn" type="button">close</button>
    </div>
    <div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

        <p class="film-details__age">${filmInfo.ageRating}</p>
      </div>

      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${filmInfo.title}</h3>
            <p class="film-details__title-original">Original: ${filmInfo.title}</p>
          </div>

          <div class="film-details__rating">
            <p class="film-details__total-rating">${filmInfo.totalRating}</p>
          </div>
        </div>

        <table class="film-details__table">
          <tr class="film-details__row">
            <td class="film-details__term">Director</td>
            <td class="film-details__cell">${filmInfo.director}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Writers</td>
            <td class="film-details__cell">${filmInfo.writers}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Actors</td>
            <td class="film-details__cell">${filmInfo.actors}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Release Date</td>
            <td class="film-details__cell">${humanizeDateMonthYear (filmInfo.release.date)}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Runtime</td>
            <td class="film-details__cell">${`${humanizeHour (filmInfo.release.date)}h ${humanizeMinute (filmInfo.release.date)}m`}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">Country</td>
            <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
          </tr>
          <tr class="film-details__row">
            <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              <span class="film-details__genre">${genres [0]}</span>
              ${genres [1] !== undefined ? `<span class="film-details__genre">${genres [1]}</span>` : '<span class="film-details__genre"></span>'}
              ${genres [2] !== undefined ? `<span class="film-details__genre">${genres [2]}</span>` : '<span class="film-details__genre"></span>'}
              </td>
          </tr>
        </table>

        <p class="film-details__film-description">
          ${filmInfo.description}
        </p>
      </div>
    </div>

    <section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
    </section>
  </div>

  <div class="film-details__bottom-container">
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

      <ul class="film-details__comments-list">
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">Interesting setting and a good cast</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">Tim Macoveev</span>
              <span class="film-details__comment-day">2019/12/31 23:59</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
          </span>
          <div>
            <p class="film-details__comment-text">Booooooooooring</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">2 days ago</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
          </span>
          <div>
            <p class="film-details__comment-text">Very very old. Meh</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">2 days ago</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
        <li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
          </span>
          <div>
            <p class="film-details__comment-text">Almost two hours? Seriously?</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">John Doe</span>
              <span class="film-details__comment-day">Today</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>
      </ul>

      <form class="film-details__new-comment" action="" method="get">
        <div class="film-details__add-emoji-label"></div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
        </label>

        <div class="film-details__emoji-list">
          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
          <label class="film-details__emoji-label" for="emoji-smile">
            <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
          <label class="film-details__emoji-label" for="emoji-sleeping">
            <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
          <label class="film-details__emoji-label" for="emoji-puke">
            <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
          </label>

          <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
          <label class="film-details__emoji-label" for="emoji-angry">
            <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
          </label>
        </div>
      </form>
    </section>
  </div>
</div>
</section>`);
};

export default class PopupView extends AbstractView {
  #data = {};

  constructor (data) {
    super ();
    this.#data = data;
  }

  get template() {
    return createPopup(this.#data);
  }


  setClickHandler (callback) {
    this._callback.click = callback;
    this.element.querySelector ('.film-details__close-btn').addEventListener ('click', this.#click);
  }


  #click = () => {
    this._callback.click ();
  };
}
