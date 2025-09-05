import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <p>Volei de Rolo &copy; 2025</p>
        <p>Created by <a href="https://github.com/igorponcell">Igor Poncell</a></p>
    </footer>
  )
}

export default Footer