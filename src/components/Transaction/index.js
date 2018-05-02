import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

function Transaction(props) {
  return (
      <tr className={props.amount >= 0 ? style.credit : style.debit}>
        <td>{props.description}</td>
        <td>{props.amount} {props.currency}</td>
      </tr>
  )
}

Transaction.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.number,
  currrency: PropTypes.string
};

export default Transaction;
