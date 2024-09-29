import * as moment from "moment-timezone";

export const formatDate = (dateString: string) => {
  return moment.tz(dateString, '84').format('DD/MM/YYYY');
};

export const formatTime = (dateString: string) => {
  return moment.tz(dateString, '84').format('HH:mm:ss');
};