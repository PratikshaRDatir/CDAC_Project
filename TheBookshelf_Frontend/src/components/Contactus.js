import React, { useEffect } from 'react';
import './HomePage.css'; 

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Whether you have a question about our services, need assistance, or just want to share your thoughts, we're here to help.
      </p>
      <p>
        <strong>Email:</strong> support@thebookshelf.com
      </p>
      <p>
        <strong>Phone:</strong> + (91) 7854462856
      </p>
      <p>
        <strong>Address:</strong> 123 D Mart Road, Akurdi,Pune,State Maharashtra, 412302
      </p>
      <p>
        Thank you for visiting The Bookshelf. We look forward to assisting you!
      </p>
    </div>
  );
}

export default ContactUs;
