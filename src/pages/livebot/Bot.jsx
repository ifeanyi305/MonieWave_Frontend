import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TypingGif from './loadingLoadGiphy.gif';
import faqData from './faqData.json';
import { AiOutlineSend } from 'react-icons/ai';

const Bot = ({ setNumber }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingBotResponse, setLoadingBotResponse] = useState(false);
  // automatically scroll to the bottom
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: uuidv4(),
        text: inputValue,
        sender: 'user',
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
      setLoadingBotResponse(true)

      setTimeout(() => {
        const userQuestion = inputValue.toLowerCase();
        const userWords = userQuestion.split(' ');

        const matchingFAQ = faqData.find((faq) => {
          const faqWords = faq.question.toLowerCase().split(' ');
          const commonWords = userWords.filter((word) => faqWords.includes(word));
          return commonWords.length >= 4;
        });

        let botResponse;
        if (matchingFAQ) {
          botResponse = {
            id: uuidv4(),
            text: matchingFAQ.answer,
            sender: 'bot',
          };
        } else {
          botResponse = {
            id: uuidv4(),
            text: <div>
              <p>I'm sorry, I couldn't find an answer to your question.</p>
              <p>you can ask another question.</p>
              <p> or you can speak to our
                <button
                  className='ml-2 text-[17px] text-[#563399] underline'
                  type="button"
                  onClick={() => setNumber(1)}>live agent</button>
              </p>
            </div>,
            sender: 'bot',
          };
        }

        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setLoadingBotResponse(false)
      }, 3000);
    }
  };

  const style = {
    bot: 'bg-[#E6DBFA] chatbot_radius w-fit px-4 py-[8px]',
    bot2: 'bg-[#E6DBFA] rounded-[16px] w-fit my-2 px-4 py-[8px]',
  }

  return (
    <div>
      <div className="p-6 bg-[#fff] h-[350px] create_user_container" ref={containerRef}>
        <p className={style.bot}>Ratehive  . Bot</p>
        <p className={style.bot2}>Hi! welcome to RateHive.</p>
        <p className={style.bot2}>Ask me a question and I'll find the answer for you</p>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'bot' ? 'bot' : 'flex justify-end'}`}>
            <p
              className={`my-2 
                ${message.sender === 'bot' ?
                  'bg-[#E6DBFA] chatbot_radius w-fit px-4 py-[8px]' :
                  'w-fit bg-[#563399] text-[#fff] py-[8px] userbot_radius px-4'}`
              }
            >
              {message.text}
            </p>
          </div>
        ))}
        {loadingBotResponse && <img className="w-[10%]" src={TypingGif} alt="typing giphy" />}
      </div>
      <div className="p-6 radius2 sticky bg-[#fff] bottom-0">
        <div className="flex justify-end mb-2">
          <button
            className="border-[2px] text-[#563399] border-[#563399] bg-transparent rounded-[20px] px-4 py-2"
            onClick={() => setNumber(1)}
          >Live agent</button>
        </div>
        <form onSubmit={handleSendMessage}>
          <div className="flex gap-[2px] border-[#AB88EE] rounded-[8px] p-[5px] border-[2px] items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleUserInput}
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

export default Bot;