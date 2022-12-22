
import axios from 'axios';
import _ from 'lodash';

export const config = {
  baseUrl: 'https://api.openweathermap.org/',
  baseUrlIcon: 'http://openweathermap.org/img/wn/',
  baseFlag: 'https://openweathermap.org/images/flags/',
  appid: 'e3ac61c2fcc01c57f1b5b97dec6e65f9',
};
const Authorization = {};
export const STATUS_CODE = {
  OK: 200,
  NOT_FOUND: 404,
  NO_CONTENT: 204,
};

const fetchData = async (url, params={}, customHeaders={}) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  console.log(url);
  console.log(params);
  const response = await axios(url, {...params}, headers);
  console.log(response);

  return response;
};

const get = async (endpoint, params = {}, headers = {}) => {
  let queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  if (queryString.length > 0) {
    queryString = `?appid=${config.appid}&${queryString}`;
  }
  const url = `${config.baseUrl}${endpoint}${queryString}`;
  const fetchParams = {
    method: 'GET',
  };

  return fetchData(url, fetchParams, headers);
};

const post = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'POST',
    body: params,
  };
  return fetchData(url, fetchParams, headers);
};

const patch = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PATCH',
    body: params,
  };
  return fetchData(url, fetchParams, headers);
};

const put = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'PUT',
    body: params,
  };
  return fetchData(url, fetchParams, headers);
};

const remove = async (endpoint, params = {}, headers = {}) => {
  const url = `${config.baseUrl}${endpoint}`;
  const fetchParams = {
    method: 'DELETE',
    body: params,
  };
  return fetchData(url, fetchParams, headers);
};

export {get, post, put, patch, remove};
