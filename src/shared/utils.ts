import * as MomentImport from 'moment';
import { DateRange, extendMoment } from 'moment-range';
import { Psychologist } from '../routes/Psychologists/Psychologist';
import { Timeslot } from './types';

export const moment = extendMoment(MomentImport);

export const getTimeslotString = (
  startDateTime: Timeslot['startDateTime'],
  endDateTime: Timeslot['endDateTime'],
  format: string = 'MMMM Do YYYY HH:mm'
) => {
  return `${moment(startDateTime).format(format)} - ${moment(
    endDateTime
  ).format('HH:mm')}`;
};

export const getTimeslotTime = (
  startDateTime: MomentImport.Moment,
  endDateTime: MomentImport.Moment
) => {
  return `${startDateTime.format('HH:mm')}-${endDateTime.format('HH:mm')}`;
};

export const getTimeslotsInADay = (
  startTime: MomentImport.Moment = roundUpToHalfHour(moment()),
  endTime: MomentImport.Moment = moment().add(1, 'day').startOf('day'),
  interval: number = 30
) => {
  var timeslots = [];

  while (!startTime?.isAfter(endTime)) {
    timeslots.push(startTime.format('HH:mm'));
    startTime.add(interval, 'minutes');
  }

  return timeslots;
};

export const getTimeslotsFromRange = (
  range: DateRange,
  psychologistId: Psychologist['id'],
  intervalUnit: MomentImport.unitOfTime.Diff = 'minutes',
  interval: number = 30
): Timeslot[] => {
  const intervals = Array.from(
    range.by(intervalUnit, { step: interval, excludeEnd: true })
  );

  return intervals.map((moment) => ({
    psychologistId: psychologistId,
    clientId: '',
    startDateTime: moment.toString(),
    endDateTime: moment.add(30, 'minutes').toString(),
  }));
};

export const roundUpToHalfHour = (
  date: MomentImport.Moment
): MomentImport.Moment => {
  let newDate = date;
  const minute = date.minute();

  if (minute < 30) {
    newDate = date.startOf('hour');
  } else if (minute > 30) {
    newDate = date.add(1, 'hour').startOf('hour');
  }

  return newDate;
};

export const findFreeTimeslotsOnDate = (
  timeslots: Timeslot[],
  date: MomentImport.Moment
): Timeslot[] =>
  timeslots.filter((timeslot: Timeslot) => {
    if (
      timeslot.clientId === '' &&
      moment(timeslot.startDateTime).isSame(date, 'date')
    )
      return timeslot;
  });
