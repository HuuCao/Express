const path = require('path');

module.exports = {
  APP_URL: 'http://jan.safecargo.vn',
  LOG_FOLDER: path.join(__dirname, "/../", "logs"),
  LOCALES_FOLDER: path.join(__dirname, "locales"),
  API_ADD_NEW_TAG: 'http://apisearch.safecargo.com.vn/add_entry',
  API_UPDATE_TAG: 'http://apisearch.safecargo.com.vn/update_entry',
  API_TAG_COUNT: 'http://apisearch.safecargo.com.vn/count',
  API_GET_ALL_TAG: 'http://apisearch.safecargo.com.vn/get_records',
  API_AUTO_TAG: 'http://apisearch.safecargo.com.vn/tag',
  API_DELETE_ENTRY: 'http://apisearch.safecargo.com.vn/delete_entry',
  API_SEARCH: 'http://searcher.safecargo.com.vn/v2/search',
  API_SEARCH_ONLINE: 'http://searcher.safecargo.com.vn/v3',
  API_GET_RESULT_SEARCH_ONLINE: 'http://searcher.safecargo.com.vn/v3/results',
  API_WORD_SEGMENT: 'http://corenlp.safecargo.com.vn/ws',
  TRANSLATE_API_ENDPOINT: 'http://pybadev.safecargo.com.vn/client/inv/trans',
}