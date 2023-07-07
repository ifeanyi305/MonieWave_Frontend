import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChatMessage } from '../../redux/liveBot/chat';
import { AiOutlineSend } from 'react-icons/ai';
import { showMessages } from '../../redux/liveBot/messages';

const Messages = () => {
  const { message, fetching, fault } = useSelector((state) => state.message);
  const memo = message?.messages;

  const [chat, setChat] = useState('');
  const sender = 'admin';
  const dispatch = useDispatch()

  const handleChatInput = (e) => {
    setChat(e.target.value)
  }

  const sendMessage = (e) => {
    e.preventDefault()
    const data = {
      data: {
        content: chat,
        sender,
        user_id: message?.messages[0].user_id,
        admin_id: message?.messages[0].admin_id,
      }
    };
    dispatch(createChatMessage(data)).then((res) => {
      if (res.error) {
        'error'
      } else {
        dispatch(showMessages(message?.messages[0].chat_id))
      }
    })
    setChat("");
  }

  return (
    <div className="px-6">
      {fetching ? (
        'loading'
      ) : (
        memo?.map((message, index) => (
          <div key={index}>
            <p
              className={message.sender === 'customer' ? 'flex justify-end' : 'bot'}
            >
              {message.content}
            </p>
          </div>
        ))
      )}
      <div className="p-6 radius2 sticky bg-[#fff] bottom-0">
        <form onSubmit={sendMessage}>
          <div className="flex gap-[2px] border-[#AB88EE] rounded-[8px] p-[5px] border-[2px] items-center">
            <input
              type="text"
              value={chat}
              onChange={handleChatInput}
              className="w-full p-4 block bg-transparent border-none focus:outline-none"
              placeholder="Type a message..."
            />
            <button type="submit"><AiOutlineSend className="text-[#AB88EE]" /></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;
