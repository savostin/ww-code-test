const R = require('ramda');
const moment = require('moment');

const headerName = 'x-run-date'; // should be in config?!

module.exports = (req, res, next) => {
  try {
    const header = req.get(headerName);
    if (!R.isNil(header)) {
      const date = moment(header);
      if (!date.isValid()) {
        return next(new Error('Date format is invalid'));
      }
      req.date = date.format('YYYY-MM-DD');
    }
  } catch (e) {
    return next(new Error('Date provided is an invalid number'));
  }
  return next();
};
