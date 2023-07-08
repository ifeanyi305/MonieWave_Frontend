import React, { useState } from 'react';
import LiveBot from './LiveBot';
import Bot from './Bot';

const Chatbot = () => {
  const [number, setNumber] = useState(0);


  const currentForm = () => {
    switch (number) {
      case 0:
        return <Bot setNumber={setNumber} />;
      case 1:
        return <LiveBot />;
      default:
        return <Bot setNumber={setNumber} />;
    }
  };

  return (
    <div className="px-6">
      <div className="bg-[#fff] w-full rounded-[24px] mb-6">
        <div className="bg-[#563399] sticky top-0 radius p-6 flex gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <p>{number === 1 && <button
              className="text-[#fff]"
              type="button"
              onClick={() => setNumber(0)}
            >&larr;</button>}</p>
            <h1 className='text-[#FAFAFA]'>Ratehive customer support</h1>
          </div>
          <button type="button" className="text-[#fafafa] text-[25px]">&times;</button>
        </div>
        <div>{currentForm()}</div>
      </div>
    </div>
  );
};

export default Chatbot;
