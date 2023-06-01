import React from 'react';

const Recipients = ({ recipient_bank, recipient_account, recipient_name }) => {
  console.log("bank",recipient_bank)
  return (
    <div>
      <h2>Recipient Details</h2>
      <p>Bank Name: {recipient_bank}</p>
      <p>Account Number: {recipient_account}</p>
      <p>Account Name: {recipient_name}</p>
    </div>
  );
};

export default Recipients;