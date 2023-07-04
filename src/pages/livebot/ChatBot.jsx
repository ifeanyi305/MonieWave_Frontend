import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TypingGif from './loadingLoadGiphy.gif'
import faqData from './faqData.json';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingBotResponse, setLoadingBotResponse] = useState(false);

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
            text: "I'm sorry, I couldn't find an answer to your question.",
            sender: 'bot',
          };
        }

        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setLoadingBotResponse(false)
      }, 3000);
    }
  };

  return (
    <div className="px-6">
      <div className="">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'bot' ? 'bot' : 'flex justify-end'}`}
          >
            {message.text}
          </div>
        ))}
        {loadingBotResponse && <img className="w-[10%]" src={TypingGif} alt="typing giphy" />}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={handleUserInput}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
