import React from 'react';
import styles from './Navbar.module.css';
// importing logo
import MainLogo from '../../asserts/logo/mainLogo.png';
// importing Link Component
import { Link } from 'react-router-dom';

const navbar = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                <img className={styles.mainLogo} src={MainLogo} alt="logo" />
            </Link>
        </div>
    );
}

export default navbar;