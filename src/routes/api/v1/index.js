const { Router } = require('express');
const setIncome = require('../../../middleware/set-income');
const setDate = require('../../../middleware/set-date');
const calculateNI = require('../../../middleware/calculate-ni');

module.exports = () => {
  const api = Router();

  api.post(
    '/national-insurance',
    setIncome,
    setDate,
    calculateNI,
  );

  return api;
};
