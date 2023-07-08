import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChatMessage } from '../../redux/liveBot/chat';
import { fetchMessages } from '../../redux/liveBot/userMessage';
import { AiOutlineSend } from 'react-icons/ai';

const LiveBot = () => {
  const { message, pending } = useSelector((state) => state.userMessage);
  const [chat, setChat] = useState('');
  const sender = 'customer';
  const dispatch = useDispatch();

  const handleChatInput = (e) => {
    setChat(e.target.value)
  };

  useEffect(() => {
    dispatch(fetchMessages())
  }, [dispatch])

  const sendMessage = (e) => {
    e.preventDefault()
    const data = {
      data: {
        content: chat,
        sender,
      }
    };
    dispatch(createChatMessage(data)).then((res) => {
      if (res.error) {
        'error'
      } else {
        dispatch(fetchMessages())
      }
    })
    setChat("");
  }

  return (
    <div>
    <div className="p-6">
      {pending ? (
        <p>Loading</p>
      ) : (
        message && message.messages ? (
          message.messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'admin' ? 'bot' : 'flex justify-end'}`}>
              <p
                className={`my-2
                  ${message.sender === 'admin' ?
                    'bg-[#E6DBFA] chatbot_radius w-fit px-4 py-[8px]' :
                    'w-fit bg-[#563399] text-[#fff] py-[8px] userbot_radius px-4'}`
                }
              >
                {message.content}
              </p>
            </div>
          ))
        ) : (
          <p>No messages</p>
        )
      )}
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