import dayjs from 'dayjs';
import {UpdateType, UserAction} from './const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const humanizeYear = (year) => dayjs (year).year ();
const humanizeHour = (hours) => dayjs (hours).format ('h');
const humanizeMinute = (minute) => dayjs (minute).format ('mm');
const humanizeDateMonthYear = (data) => dayjs (data).format ('DD MMMM YYYY');
const humanizeDateMonthYearHourMinute = (data) => dayjs (data).format ('YYYY/MM/DD HH:mm');


const sortByDate = (movies) => {
  const sortMovies = byDate (movies);
  return sortMovies.reverse ();
};

function byDate (movies) {
  const sortMovies = movies.slice ();
  sortMovies.sort ((a,b) => {
    if (humanizeYear (a.filmInfo.release.date) < humanizeYear (b.filmInfo.release.date)) {
      return -1;
    }
  });
  return sortMovies;
}

const sortByRating = (movies) => {
  const sortMovies = byRating (movies);
  return sortMovies.reverse ();
};

function byRating (movies) {
  const sortMovies = movies.slice ();
  sortMovies.sort ((a,b) => {
    if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
      return -1;
    }
  });
  return sortMovies;
}


function sortDataByKey (filterNames, movies) {
  const sortMovies = [];
  if (filterNames === 'all') {
    return movies;
  }
  for (const movie of movies) {
    const {userDetails} = movie;
    if (userDetails[filterNames] === true) {
      sortMovies.push (movie);
    }
  }
  return sortMovies;
}


function gettingValues (keyValue) {
  const value = {
    userAction: UserAction.UPDATE_TASK,
    updateType: UpdateType.PATCH,
    key: keyValue
  };
  if (keyValue !== 'all') {
    value.userAction = UserAction.DELETE_TASK;
    value.updateType = UpdateType.MINOR;
  }
  return value;
}


export {getRandomInteger, humanizeYear, humanizeHour, humanizeMinute, humanizeDateMonthYear,
  humanizeDateMonthYearHourMinute, sortByDate, sortByRating, sortDataByKey, gettingValues};
