import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const TransferStatus = () => {
  const location = useLocation();
  const transfer = location.state;
  return (
    <div>
      <p>{transfer.recipient_name}</p>
    </div>
  );
};

export default TransferStatus;