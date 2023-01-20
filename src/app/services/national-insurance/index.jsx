const moment = require('moment');

const URL = '/v1/national-insurance'; // TO DO create abstract class for all API calls

export default class NIService {
  async query(income, date = null) {
    const parsed = moment.utc(date);
    if (parsed.isValid()) {
      const formated = parsed.format('YYYY-MM-DD'); // TO DO Sync format with backend
      return fetch(URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-run-date': parsed,
        },
        body: JSON.stringify({ income }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            return Promise.reject(response.error);
          }
          return response;
        })
        .then((response) => ({ ...{ date: formated }, ...response })); // We probably need the date later
	} else {
      return Promise.reject(`Invalid Date: ${date}`);
    }
  }
}
