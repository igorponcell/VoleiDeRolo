import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
      <span>Volei de Rolo</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : undefined}>
            Sobre
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : undefined}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => isActive ? styles.active : undefined}>
            Registar
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
