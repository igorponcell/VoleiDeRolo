import styles from './Login.module.css'
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication.js';
import { db } from '../../firebase/config.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { error: authError, loading, login } = useAuthentication();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const user = { email, password };
    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.login}>
      <h1>Login to your account</h1>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required/>
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required/>
        </div>

        {!loading && <button type="submit" className='btn'>Login</button>}
        {loading && <button type="submit" className='btn' disabled>Loading...</button>}

        {error && <p className="error">{error}</p>}
      </form>
    </div>  
  )
}

export default Login
