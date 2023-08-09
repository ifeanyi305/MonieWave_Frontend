import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Privacy = () => {
  const privacies = [
    {
      privacyHeading: "Our Privacy Commitment",
      privacyParagraph: "MonieWave Ltd is committed to respecting and protecting your privacy. We value your trust and want you to understand how we collect, use, protect, disclose and otherwise process information about you.",
      privacyParagraph2: "This privacy statement applies to personal information we collect about you, for example when you visit our websites or mobile applications or contact MonieWave call centre, or when a receiver completes a receiver’s form at our paying agent. We want to ensure you are aware of our practices for collecting, using, protecting disclosing, and otherwise processing personal information, which is information about a person that can be used to identify that person.",
    },
    {
      privacyHeading: "Choice/Opt-Out",
      privacyParagraph: "You may choose to stop receiving our newsletter or marketing emails by following the unsubscribe instructions included in these emails or you can contact us.",
      privacyParagraph2: "We will also send you service related email announcements on rare occasions when it is necessary to do so. For example, when MonieWave money transfer platform is temporarily suspended for maintenance, we might send you an email. You do not have an option to opt out of these emails, which are not promotional in nature."
    },
    {
      privacyHeading: "Information Obtained about a Third Party",
      privacyParagraph: "You may provide us with personal information about others, such as Receivers’ or Virtual account users’’ name and photos, address, phone number, bank account details or email address. If so, you confirm that you have appropriate authority to do so and to allow us to use that information and we will only use it for the specific reason for which it was provided to us.",
      privacyParagraph2: "If you believe that one of your contacts has provided us with your personal information and you would like to request that it be removed from our database, please contact us.",
    },
    {
      privacyHeading: "Information Sharing",
      privacyParagraph: "We may provide your personal information to companies that provide services to help us with our business activities or offering customer service such as local banks or money exchange houses or IT or digital marketing providers. These companies are authorised to use your personal information only as necessary to provide these services. If you have any concern about this, please contact us.",
    },
    {
      privacyHeading: "Cookies and Other Tracking Technologies",
      privacyParagraph: "Technologies such as: cookies, beacons, tags, scripts or similar technologies are used by MonieWave Ltd and our marketing partners, affiliates, or analytics or service providers. These technologies are used in analysing trends, administering the website, tracking users’ movements around the website and to gather demographic information about our user base as a whole. We may receive reports based on the use of these technologies by these companies on an individual as well as aggregated basis.",
    }
  ]
  return (
    <>
      <Navbar />
      <div className="px-6">
        <div className="flex termsOfUse justify-center my-4 w-full items-center">
          <h1 className="text-[28px] py-[40px] text-[#fff] font-extrabold">Privacy Policy</h1>
        </div>
        <div>
          <p className="font-extrabold text-[22px]">Privacy policy</p>
          <div>
            {
              privacies.map((privacy) => (
                <div className="py-2">
                  <p className="font-extrabold text-[20px]">{privacy.privacyHeading}</p>
                  <p>{privacy.privacyParagraph}</p>
                  <p className="py-2">{privacy.privacyParagraph2}</p>
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

export default Privacy;