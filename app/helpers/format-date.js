import { helper as buildHelper } from '@ember/component/helper';
import moment from 'moment';

export function formatDate([date, format]) {

  let momentDate = moment(date);

  if (!date || !momentDate.isValid()) {
    return;
  }

  if (typeof format === 'string') {
    if (format === 'short') {
      return momentDate.format('MM/DD/YYYY');
    }
    return momentDate.format(format);
  }
  return momentDate.format('MMM D, YYYY, h:mm a');

}

export default buildHelper(formatDate);
