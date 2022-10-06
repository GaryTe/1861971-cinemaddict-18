import dayjs from 'dayjs';
import {FilterType} from './const';


const humanizeYear = (year) => dayjs (year).year ();
const humanizeHour = (hours) => dayjs (hours).format ('h');
const humanizeMinute = (minute) => dayjs (minute).format ('mm');
const humanizeDateMonthYear = (data) => dayjs (data).format ('DD MMMM YYYY');
const humanizeDateMonthYearHourMinute = (data) => dayjs (data).format ('YYYY/MM/DD HH:mm');


const sortByDate = (movies) => movies.slice ().sort ((a,b) => {
  if (humanizeYear (a.filmInfo.release.date) < humanizeYear (b.filmInfo.release.date)) {
    return -1;
  }
  if (humanizeYear (a.filmInfo.release.date) > humanizeYear (b.filmInfo.release.date)) {
    return 1;
  }
  return 0;
}).reverse ();


const sortByRating = (movies) => movies.slice ().sort ((a,b) => {
  if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
    return -1;
  }
  if (a.filmInfo.totalRating < b.filmInfo.totalRating) {
    return 1;
  }
  return 0;
}).reverse ();


const sortDataByKey = (filterNames, movies) => {
  if (filterNames === FilterType.ALL) {
    return movies;
  }
  return movies.filter ((movie) => movie.userDetails [filterNames]);
};


export {humanizeYear, humanizeHour, humanizeMinute, humanizeDateMonthYear,
  humanizeDateMonthYearHourMinute, sortByDate, sortByRating, sortDataByKey};
