import { getRandomInteger } from './utils';

const date = [
  '1984-05-11T00:45:00.000Z',
  '1936-05-11T00:16:00.000Z',
  '1933-05-11T00:54:00.000Z',
  '1964-05-11T01:21:00.000Z',
  '1929-05-11T01:55:00.000Z',
  '1980-05-11T01:45:00.000Z',
  '1955-05-11T01:59:00.000Z',
];

const ratings = [
  1.2,
  2.5,
  3.0,
  4.7,
  5.2,
  6.9,
  7.1
];

const descriptions = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];

const titles = [
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus conquers the Martians',
  'The Dance of Life.',
  'The Great-Flamarion',
  'The man with the Golden Arm'
];

const generateImageAddress = () => {
  const index = getRandomInteger(0, descriptions.length - 1);

  return index;
};

const generateComment = () => {
  const comments = [];
  const comment = {
    'id': '42',
    'author': 'Ilya O\'Reilly',
    'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    'date': '2019-05-11T16:12:32.554Z',
    'emotion': 'smile'
  };

  for (let i = 0; i <= getRandomInteger(0, 20); i++) {
    comments.push (comment);
  }
  return comments;
};

const getData = () => {
  const numberId = generateImageAddress ();

  return {
    'index': numberId,
    'id': '0',
    'comments': generateComment (),
    'filmInfo': {
      'poster': descriptions [numberId],
      'alternativeTitle': 'Laziness Who Sold Themselves',
      'totalRating':ratings [numberId],
      'title': titles [numberId],
      'ageRating': 18,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': date [numberId],
        'releaseCountry': 'Finland'
      },
      'runtime': 77,
      'genre': [
        'Drama',
        'Cartoon',
        'Western',
        'Comedy',
        'Musical',
        'Adventure',
        'Drama'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
    },
    'userDetails': {
      'watchlist': Boolean (getRandomInteger(0, 1)),
      'alreadyWatched': Boolean (getRandomInteger(0, 1)),
      'watchingDate': '2019-04-12T16:12:32.554Z',
      'favorite': Boolean (getRandomInteger(0, 1))
    }
  };
};

export {getData};
