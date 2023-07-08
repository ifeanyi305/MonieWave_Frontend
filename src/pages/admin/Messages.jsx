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
    if (chat.trim() !== '') {
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
  }

  return (
    <div className="px-6">
      <div>
        {fetching ? (
          'loading'
        ) : (
          memo?.map((message, index) => (
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
        )}
      </div>
      <div className="p-6 sticky bg-[#fff] bottom-0">
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
