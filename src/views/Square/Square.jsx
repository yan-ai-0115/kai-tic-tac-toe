import React from 'react';
import './Square.scss';

const Square = React.memo((props) => {
  const { value, onClick } = props;
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
});

export default Square;
