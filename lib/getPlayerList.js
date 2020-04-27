const REQUEST_URL = require("../config/config").REQUEST_URL;
const axios = require("axios");

/**
 * @return {Promise<Object>}
 */
module.exports = () => {
  return axios.get(REQUEST_URL)
};