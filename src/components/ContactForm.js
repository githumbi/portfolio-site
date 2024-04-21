import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mbjnqkvy");
  if (state.succeeded) {
      return <p>Thanks for submiting!</p>;
  }
  return (
    <section
      className="section section-bg "
      id="contact-section"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="m-titles">
          <h2 className="m-title">Contact Me</h2>
        </div>
        <div className="row row-custom">
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 align-right">
            {/* Section numbers */}
            <div className="numbers-items contacts-items">
              <div className="numbers-item">
                <div className="icon">
                  <i aria-hidden="true" className="fas fa-phone" />
                </div>
                <div className="num">+254 712 039 804</div>
              </div>
              <div className="numbers-item">
                <div className="icon">
                  <i aria-hidden="true" className="fas fa-at" />
                </div>
                <div className="num">githumbi74@gmail.com</div>
              </div>
              <div className="numbers-item">
                <div className="icon">
                  <i aria-hidden="true" className="fab fa-linkedin-in" />
                </div>
                <div className="num">
                  <a href="https://www.linkedin.com/in/joseph-githumbi/">
                    in/joseph/githumbi
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 vertical-line">
            {/* contact form */}
            <div className="contacts-form">
              <form id="cform" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <textarea id="message" name="message" />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                /><br></br>
                <button type="submit" disabled={state.submitting}>
                  Submit
                </button>
              </form>
            </div>
            <div className="alert-success" style={{ display: "none" }}>
              <p>Thanks, your message is sent successfully.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactForm;
