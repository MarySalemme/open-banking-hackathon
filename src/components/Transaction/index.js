import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';

const Transaction = props => {
  return (
    <tr className={props.amount >= 0 ? style.credit : style.debit}>
      <td className={style.description}>{props.description}</td>
      <td className={style.amount}>{props.amount}</td>
    </tr>
  );
};

Transaction.propTypes = {
  description: PropTypes.string.isRequired,
  amount: PropTypes.number,
  currrency: PropTypes.string
};

export default Transaction;
