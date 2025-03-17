import React from 'react';
import './Button.css';

const Button = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Расчет платежей
    </button>
  );
};

export default Button;