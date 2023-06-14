import React, {useState} from 'react';
import { useForm } from '@formspree/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../assets/images/landingpage/contactUs.png';

const ContactUs = () => {
  const [state, handleSubmit] = useForm('xgebgkpl');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const MailSent = () => {
    return (
      <div className='text-center'>
        Thank you for your message, we&apos;ll get back to you shortly &#129303;
      </div>
    )
  }

  const validateForm = () => {
    return name.length > 0 && email.length > 0 && message.length > 0
  }
  return (
    <div>
      <div className="px-14">
        <Navbar />
        <div className="w-full">
          <img src={Contact} alt="contact us image" />
        </div>
        <div className="my-4">
          <p className="text-center">
            If you have further questions or
            inquiries about our services, please reach out to
            us and we would reply you as quickly as possible.
          </p>
        </div>
        <div>
          <form className="md:w-[60%] m-auto" onSubmit={(e) => handleSubmit(e)}>
            <div className="my-4">
              <label className="block">Name <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />
            </div>
            <div className="my-4">
              <label className="block">Email <span className="text-[#C50713] text-[17px]">*</span></label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />
            </div>
            <div className="my-4">
              <label className="block">Your message <span className="text-[#C50713] text-[17px]">*</span></label>
              <textarea
                cols={50}
                rows={5}
                required
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className="w-full border-[#6B6B6B] p-4 block border-[1px] rounded-[8px]"
              />
            </div>
            <button
              type="submit"
              disabled={!validateForm()}
              className={validateForm() ?
                'p-2 mt-[27px] mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'
                : 'p-2 mt-[27px] opacity-40 mb-2 login_btn bg-[#814DE5] text-[#fff] w-full text-center'}
            >
              Send message
            </button>
          </form>
          {
            state.succeeded ? (<MailSent />)
              : ""
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;