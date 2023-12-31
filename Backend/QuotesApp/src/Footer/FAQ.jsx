// function FAQ(){
// return(
// <>
// <div className="faq" style={{ margin: "20px" }}>
//   <h3>Frequently Asked Questions (FAQ)</h3><br/>
//   <div className="faq-list">
//     <div className="faq-item">
//       <h5>How do I sign up and start exploring quotes?</h5>
//       <p>To begin exploring quotes and creating collections, click the "Join Now" or "Sign Up" button. Follow the simple steps to register and start your inspirational journey.</p>
//     </div>
//     <div className="faq-item">
//       <h5>What should I do if I forget my account password?</h5>
//       <p>If you forget your password, click the "Forgot Password" link on the login page. You'll receive an email guiding you on resetting your password securely.</p>
//     </div>
//     <div className="faq-item">
//       <h5>Which payment methods are accepted for premium features?</h5>
//       <p>For premium features, we accept secure payment methods like credit cards, PayPal, and more. You can select your preferred method during the upgrade process.</p>
//     </div>
//     <div className="faq-item">
//       <h5>How can I get assistance from the Quote Verse support team?</h5>
//       <p>For any queries or assistance, reach out to our support team via email at support@quoteverse.com or contact us on +1 (800) 123-4567.</p>
//     </div>
//     <div className="faq-item">
//   <h5>What is the availability of new quotes or updates?</h5>
//   <p>The availability of new quotes or updates varies, and our platform frequently refreshes with fresh content. Stay tuned for regular additions and updates, ensuring a constant stream of inspiration.</p>
// </div>
//   </div>
// </div>

// </>
// );
// }

// export default FAQ

import './FAQ.css';

function FAQ() {
  return (
    <>
      <div className="faq-container">
        <h3 className="faq-header">Frequently Asked Questions (FAQ)</h3>
        <div className="faq-list">
          <div className="faq-item">
            <h5>How do I sign up and start exploring quotes?</h5>
            <p>To begin exploring quotes and creating collections, click the "Join Now" or "Sign Up" button. Follow the simple steps to register and start your inspirational journey.</p>
          </div>
          <div className="faq-item">
            <h5>What should I do if I forget my account password?</h5>
            <p>If you forget your password, click the "Forgot Password" link on the login page. You'll receive an email guiding you on resetting your password securely.</p>
          </div>
          <div className="faq-item">
            <h5>Which payment methods are accepted for premium features?</h5>
            <p>For premium features, we accept secure payment methods like credit cards, PayPal, and more. You can select your preferred method during the upgrade process.</p>
          </div>
          <div className="faq-item">
            <h5>How can I get assistance from the Quote Verse support team?</h5>
            <p>For any queries or assistance, reach out to our support team via email at support@quoteverse.com or contact us on +1 (800) 123-4567.</p>
          </div>
          <div className="faq-item">
            <h5>What is the availability of new quotes or updates?</h5>
            <p>The availability of new quotes or updates varies, and our platform frequently refreshes with fresh content. Stay tuned for regular additions and updates, ensuring a constant stream of inspiration.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
