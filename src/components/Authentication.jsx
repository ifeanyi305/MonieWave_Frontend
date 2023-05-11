import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Authentication = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user')) navigate('/login');
  }, [user]);
  return (
    <div></div>
  )
};

export default Authentication;