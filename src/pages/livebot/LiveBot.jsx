import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChatMessage } from '../../redux/liveBot/chat';
import { AiOutlineSend } from 'react-icons/ai';
import { useState } from 'react';

const LiveBot = () => {
  const { success } = useSelector((state) => state.chatBot);
  console.log("successful", success);
  const [chat, setChat] = useState('');
  const sender = 'customer';
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
      }
    };
    dispatch(createChatMessage(data));
    setChat("");
  }

  return (
    <div>
      <div className="p-6">
        <p>live bot</p>
        {
          success.map((message) => (
            <div>
              <p
               className={message.sender === 'customer' ? 'flex justify-end' : 'bot'}
              >
                {message.content}
              </p>
            </div>
          ))
        }
      </div>
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

export default LiveBot;