import { helper } from '@ember/component/helper';
import numeral from 'numeral';

export function formatMoney([number], hash) {
  let maxDigits = hash && hash['maxDigits'] || 8;
  let greaterThanMax = Math.round(number).toString().length > maxDigits;
  let format = '($0,0.00)';

  if (greaterThanMax) {
    format = '($0.00a)';
    if (hash && hash['format'] === "shortMillion") {
      format = "($0.0a)";
    }
  }

  if (number === undefined || isNaN(number) || !isFinite(number)) {
    number = 0;
  }

  let result = numeral(number).format(format);
  result = result.toUpperCase();
  return result;
}

export default helper(formatMoney);
