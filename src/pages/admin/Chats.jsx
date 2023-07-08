import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../redux/liveBot/allChats';
import { showMessages } from '../../redux/liveBot/messages';
import { useNavigate } from 'react-router-dom';

const Chats = () => {
  const { progress, pending } = useSelector((state) => state.allChatBot);
  const { message } = useSelector((state) => state.message);
  const chats = progress?.progress?.chats;
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

  const formatTime = (timestamp) => {
    const formattedTime = new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return formattedTime;
  }

  return (
    <div className="px-6">
      <h1 className="text-[40px] text-[#464646] my-4">Chats</h1>
      <div className="border-[1px] bg-[#fff] mb-4 tranfers p-2 border-[#E6E6E6] rounded-[24px]">
        <table className="w-full p-4 bg-[#fff]">
          <thead>
            <tr>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Name</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Email</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Time</th>
              <th className="py-6 px-4 text-[#909090] text-[13px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {pending ? (
              <p>loading</p>
            ) : (
              chats && chats ? (
                chats?.map((chat, index) => (
                  <tr key={index}>
                    <td className="text-center text-[12px]">{chat.user_details.name}</td>
                    <td className="text-center text-[12px]">{chat.user_details.email}</td>
                    <td className="text-center p-2 text-[12px]">{formatTime(chat.user_details.time)}</td>
                    <td className="text-center text-[12px]"><button type="button" onClick={() => showMessage(chat.user_details.chat_id)}>show</button></td>
                  </tr>
                ))
              ) : (
                <p>No chats</p>
              )
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Chats;