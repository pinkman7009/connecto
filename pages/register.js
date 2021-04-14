import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const register = () => {
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
        <h2 className={styles.largeText}>Register</h2>
        <input type='text' className={styles.input} placeholder='full name' />
        <input type='email' className={styles.input} placeholder='email' />
        <input
          type='text'
          className={styles.input}
          placeholder='college/university'
        />
        <input
          type='password'
          className={styles.input}
          placeholder='password'
        />
        <input
          type='password'
          className={styles.input}
          placeholder='confirm password'
        />
        <input type='submit' value='Sign Up' className={styles.btn} />
        <Link href='/'>Already a user? Log In here.</Link>
      </form>
    </section>
  );
};

export default register;
