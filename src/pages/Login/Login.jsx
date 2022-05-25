import { useRef, useState } from "react";

import Footer from '../../components/Footer/Footer';

import { users } from "../../App";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";

import './Login.scss';
import eye from './eye.png';

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [emailValidation, setEmailValidation] = useState("hide-text-danger");
  const [userValidation, setUserValidation] = useState("hide-text-danger");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const inputRef = useRef(null);

  const focusOnPasswordInput = () => inputRef.current.focus();

	const { email, password } = userData;

	const setUserToLocaleStorage = data => {
		sessionStorage.setItem('user', JSON.stringify(data));
		setUserData({ email: '', password: '' });
		navigate('/', { replace: true });
	};

	const moveToForgotPasswordInput = () => {
		navigate('/forgot');
	};

	const handleChange = e => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

  const validateEmailClass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailValidation(
      re.test(String(email).toLowerCase()) || email.length === 0
        ? "hide-text-danger"
        : "text-danger"
    );
    return re.test(String(email).toLowerCase());
  };

	const handleVisibility = () => {
		setPasswordVisibility(
			passwordVisibility === 'password' ? 'text' : 'password'
		);
	};

  const clearPasword = () =>
    !isAuth ? setUserData({ email, password: "" }) : null;

  const showUserNotFoundText = () => {
    if (validateEmailClass()) {
      setUserValidation("text-danger");
    }
    return null;
  };

  const checkUser = async () => {
    const result = users.filter(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    result.length ? setUserToLocaleStorage(result[0]) : showUserNotFoundText();
    clearPasword();
    focusOnPasswordInput();
  };

  return (
    <div className="login-page bg-light">
      <form className="singin-form">
        <p className="form-title">Login to your account</p>
        <span className={userValidation}>
          Incorrect email address or password!
        </span>
        <label htmlFor="inputEmail4" className="login-input-label">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control login-input"
          id="inputEmail4"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          required
          onBlur={validateEmailClass}
        />
        <span className={emailValidation}>Incorrect email address</span>
        <label htmlFor="inputPassword4" className="login-input-label">
          Password
        </label>

        <div className="form-input-password">
          <span
            className="forgot-password text-primary"
            onClick={moveToForgotPasswordInput}
          >
            I forgot password
          </span>
          <input
            type={passwordVisibility}
            ref={inputRef}
            name="password"
            className="form-control login-input "
            id="inputPassword4"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
            // onBlur={validatePasswordClass}
          />
          <img className="eye" src={eye} alt="eye" onClick={handleVisibility} />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setTimeout(checkUser, 1000);
          }}
          className="btn btn-primary d-sm-inline-block login-btn"
        >
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};
export default Login;
