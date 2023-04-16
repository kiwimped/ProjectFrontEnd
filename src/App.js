import "./styles.css";
import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Cryptobase";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { LinkContainer } from "react-router-bootstrap";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import VideoPlayer from "react-background-video-player";
import Settings from "./Settings";
export const ThemeContext = createContext(null);
export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Navbar>
          <Container fluid>
            <Nav className="Navbar">
              <LinkContainer to="/">
                <Nav.Link>Cryptohub</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Chart">
                <Nav.Link>Chart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/About">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Sign In" id="basic-nav-dropdown">
                <LinkContainer to="/Login">
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/Register">
                  <NavDropdown.Item>Register</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <LinkContainer to="/Settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
        <br></br>
        <Container>
          <Row>
            <Col md={2} lg={4}></Col>
            <Col md={8} lg={4}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Chart" element={<Chart />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/About" element={<About />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Col>

            <Col md={2} lg={4}></Col>
          </Row>
        </Container>
      </div>
    </ThemeContext.Provider>
  );
}
function Chart() {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await res.json();
      console.log(data.data);
      setCoins(data.data);
    };
    fetchCoins();
  }, [limit]);

  const [usdRate, setUsdRate] = useState(1);
  const [eurRate, setEurRate] = useState(1);
  const [jpyRate, setJpyRate] = useState(1);
  const [gbpRate, setGbpRate] = useState(1);
  const [cadRate, setCadRate] = useState(1);

  useEffect(() => {
    const fetchRates = async () => {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await res.json();
      setUsdRate(data.rates.USD);
      setEurRate(data.rates.EUR);
      setJpyRate(data.rates.JPY);
      setGbpRate(data.rates.GBP);
      setCadRate(data.rates.CAD);
    };
    fetchRates();
  }, []);

  const formatPrice = (price, currency) => {
    const rate = {
      USD: usdRate,
      EUR: eurRate,
      JPY: jpyRate,
      GBP: gbpRate,
      CAD: cadRate
    }[currency];
    return `$${(parseFloat(price) * rate).toFixed(2)} ${currency}`;
  };

  const getImageUrl = (symbol) => {
    return `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`;
  };
  const [SearchQuery, setSearchQuery] = useState("");

  const filterCoins = coins.filter(({ name }) =>
    name.toLowerCase().includes(SearchQuery.toLowerCase())
  );
  const handleRefresh = () => {
    setLimit(20);
    window.scrollTo(0, 0);
  };
  return (
    <div className="coins">
      <Form className="Searchbar">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>
      <table className="table">
        <thead style={{ border: 5 }}>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price (USD)</th>
            <th>Price (EUR)</th>
            <th>Price (JPY)</th>
            <th>Price (GBP)</th>
            <th>Price (CAD)</th>
          </tr>
        </thead>
        <tbody>
          {filterCoins.map(({ id, name, rank, priceUsd, symbol }) => (
            <tr key={id}>
              <td>{rank}</td>
              <td>{name}</td>
              <td>
                <img
                  src={getImageUrl(symbol)}
                  alt={name}
                  width="50"
                  height="50"
                />
              </td>
              <td>{formatPrice(priceUsd, "USD")}</td>
              <td>{formatPrice(priceUsd, "EUR")}</td>
              <td>{formatPrice(priceUsd, "JPY")}</td>
              <td>{formatPrice(priceUsd, "GBP")}</td>
              <td>{formatPrice(priceUsd, "CAD")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={() => setLimit(limit + 20)}>Next</Button>

        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
    </div>
  );
}
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
        <Alert>
          If there is anything you would like to know, contact us at...
        </Alert>
      </div>
      <div className="contact-form-alert">
        <Alert>
          Phone: 416-899-crypto <br /> Or fill out this form below!
        </Alert>
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
function About() {
  return (
    <div>
      <Alert>
        Welcome to CrytoBase <br />
        The site with info on crypto currency <br />
        Here at CryptoBase you can find the cost of each currency <br />
        If you wish contact us please visit the contact page <br />
        If you wish to see the cost of each currency please vist the CryptoBase
        page <br />
      </Alert>
      <Alert>
        <Alert.Heading>
          {" "}
          Are you interested in creating an account?
        </Alert.Heading>
        <hr />
        <p>Keep up to date with CryptoBase!</p>
        <hr />
        <Button href="/Register" variant="secondary">
          Yes
        </Button>{" "}
        <Button href="/" variant="danger">
          No, Thanks
        </Button>
      </Alert>
    </div>
  );
}
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setShowValidationMessage(true);
    } else {
      // Call your login API here
    }
  };
  return (
    <div>
      <h2>
        <Alert>
          LOGIN
          <br />
          <h4>
            Don't have an account? <a href="/Register">Register</a>
          </h4>
        </Alert>
      </h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />
      </label>
      {showValidationMessage && (
        <p style={{ color: "red" }}>Please fill in all fields.</p>
      )}
      <br />
      <a href="https://i6v8lp.csb.app/">
        <Button>SUBMIT</Button>
      </a>
    </div>
  );
}
function Register() {
  return (
    <div>
      <h2>
        <Alert>Register</Alert>
      </h2>
      <label>
        Email:
        <input placeholder="Enter your email" required />
      </label>
      <br />
      <label>
        Password:
        <input placeholder="Enter your password" required />
      </label>
      <br />
      <label>
        Re-enter Password:
        <input placeholder="Re-enter your password" required />
      </label>
      <br />
      <a href="https://i6v8lp.csb.app/">
        <Button>SUBMIT</Button>
      </a>
    </div>
  );
}
function PageNotFound() {
  return (
    <div>
      <img
        alt="Robot Melvin Got Gurked"
        style={{
          margin: "auto",
          width: 600,
          height: 500,
          backgroundSize: "cover"
        }}
        src="https://static.vecteezy.com/system/resources/previews/001/857/111/original/error-404-page-not-found-landing-page-concept-for-mobile-and-pc-free-vector.jpg"
      ></img>
    </div>
  );
}
