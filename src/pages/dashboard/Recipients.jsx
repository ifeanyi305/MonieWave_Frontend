import React from 'react';

const Recipients = ({ bankName, accountNumber }) => {
  console.log("bank",bankName)
  return (
    <div>
      <h2>Recipient Details</h2>
      <p>Bank Name: {bankName}</p>
      <p>Account Number: {accountNumber}</p>
    </div>
  );
};

export default Recipients;