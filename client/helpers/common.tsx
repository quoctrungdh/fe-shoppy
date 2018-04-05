
/*global window:false*/
import { DATE_TIME_LOCALE } from './constants';
import moment from 'moment';
import * as _ from 'lodash';

/** DECLARATIONS */
export {
  formatDateByString,
  formatDate,
  isSameOrBefore,
  sortCollection
};


/** DEFINITIONS */
function formatDateByString(param: any, locate = DATE_TIME_LOCALE.asia, format = DATE_TIME_LOCALE.asia) {
  return moment(param, format).format(locate);
}

function formatDate(param: any, locate = DATE_TIME_LOCALE.asia) {
  return moment(param).format(locate);
}

function isSameOrBefore(date: any, type: string = 'month') {
  const momentDate = moment(date);
  return momentDate.isValid() && (moment().diff(date, type) > 0);
}

interface SortObject {
  array: any[],
  fields: string[]
}
function sortCollection(param: SortObject) {
  return _.sortBy(param.array, param.fields);
}
