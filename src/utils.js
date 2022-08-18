import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeYear = (year) => dayjs (year).year ();
const humanizeHour = (hours) => dayjs (hours).format ('h');
const humanizeMinute = (minute) => dayjs (minute).format ('mm');

const humanizeDateMonthYear = (data) => dayjs (data).format ('DD MMMM YYYY');

export {getRandomInteger, humanizeYear, humanizeHour, humanizeMinute, humanizeDateMonthYear};
