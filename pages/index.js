import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
export default function Home() {
  return (
    <section className={styles.formpage}>
      <div className={styles.content}>
        <h2 className={styles.title}>Connecto</h2>
        <p className={styles.text}>
          a place to connect with like minded people to learn and grow together
        </p>
        <img src='homepic.svg' alt='' className={styles.homeimg} />
      </div>
      <form className={styles.form}>
        <h2 className={styles.largeText}>Log In</h2>
        <input type='email' className={styles.input} placeholder='email' />
        <input
          type='password'
          className={styles.input}
          placeholder='password'
        />
        <a href='/home' className={styles.btn}>
          Sign In
        </a>
        <Link href='/register'>New User? Register here.</Link>
      </form>
    </section>
  );
}
