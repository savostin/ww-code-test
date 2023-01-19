import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import NumericInput from "react-numeric-input";
import NIService from "../../services/national-insurance";

import "./index.css";


const Card = () => {
  const [loading, setLoading] = useState(true);
  const [inReq, setInReq] = useState(false);
  const [income, setIncome] = useState(1000);
  const [dateOne, setDateOne] = useState(new Date('2018-04-06'));
  const [dateTwo, setDateTwo] = useState(new Date('2019-04-06'));
  const [niOne, setNiOne] = useState(0);
  const [niTwo, setNiTwo] = useState(0);
  const niService = new NIService();
  const doCompare = (e) => {
    e.preventDefault();
    setInReq(true);
    Promise.all([
      niService.query(income, dateOne).then((val) => setNiOne(val.ni)).catch((err) => setNiOne(0) || toast(err)),
      niService.query(income, dateTwo).then((val) => setNiTwo(val.ni)).catch((err) => setNiTwo(0) || toast(err)),
    ])
	  .catch((err) => {
		toast(err);
	  })
      .finally(() => {
        setInReq(false);
      });
  };
  useEffect(() => {
    setLoading(false);
});
  return (
    <div className="card">
      {!loading && (
        <div>
          <div className={`loader ${inReq ? 'show' : ''}`} />
          <h2>Compare contributions</h2>
          <div className="row">
            Income:
            <NumericInput
              strict
              min={0}
              step={1}
              className="income"
              value={income}
              onChange={setIncome}
              disabled={inReq}
            />
          </div>
          <div className="row">
            <span className="title">First date:</span>
            <DatePicker
              selected={dateOne}
			  dateFormat="yyyy-MM-dd"
              onChange={(d) => setDateOne(d)}
              disabled={inReq}
            />
            NI:
            <span className="ni">{niOne}</span>
          </div>
          <div className="row">
            <span className="title">Second date:</span>
            <DatePicker
              selected={dateTwo}
			  dateFormat="yyyy-MM-dd"
              onChange={(d) => setDateTwo(d)}
              disabled={inReq}
            />
            NI:
            <span className="ni">{niTwo}</span>
          </div>
          <div className="row">
            <button
              type="submit"
              className="compare"
              onClick={doCompare}
              disabled={inReq || income === 0}
            >
              Compare
            </button>
          </div>
        </div>
      )}
	<ToastContainer />
    </div>
  );
};

export default Card;
