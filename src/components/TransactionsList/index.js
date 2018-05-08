import React from 'react';
import Transaction from '../Transaction/index';
import style from './style.css';

const TransactionsList = props => {
  return (
    <div className={style.transactionsList}>
      <h3 className={style.month}>{props.month}</h3>
      <table className={style.transactions}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map(transaction => {
            return (
              <Transaction
                key={transaction.id}
                description={transaction.description}
                amount={transaction.amount}
                currency={transaction.currency}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
