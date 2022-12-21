// eslint-disable-next-line import/prefer-default-export

import moment from 'moment';

moment().locale('id');
import _ from 'lodash';
import {REGEX} from '../constants';
import {COLOR_RED} from '../constants/color';

export const isEmpty = value => {
  return value === null || value === undefined || String(value).trim() === '';
};

export const getNumberOnly = (string = '') => string.replace(/[^\d]+/g, '');

export const convertToNumber = (string = '') => {
  const numberString = getNumberOnly(string);
  return isEmpty(numberString) ? 0 : parseFloat(numberString);
};

export const formatRupiah = (number, akhiran = 'Rp') => {
  try {
    const num = Number(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$&.');

    return `${akhiran} ${num}`;
  } catch (error) {
    return number;
  }
};

export const formatPhoneNumber = numberPhone => {
  const number = String(numberPhone).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
  return number;
};

/**
 * Get text and space only
 * for example: "walter @#$@$ngo#%#@" => "walter ngo"
 * @param str
 * @return {string}
 */
export const getTextAndSpaceOnly = (str = '') =>
  str.replace(/[^A-Za-z\s]/g, '');

export const formatNumberWithDot = (string = '') => {
  let number = getNumberOnly(string.toString());
  if (_.isEmpty(number)) number = 0;
  return parseFloat(number)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

export const noop = () => {};

export const getFirstName = string => _.split(string, ' ', 1)[0];

/**
 * Get last characters
 * @param {String} value
 * @param {Number} numberOfCharacters
 * @return {string}
 */
export const getFirstCharacters = (value = '', numberOfCharacters = 0) => {
  if (value.length > numberOfCharacters) {
    return value.slice(0, numberOfCharacters);
  }
  return value;
};

/**
 * Get last characters
 * @param {String} value
 * @param {Number} numberOfCharacters
 * @return {string}
 */
export const getLastCharacters = (value = '', numberOfCharacters = 0) => {
  if (value.length > numberOfCharacters) {
    return value.slice(-numberOfCharacters);
  }
  return value;
};

export const parseDatetimeToText = tglku => {
  try {
    if (tglku) {
      var tgl = `${tglku}`;
      var bulan = [
        '',
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ];
      var spl = tgl.split(' ');
      var tanggal = spl[0].split('-');
      return (
        tanggal[2] +
        ' ' +
        bulan[Number(tanggal[1])] +
        ' ' +
        tanggal[0] +
        ' ' +
        spl[1]
      );
    } else {
      return tglku;
    }
  } catch (error) {
    return tglku;
  }
};
const formatDate = 'YYYY-MM-DD';
const today = moment().format(formatDate);
const yesterday = moment().subtract(1, 'days').format(formatDate);
const monthBefore = moment().subtract(1, 'month');
export const yearBefore = moment().subtract(1, 'year');
export const period = (onlyYear = false) => {
  const format = {options: []};
  const last7days = `${moment()
    .subtract(6, 'days')
    .format(formatDate)}~${today}`;
  const last30days = `${moment()
    .subtract(29, 'days')
    .format(formatDate)}~${today}`;
  const thisMonth = `${moment().startOf('month').format(formatDate)}~${moment()
    .endOf('month')
    .format(formatDate)}`;
  const lastMonth = `${monthBefore
    .startOf('month')
    .format(formatDate)}~${monthBefore.endOf('month').format(formatDate)}`;

  const thisYear = `${moment().startOf('year').format(formatDate)}~${moment()
    .endOf('year')
    .format(formatDate)}`;
  const lastYear = `${yearBefore
    .startOf('year')
    .format(formatDate)}~${yearBefore.endOf('year').format(formatDate)}`;
  if (onlyYear) {
    format.options.push({
      name: 'This Year',
      id: thisYear,
      checked: true,
    }); //this month
    format.options.push({
      name: 'Last Year',
      id: lastYear,
      checked: false,
    }); //last month

    return format.options;
  }
  format.options.push({
    name: 'Today',
    id: `${today}~${today}`,
    checked: false,
  });
  format.options.push({
    name: 'Yesterday',
    id: `${yesterday}~${yesterday}`,
    checked: false,
  });

  format.options.push({name: 'Last 7 Days', id: last7days, checked: false}); //last 7 days
  format.options.push({name: 'Last 30 Days', id: last30days, checked: false}); //last 30 days
  format.options.push({name: 'This Month', id: thisMonth, checked: false}); //this month
  format.options.push({name: 'Last Month', id: lastMonth, checked: false}); //last month

  return format.options;
};
export const formatFields = (
  filters,
  label,
  name,
  type = '',
  selector = {name: 'name', value: 'name'},
  disabled = false,
) => {
  const format = {label, name, type, options: [], disabled};
  console.log(filters);
  for (let i = 0; i < filters.length; i++) {
    console.log(filters[i][selector.name]);
    format.options.push({
      name: filters[i][selector.name] || filters[i]['type'],
      id: filters[i][selector.value] || filters[i]['type'],
      checked: false,
    });
  }
  console.log(format.options);
  return format.options;
};
export const getAliasProduct = product => {
  switch (product.toLowerCase().split(' ').join('')) {
    case 'pertaminadex':
      return 'DEX';
    case 'biosolar':
      return 'BS';
    case 'dexlite':
      return 'DL';
    case 'dex':
      return 'DEX';
    case 'premium':
      return 'P';
    case 'pertalite':
      return 'PL';
    case 'pertamax':
      return 'PX';
    case 'pertalitekhusus':
      return 'PLK';
    case 'pertamaxturbo':
      return 'PXT';
    default:
      return product;
  }
};

export const getColorProduct = productName => {
  switch (productName.replace('_', ' ').split(' ').join('').toLowerCase()) {
    case 'premium':
      return '#fde918';
    case 'pertalite':
      return '#46b100';
    case 'pertalitekhusus':
      return '#46b100';
    case 'pertamax':
      return '#3C6DB2';
    case 'pertamaxturbo':
      return '#e00228';
    case 'pertaminadex':
      return '#23582f';
    case 'dexlite':
      return '#358600';
    case 'biosolar':
      return '#6D6D6E';
    case 'total':
      return '#b7b7b7';
    default:
      return COLOR_RED;
  }
};

export const getColorPayment = paymentName => {
  switch (paymentName.split(' ').join('').toLowerCase()) {
    case 'bri':
      return '#d1a35b';
    case 'subscriber':
      return '#ad6ea4';
    case 'mandiri':
      return '#60b1f2';
    case 'mypertamina':
      return '#216cc2';
    case 'qris':
      return '#717da1';
    case 'emoney':
      return '#b44e61';
    case 'flazz':
      return '#d1a35b';
    case 'voucher':
      return '#f097a9';
    case 'bca':
      return '#3b6fea';
    case 'bni':
      return '#808080';
    case 'linkaja':
      return '#db2222';
    case 'customercard':
      return '#b2d38b';
    case 'btn':
      return '#8ca4bc';
    case 'cash':
      return '#f1c40f';
    default:
      return COLOR_RED;
  }
};

export function formatTanggal(tgl) {
  try {
    var explode = tgl.split('-');
    var thn = explode[2];
    var bln = explode[1];
    var hari = explode[0];
    var listbulan = [
      '',
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    var harinya = thn + ' ' + listbulan[parseInt(bln)] + ' ' + hari;
    return harinya;
  } catch (error) {
    return tgl;
  }
}
/**
 * Validate a string is an email or not
 * @param email
 * @return {boolean}
 */
export const isEmail = email =>
  /* eslint-disable no-useless-escape */
  REGEX.regExToCheckEmail.test(String(email).toLowerCase());

/**
 * Return empty function
 */

/**
 * Convert String To Title Case <-- like this comment
 */
export const toTitleCase = (str = '') =>
  str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

/**
 * to find item in collections by id
 * @param {Array} collections - format: [{ name, id }]
 * @param id
 * @return {string}
 */
export const findNameById = (collections, id) => {
  const foundItem = collections.find(item => item.id === id);
  return foundItem ? foundItem.name : '';
};

export const allTitleCase = str => {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

export const checkSpecialCharacter = (str = '') =>
  str.match(/[^A-Za-z0-9_\s]/gi) !== null;

export const transformText = (
  value,
  params = {numberOnly: false, textAndSpaceOnly: false},
) => {
  if (params.numberOnly) return getNumberOnly(value);
  else if (params.textAndSpaceOnly) return getTextAndSpaceOnly(value);
  return value;
};

/**
 * Verifying provided fields named -> "fieldsChecker"
 * Provided excluding mandatory fields will not be checked
 * Defining types inside the typesDefines constant,
 * if type is not supported will return default as false <- marked as an Invalid
 * @param {Object} fields - format: Object<Name: {value, type}>
 * @param {Array} excludingNotMandatoryFields - format: [string]
 * return Valid = Boolean
 */
export const typesDefine = {
  date: date => _.words(date, /[^\/]\d+/g).length >= 3,
  text: text => text.length > 0,
  number: number => _.isNumber(number) && _.parseInt(number) > 0,
  default: () => false,
};

export const checkFieldHasValue = ({value, type}) =>
  (!!typesDefine[type] && typesDefine[type](value)) || typesDefine.default();

export const ignoreAnyInvalidFields = (fields = []) =>
  !(_.indexOf(fields, false) >= 0);

export const fieldsChecker = (
  fields = {},
  excludingNotMandatoryFields = [],
) => {
  const fieldsList = Object.keys(fields);
  const mandatoryFields = _.pullAllWith(
    fieldsList,
    excludingNotMandatoryFields,
    _.isEqual,
  );
  return mandatoryFields;
};

export const fixedDecimal = (number, point = 2) => {
  try {
    const result = parseFloat(number).toFixed(point);
    if (isNaN(result) || result === '0.00' || result === 0) {
      return '-';
    }
    return result;
  } catch (error) {
    return error;
  }
};
