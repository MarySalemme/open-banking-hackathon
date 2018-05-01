import React from 'react';

function Transaction(props) {
  return (
      <tr>
        <td>{props.description}</td>
        <td>{props.amount} {props.currency}</td>
      </tr>
  )
}

export default Transaction;