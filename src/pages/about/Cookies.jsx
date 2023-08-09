import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Cookies = () => {
  const cookies = [
    {
      cookieParagraph: "A cookie is a small text file that is downloaded onto ‘terminal equipment’ (e.g. a computer or smartphone) when the user accesses a website. It allows the website to recognise that user’s device and store some information about the user’s preferences or past actions.",
    },
    {
      cookieParagraph: "This website uses cookies to improve users’ experience while visiting the website. Where applicable, this website uses a cookie control system allowing the user on their first visit to the website to allow or disallow the use of cookies on their computer / device. This complies with recent legislation requirements for websites to obtain explicit consent from users before leaving behind or reading files such as cookies on a user’s computer / device.",
    },
    {
      cookieParagraph: "The cookies in use to deliver Google Analytics service are described in the table below.",
    },
    {
      cookieParagraph: "This privacy statement applies to personal information we collect about you, for example when you visit our websites or mobile applications or contact MonieWave call centre, or when a receiver completes a receiver’s form at our paying agent. We want to ensure you are aware of our practices for collecting, using, protecting disclosing, and otherwise processing personal information, which is information about a person that can be used to identify that person.",
    },
    {
      cookieHeading: "Opt-Out",
      cookieParagraph: "In order to provide website visitors with the choice on how data is collected by Google Analytics, Google has developed the Google Analytics Opt-out Browser Add-on. The add-on communicates with the Google Analytics JavaScript (ga.js) to stop data being sent to Google Analytics. The Google Analytics Opt-out Browser Add-on does not affect usage of the website in any other way. A link about Google Analytics Opt-out Browser Add-on is provided below for your convenience.",
    }
  ]

  return (
    <>
      <Navbar />
      <div className="px-6">
        <div className="flex termsOfUse justify-center my-4 w-full items-center">
          <h1 className="text-[28px] py-[40px] text-[#fff] font-extrabold">Cookie Policy</h1>
        </div>
        <div>
          <p className="font-extrabold text-[22px]">Cookie policy</p>
          <div>
            {
              cookies.map((cookie) => (
                <div className="py-2">
                  <p className="py-2">{cookie.cookieHeading}</p>
                  <p className="py-2">{cookie.cookieParagraph}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cookies;