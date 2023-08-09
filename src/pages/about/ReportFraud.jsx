import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ReportFraud = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 reportFraud mb-[15%]">
        <div className="text-center py-4">
          <h1 className="text-[30px] font-extrabold py-4">Report fraud or any unauthorized activity immediately</h1>
          <p>
            If any form of fraudulent or unauthorized activity has been transacted through your
            account, kindly reach out to us immediately by sending us an email
            with all the necessary information.
          </p>
          <p className="py-4">
            Send us an email at
            <a className="text-[#2196f3]" href="mailto:fraudalert@ratehive.com"> fraudalert@ratehive.com </a>
            Our customer support team is available 24/7 to
            attend to all your needs.
          </p>
          <p>With RateHive, your safety is our priority.</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportFraud;