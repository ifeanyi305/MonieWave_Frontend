import React from 'react';

const Recipients = ({ recipient_bank, recipient_account }) => {
  console.log("bank",recipient_bank)
  return (
    <div>
      <h2>Recipient Details</h2>
      <p>Bank Name: {recipient_bank}</p>
      <p>Account Number: {recipient_account}</p>
    </div>
  );
};

export default Recipients;