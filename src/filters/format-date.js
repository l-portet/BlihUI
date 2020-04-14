import { format } from 'date-fns';

export default function(date) {
  if (!date) return '';
  date = new Date(date * 1000);

  return format(date, 'dd/MM/yyyy HH:mm');
}
