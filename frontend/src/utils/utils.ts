import * as moment from "moment-timezone";

export const formatDate = (dateString: string) => {
  return moment.tz(dateString, "America/Bogota").format('DD/MM/YYYY');
};

export const formatTime = (dateString: string) => {
  return moment.tz(dateString, "America/Bogota").format('HH:mm:ss');
};

export const translation = (type: string) => {
  return type == 'recharge' ? "recarga" : "pago";
};