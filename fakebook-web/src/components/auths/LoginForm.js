import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../Auth.module.css';
import { AuthContext } from '../../contexts/AuthContext';

function LoginForm() {
  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmitLogin = e => {
    e.preventDefault();
	login(emailOrPhoneNumber,password)
  };

  return (
    <form className={styles['login-form']} onSubmit={handleSubmitLogin}>
      <div className="mb-3">
        <input
          type="text"
          className={`form-control ${styles.input}`}
          placeholder="Email address or phone number"
          value={emailOrPhoneNumber}
          onChange={e => setEmailOrPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className={`form-control ${styles.input}`}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button className={`btn ${styles['btn-custom']} btn-lg btn-block mt-3`}>
        Login
      </button>
      <div className="text-center pt-3 pb-3">
        
        <hr />
        <button
          type="button"
          className="btn btn-success btn-lg mt-3"
          onClick={() => navigate('/register')}
        >
          Create New Account
        </button>
      </div>
    </form>
  );
}

export default LoginForm;