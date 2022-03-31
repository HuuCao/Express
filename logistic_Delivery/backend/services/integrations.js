const request = require('request');
const EventEmiter = require('libs/EventEmiter');
const { MATCH_EVENT_INTEGRATION } = require('configs')

module.exports = ({ path, method, headers, body, formData }) => new Promise((resolve, reject) => {
  const config = {
    uri: (process.env.INTEGRATION_URL || 'http://searcher.safecargo.com.vn/v2') + path,
    method,
    headers: {
      'Content-type': 'application/json',
      ...headers
    }
  };
  if (body) {
    config.body = JSON.stringify(body)
  }
  if (formData) {
    config.formData = formData
  }
  
  request(config, (error, response, body) => {
    if (error) {
      return reject(error)
    }
    try {
      try {
        const _body = JSON.parse(body);
        if (response.statusCode === 200) {
          resolve(_body)
        }
        else {
          reject(new Error(`${response.statusCode}:${_body.message}`))
        }
      } catch (error) {
        resolve(body)
      }
    } catch (error) {
      reject(new Error("500:Server Error"))
    }
  })
})
