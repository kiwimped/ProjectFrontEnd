import { useState, useEffect, createContext } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    comment: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      comment: ""
    });
    window.alert("Thank you!");
  };

  return (
    <div className="contact-form-container">
      <div className="contact-text">
        If there is anything you would like to know, contact us at...
      </div>
      <div className="contact-form-alert">
        Phone: 416-899-crypto <br /> Or fill out this form below!
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="contact-form-label">
          First Name:
          <input
            className="contact-form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="contact-form-label">
          Last Name:
          <input
            className="contact-form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="contact-form-label">
          Email:
          <input
            className="contact-form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="contact-form-label">
          Comment:
          <textarea
            className="contact-form-textarea"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </label>
        <br />
        <input className="contact-form-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}
