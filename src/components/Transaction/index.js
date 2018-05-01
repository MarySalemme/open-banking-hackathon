import React from 'react';
import style from './style.css';

function Transaction(props) {
  return (
      <tr className={props.amount >= 0 ? style.credit : style.debit}>
        <td>{props.description}</td>
        <td>{props.amount} {props.currency}</td>
      </tr>
  )
}

export default Transaction;