import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipients } from '../../redux/recipients/recipients';

const Recipients = () => {
  const {success, loading, errors} = useSelector((state) => state.beneficiary);
  const recipients = success.success;
  const dispatch = useDispatch();
  console.log("I'm loading",loading);
  console.log("I'm success", recipients);
  useEffect(() => {
    dispatch(fetchRecipients());
  }, [dispatch]);
  return (
    <div>
      {
        loading ? (<p>loading...</p>) : (
          recipients.map((recipient) => (
            <h1>{recipient.bank_name}</h1>
          ))
        )
      }
    </div>
  );
};

export default Recipients;