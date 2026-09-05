function Contact() {
  return (
    <div className="contact-section">
      <h2>Contact Me</h2>
      <p>
        If you would like to get in touch, please reach out via email or connect
        with me on LinkedIn.
      </p>
      <ul>
        <li>
          Email: <a href="mailto:example@email.com">Christopher_pham@yahoo.com</a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/example"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/example
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Contact;
