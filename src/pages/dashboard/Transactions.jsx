import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransfers } from '../../redux/moneyTransfer/fetchTransfer';

const Transactions = () => {
  const {victory, loading, error} = useSelector((state) => state.allTransfers)
  const transfers = victory?.victory
  const dispatch = useDispatch();
  console.log("i'm loading", loading);
  console.log("i'm victory", transfers);
  console.log("i'm error", error);
  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch])
  return (
    <div>
      {
        loading ? (<p>loading</p>)
        :
        transfers.map((transfer) => (
          <div key={transfer.id}>
            <h1>{transfer.currency}</h1>
          </div>
        ))
      }
    </div>
  );
};

export default Transactions;