import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const TransferReceipt = () => {
  const location = useLocation();
  const transfer = location.state;
  return (
    <div>
      Transfer reciept
    </div>
  );
};

export default TransferReceipt;