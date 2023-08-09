import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsOfUse = () => {
  const terms = [
    {
      termsHeading: "Acceptance of Terms Of Use",
      termsParagraph: "These terms of use are entered into by and between you and MonieWave Ltd (Company, we or us). The following terms and conditions, together with any documents incorporated by reference (collectively, these Terms of Use), govern your access to and use of MonieWave.com, including any content, functionality and services offered on or through MonieWave.com domains, subdomains or sub-directories, regardless of your means of access and use (whether online or mobile, including by way of mobile application) (collectively the Website), whether as a guest or a registered user",
      termsParagraph2: "Please read the Terms of Use carefully before you start to use the website. By using the Websites, you accept and agree to be bound and abide by these Terms of Use and our Privacy Statement, which are located at each homepage of the websites and are incorporated herein by reference. If you do not want to agree to these Terms of Use or the Privacy Statement, you must not access or use the website.",
      termsParagraph3: "The websites are offered and available to users who are at least 18 years of age, or the age of majority in their country or place of residence. By using the website, you represent and warrant that you are of legal age to form a binding contract with MonieWave Ltd and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access www.MonieWave.com and associated Mobile App.",
    },
    {
      termsHeading: "Changes to the Terms Of Use",
      termsParagraph: "We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the website thereafter. Your continued use of the website and associated Mobile App following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page from time to time so you are aware of any changes, as they are binding on you.",
    },
    {
      termsHeading: "Accessing the Website/App and Account Security",
      termsParagraph: "We reserve the right to withdraw or amend the website and associated Mobile App, and any service or material we provide on the website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the website or Mobile App is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the website its associated Mobile App, or the entire website, to users, including registered users. You are responsible for making all arrangements necessary for you to have access to the website and the associated Mobile App.",
      termsParagraph2: "To access the website or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the website and the associated Mobile App that all the information you provide on the website and the associated Mobile App is correct, current and complete. You agree that all information you provide to us through the website and the associated Mobile App or otherwise, including but not limited to the use of any interactive features on the website and the associated Mobile App, is governed by our Privacy Statement, and you consent to all actions we take with respect to your information consistent with our Privacy Statement.",
      termsParagraph3: "If you choose, or are provided with, a user name, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to the website or portions of it using your user name, password or other security information. You agree to notify us immediately of any unauthorized access to or use of your user name or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.",
    },
    {
      termsHeading: "Intellectual Property Rights",
      termsParagraph: "The website and the associated Mobile App and its entire contents, features and functionality (including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof), are owned by MonieWave Ltd, its licensors or other providers of such material and are protected by United Kingdom and international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.",
    },
    {
      termsHeading: "Trademarks",
      termsParagraph: "The MonieWave name, logo, globe design and related trademarks, trade names, service marks, and other trade indicia owned by MonieWave Ltd are registered or unregistered marks in the United Kingdom and other countries and may not be used without the Company’s prior written consent. Other trademarks, service marks, trade names, or trade indicia referenced on the website may be owned by third parties and are used solely for identification purposes.",
    }
  ]
  return (
    <>
      <Navbar />
      <div className="px-6">
        <div className="flex termsOfUse justify-center my-4 w-full items-center">
          <h1 className="text-[28px] py-[40px] text-[#fff] font-extrabold">Terms Of Use</h1>
        </div>
        <div>
          <p className="font-extrabold text-[22px]">Website terms of uses</p>
          <div>
            {
              terms.map((term) => (
                <div className="py-2">
                  <p className="font-extrabold text-[20px]">{term.termsHeading}</p>
                  <p>{term.termsParagraph}</p>
                  <p className="py-2">{term.termsParagraph2}</p>
                  <p>{term.termsParagraph3}</p>
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

export default TermsOfUse;