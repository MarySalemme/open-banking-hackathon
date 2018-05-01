import React, { Component } from 'react';
import Transaction from '../Transaction/index';
import style from './style.css';

function MonthlyTransactions(props) {
  return (
    <div className={style.monthlyTransactions}>
      <h3 className={style.month}>{props.month}</h3>
      <table className={style.transactions}>
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        {props.transactions.map((transaction) => {
          return (<Transaction
            key={transaction.id}
            description={transaction.description}
            amount={transaction.amount}
            currency={transaction.currency}
          />)
        })}
      </table>

    </div>
  );
}

export default MonthlyTransactions;