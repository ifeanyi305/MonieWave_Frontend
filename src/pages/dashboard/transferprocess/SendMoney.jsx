import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transfer } from '../../../redux/moneyTransfer/transfer';
import BankDetails from './BankDetails';
import MoneySent from './MoneySent';
import PaymentMethod from './PaymentMethod';
import RecipientDetails from './RecipientDetails';
import SelectPayment from './SelectPayment';
import TransferMoney from './TransferMoney';
import { getToken } from '../../../redux/auth/auth';

const SendMoney = () => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('Euro');
  const [amount, setAmount] = useState(1);
  const [naira_amount, setNaira_amount] = useState(0);
  const [exchange_rate, setExchange_rate] = useState(0);
  const [fee, setFee] = useState(0);
  const [recipient_name, setRecipient_name] = useState('');
  const [recipient_account, setRecipient_account] = useState('');
  const [recipient_bank, setRecipient_bank] = useState('');
  const [recipient_phone, setRecipient_phone] = useState('');
  const [reference_number, setReference_number] = useState('');
  const [payment_method, setPayment_Method] = useState('Bank transfer');
  const [token, setToken] = useState("");
  const { victory, loading } = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setToken(getToken());
  }, [])

  const confirmTransfer = (e) => {
    e.preventDefault();
    const transferDetails = {
      currency, amount, naira_amount,
      exchange_rate, recipient_name, recipient_account, recipient_bank,
      recipient_phone, reference_number, payment_method
    }
    const transferData = {
      transferDetails, token
    }
    dispatch(transfer(transferData))
  }

  useEffect(() => {
    if (victory) {
      navigate('/transactions')
    }
  }, [victory])
  const currentForm = () => {
    switch (number) {
      case 0:
        return <TransferMoney
          currency={currency}
          setCurrency={setCurrency}
          setNumber={setNumber}
          amount={amount}
          fee={fee}
          setFee={setFee}
          setAmount={setAmount}
          naira_amount={naira_amount}
          setNaira_amount={setNaira_amount}
          exchange_rate={exchange_rate}
          setExchange_rate={setExchange_rate}
        />
      case 1:
        return <RecipientDetails
          setNumber={setNumber}
          recipient_name={recipient_name}
          setRecipient_name={setRecipient_name}
          recipient_account={recipient_account}
          setRecipient_account={setRecipient_account}
          recipient_bank={recipient_bank}
          setRecipient_bank={setRecipient_bank}
          recipient_phone={recipient_phone}
          setRecipient_phone={setRecipient_phone}
          reference_number={reference_number}
          setReference_number={setReference_number}
        />
      case 2:
        return <BankDetails
          setNumber={setNumber}
          reference_number={reference_number}
          amount={amount}
          fee={fee}
        />
      case 3:
        return <MoneySent
          setNumber={setNumber}
          confirmTransfer={confirmTransfer}
        />
      // case 4:
      //   return <PaymentMethod setNumber={setNumber} />
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