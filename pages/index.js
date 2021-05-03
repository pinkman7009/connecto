import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FirebaseContext from '../context/firebase';

export default function Home() {
  const { firebase } = useContext(FirebaseContext);
  const router = useRouter();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login - Connecto';
  }, []);

  const { email, password } = user;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setError('');
      router.push('/home');
    } catch (error) {
      setUser({
        email: '',
        password: '',
      });

      setError(error.message);
    }
  };

  const isInvalid = email === '' || password === '';

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  return (
    <section className={styles.formpage}>
      <div className={styles.content}>
        <h2 className={styles.title}>Connecto</h2>
        <p className={styles.text}>
          a place to connect with like minded people to learn and grow together
        </p>
        <img src='homepic.svg' alt='' className={styles.homeimg} />
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.largeText}>Log In</h2>
        <p className={styles.error}>{error}</p>
        <input
          name='email'
          type='email'
          className={styles.input}
          placeholder='email'
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          value={password}
          className={styles.input}
          placeholder='password'
          onChange={onChange}
        />
        <button
          disabled={isInvalid}
          type='submit'
          className={`${isInvalid && styles.disabled} ${styles.btn}`}
        >
          Sign In
        </button>

        <Link href='/register'>New User? Register here.</Link>
      </form>
    </section>
  );
}
