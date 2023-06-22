import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { transfer } from '../../redux/moneyTransfer/transfer';
import BankDetails from './transferprocess/BankDetails';
import MoneySent from './transferprocess/MoneySent';
import PaymentMethod from './transferprocess/PaymentMethod';
import RecipientDetails from './transferprocess/RecipientDetails';
import SelectPayment from './transferprocess/SelectPayment';
import TransferMoney from './transferprocess/TransferMoney';
import { getToken } from '../../redux/auth/auth';

const SendMoney = ({
  recipient_name, setRecipient_name, recipient_bank, setRecipient_bank,
  recipient_account, setRecipient_account, recipient_phone, setRecipient_phone
}) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState('Euro');
  const [amount, setAmount] = useState(1);
  const [naira_amount, setNaira_amount] = useState(0);
  const [exchange_rate, setExchange_rate] = useState(0);
  const [fee, setFee] = useState(0);
  const [reference_number, setReference_number] = useState('');
  const [payment_method, setPayment_Method] = useState('Bank transfer');
  const userDetails = getToken();
  const userToken = userDetails.token;
  const [token, setToken] = useState("");
  const { victory, loading, errors } = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setToken(userToken);
  }, []);

  const confirmTransfer = (e) => {
    e.preventDefault();
    const transferDetails = {
      amount: amount.toString(),
      naira_amount: naira_amount.toString(),
      recipient_account: recipient_account.toString(),
      recipient_phone: recipient_phone.toString(),
      reference_number: reference_number.toString(),
      currency,
      exchange_rate, recipient_name, recipient_bank,
      payment_method, fee: fee.toString(),
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
          currency={currency}
        />
      case 3:
        return <MoneySent
          setNumber={setNumber}
          confirmTransfer={confirmTransfer}
          loading={loading}
          errors={errors}
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