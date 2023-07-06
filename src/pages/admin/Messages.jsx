import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../redux/liveBot/allChats';

const Messages = () => {
  const { progress, pending, failed } = useSelector((state) => state.allChatBot);
  const dispatch = useDispatch();
  console.log("progress", progress);
  console.log("pending", pending);
  console.log("failed", failed);

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch]);

  return (
    <div>
      chats
    </div>
  );
};

export default Messages;