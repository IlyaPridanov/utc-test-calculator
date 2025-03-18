import React, { useState } from 'react';
import closeIcon from '../../img/icon-close.svg'; 
import './Popup.css';

const Popup = ({ onClose }) => {
  const [screen, setScreen] = useState(1);
  const [loanAmount, setLoanAmount] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(12);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [annualPayment, setAnnualPayment] = useState(0);
  const [periodTerm, setPeriodTerm] = useState('MONTH');
  
  const PERIOD_NAME = {
      'MONTH': monthlyPayment.toFixed(2),
      'ANNUAL': annualPayment.toFixed(2),
  };

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

  const handlePeriodChange = (period) => {
    setPeriodTerm(period);
  };

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close-button" onClick={onClose}>
            <img src={closeIcon} alt="Закрыть" /> 
        </button>
        {screen === 1 ? (
          <div className="popup__screen screen-1">
            <h2 className='h2 popup__caption'>Платежи по кредиту</h2>
            <label className='popup__label'>
                <span>Ваша сумма кредита </span>
                <input
                type="number"
                value={loanAmount}
                className='input'
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Сумма кредита"
                />
            </label>
            <button className='popup__button button' onClick={handleCalculate}>Рассчитать</button>
          </div>
        ) : (
          <div className="popup__screen screen-2">
            <h2 className='h2 popup__caption'>Результаты расчета</h2>
            <div className="popup__terms-row">
                <p className="popup__terms-text">Количество месяцев?</p>
                <div className="popup__terms">
                    <button className={selectedTerm === 12 ? 'active' : ''} onClick={() => handleTermChange(12)}>12</button>
                    <button className={selectedTerm === 24 ? 'active' : ''} onClick={() => handleTermChange(24)}>24</button>
                    <button className={selectedTerm === 36 ? 'active' : ''} onClick={() => handleTermChange(36)}>36</button>
                    <button className={selectedTerm === 48 ? 'active' : ''} onClick={() => handleTermChange(48)}>48</button>
                </div>
            </div>
            <div className="popup__terms-row">
            <p className="popup__terms-text">Итого ваш платеж по кредиту:</p>
                <div className="popup__terms">
                    <button className={periodTerm === 'MONTH' ? 'active' : ''} onClick={() => handlePeriodChange('MONTH')}>в месяц</button>
                    <button className={periodTerm === 'ANNUAL' ? 'active' : ''} onClick={() => handlePeriodChange('ANNUAL')}>в год</button>
                </div>
            </div>
            <p className="popup__result">{PERIOD_NAME[periodTerm]} рублей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;