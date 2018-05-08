import React from 'react';
import style from './style.css';

const ReviewResults = (props) => {
  if (props.spendsMoreThanEarns) {
    return <div className={style.badReview}>You're really bad</div>
  } else {
    return <div className={style.goodReview}>You're great</div>
  }
};

export default ReviewResults;