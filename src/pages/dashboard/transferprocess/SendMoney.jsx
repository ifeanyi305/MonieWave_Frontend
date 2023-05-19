import React, { useState } from 'react';
import BankDetails from './BankDetails';
import MoneySent from './MoneySent';
import PaymentMethod from './PaymentMethod';
import RecipientDetails from './RecipientDetails';
import SelectPayment from './SelectPayment';
import TransferMoney from './TransferMoney';

const SendMoney = () => {
  const [number, setNumber] = useState(0);
  const currentForm = () => {
    switch (number) {
      case 0:
        return <TransferMoney setNumber={setNumber} />
      case 1:
        return <BankDetails setNumber={setNumber} />
      case 2:
        return <MoneySent setNumber={setNumber} />
      case 3:
        return <PaymentMethod setNumber={setNumber} />
      case 4:
        return <RecipientDetails setNumber={setNumber} />
      case 5:
        return <SelectPayment setNumber={setNumber} />
      default:
        return <SendMoney setNumber={setNumber} />
    }
  }
  return (
    <div>
      <div className="">{currentForm()}</div>
    </div>
  );
};

export default SendMoney;