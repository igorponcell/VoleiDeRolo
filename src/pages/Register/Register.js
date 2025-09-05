import styles from './Register.module.css';
import { useState, useEffect } from 'react';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Senhas não coincidem');
      return;
    }

    const user = { username, email, password };
    console.log('Usuario registrado:', user);
    
    // Reset form fields
    resetForm();
  };

  return (
    <div className={styles.register}>
        <h1>Registar</h1>

        <form onSubmit={handleSubmit}>
        
            <div className="formGroup">
            <label htmlFor="username">Usuário:</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter your username'
                required/>
            </div>
            
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
            <label htmlFor="password">Senha:</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your password'
                required/>
            </div>
        
            <div className="formGroup">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm your password'
                required/>
            </div>

            <button type="submit" className='btn'>Registrar</button>

            {error && <p className="error">{error}</p>}
        </form>
    </div>  
  )
}

export default Register
