import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  const [screen, setScreen] = useState(1);
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [annualPayment, setAnnualPayment] = useState(0);

  const handleCalculate = () => {
    const amount = parseFloat(loanAmount);
    if (isNaN(amount)) {
      alert('Введите корректную сумму кредита');
      return;
    }
    const monthly = amount / selectedTerm;
    setMonthlyPayment(monthly);
    setAnnualPayment(monthly * 12);
    setScreen(2);
  };

  const handleTermChange = (term) => {
    setSelectedTerm(term);
    const amount = parseFloat(loanAmount);
    if (!isNaN(amount)) {
      setMonthlyPayment(amount / term);
      setAnnualPayment((amount / term) * 12);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        {screen === 1 ? (
          <div className="screen-1">
            <h2>Введите сумму кредита</h2>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Сумма кредита"
            />
            <button onClick={handleCalculate}>Рассчитать</button>
          </div>
        ) : (
          <div className="screen-2">
            <h2>Результаты расчета</h2>
            <div className="terms">
              <button className={selectedTerm === 12 ? 'active' : ''} onClick={() => handleTermChange(12)}>12</button>
              <button className={selectedTerm === 24 ? 'active' : ''} onClick={() => handleTermChange(24)}>24</button>
              <button className={selectedTerm === 36 ? 'active' : ''} onClick={() => handleTermChange(36)}>36</button>
              <button className={selectedTerm === 48 ? 'active' : ''} onClick={() => handleTermChange(48)}>48</button>
            </div>
            <div className="results">
              <p>Ежемесячный платеж: {monthlyPayment.toFixed(2)} рублей</p>
              <p>Ежегодный платеж: {annualPayment.toFixed(2)} рублей</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;