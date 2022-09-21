import AbstractView from '../framework/view/abstract-view.js';

const createUserName = (count) =>{

  function addRank () {
    if (count === 1 || count <= 10) {
      return 'Novice';
    }
    if (count === 11 || count <= 20) {
      return 'Fan';
    }
    if (count === 21) {
      return 'Movie buff';
    }
    return '';
  }

  return`<section class="header__profile profile">
<p class="profile__rating">${addRank ()}</p>
<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class UserNameView extends AbstractView {
  #count = 0;

  constructor (count) {
    super();
    this.#count = count;
  }

  get template() {
    return createUserName(this.#count);
  }
}
