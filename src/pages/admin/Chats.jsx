import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../redux/liveBot/allChats';
import { showMessages } from '../../redux/liveBot/messages';
import { useNavigate } from 'react-router-dom';

const Chats = () => {
  const { progress, pending, failed } = useSelector((state) => state.allChatBot);
  const { message, fetching } = useSelector((state) => state.message);
  const chats = progress?.progress?.chats
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch]);

  const showMessage = (id) => {
    dispatch(showMessages(id))
    if (message) {
      navigate('/messages')
    }
  }

  return (
    <div>
      {chats?.map((chat, index) => (
        <div key={index}>
          <p>Name: {chat.user_details.name}</p>
          <p>Email: {chat.user_details.email}</p>
          <button type="button" onClick={() => showMessage(chat.user_details.chat_id)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Chats;