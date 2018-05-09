import React from 'react';
import style from './style.css';

const ReviewResults = props => {
  if (props.spendsMoreThanEarns) {
    return (
      <div className={style.badReview}>
        <p>It looks like you are not managing your money in the right way.</p>
        <p>
          We can offer financial support to you. <br />
          Call a financial advisor for free advice on{' '}
          <b>0118 999 881 999 119 725 3</b>
        </p>
      </div>
    );
  } else {
    return <div className={style.goodReview}>You're doing great!</div>;
  }
};

export default ReviewResults;
