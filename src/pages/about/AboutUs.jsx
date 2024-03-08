import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhoWeAre from "../../assets/images/about/whoweareBG.png";

const AboutUs = () => {
  const missions = [
    {
      desc: "RateHive is a money transfer company that specialises in post money transfer management and international payment services."
    },
    {
      desc: "We are bringing innovation to money transfer service, gone are the days of filling long forms and sending money to Nigeria without having control on when the money should be received by the beneficiary. The control has been given back to you with our innovative solutions as you can now create a digital wallet for your beneficiary who lives in Nigeria, have control on how much you credit into the wallet, see how the wallet is used by the beneficiary, get notifications whenever the wallet is used."
    },
    {
      desc: "Also, you can pay directly for services such as school fees, hospital, utility bills, accommodation and many others in Nigeria without the need for going through another person."
    },
    {
      desc: "We want to make money transfer and international payment services fast, easy and cheap."
    },
    {
      header: "Our Vision & Mission",
      desc: "To be the fastest, easiest and cheapest money transfer company in the world that offers a post money transfer management and payment services to its customers."
    }
  ]
  return (
    <>
      <Navbar />
      <div className="px-6">
        <div className="w-full">
          <img src={WhoWeAre} alt="who we are image" />
        </div>
        <div>
          <h1 className="text-[28px] py-4 font-extrabold">About Us</h1>
          {
            missions.map((mission) => (
              <div className="py-4">
                <p className="text-[28px] font-extrabold">{mission.header}</p>
                <p className="pt-2">{mission.desc}</p>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;