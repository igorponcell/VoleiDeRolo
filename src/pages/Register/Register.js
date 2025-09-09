import styles from './Register.module.css';
import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication.js';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { error: authError, register, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Senhas não coincidem.');
      return;
    }

    // Here you would typically handle the registration logic, e.g., API call
    const user = { username, email, password };
    await register(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
          <label htmlFor="username">Usuário:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Insira seu usuário'
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
            placeholder='Insira seu email'
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
            placeholder='Insira sua senha'
            required/>
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmação:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirme sua senha'
            required/>
        </div>

        {!loading && <button type="submit" className='btn'>Cadastrar</button>}
        {loading && <button type="submit" className='btn' disabled>Carregando...</button>}

        {error && <p className="error">{error}</p>}
      </form>
    </div>  
  )
}

export default Register