import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FirebaseContext from '../context/firebase';
import { doesEmailExist } from '../services/firebase';

const register = () => {
  const { firebase } = useContext(FirebaseContext);
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    email: '',
    college: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'SignUp - Connecto';
  }, []);

  const { name, email, college, password, confirmPassword } = user;

  const handleSignUp = async (e) => {
    e.preventDefault();

    const emailExists = await doesEmailExist(email);

    if (!emailExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: name,
        });

        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          fullName: name,
          college: college,
          emailAddress: email.toLowerCase(),
          connections: [],
          dateCreated: Date.now(),
        });
        router.push('/home');
      } catch (error) {
        setUser({
          name: '',
          email: '',
          college: '',
          password: '',
          confirmPassword: '',
        });

        setError(error.message);
      }
    } else {
      setError('That email is already registed, please try another');
    }
  };

  const isInvalid =
    email === '' ||
    password === '' ||
    password !== confirmPassword ||
    college === '' ||
    name === '';

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
      <form className={styles.form} onSubmit={handleSignUp}>
        <h2 className={styles.largeText}>Register</h2>
        <p className={styles.error}>{error}</p>
        <input
          name='name'
          type='text'
          value={name}
          className={styles.input}
          placeholder='full name'
          onChange={onChange}
        />
        <input
          name='email'
          type='email'
          value={email}
          className={styles.input}
          placeholder='email'
          onChange={onChange}
        />
        <input
          name='college'
          type='text'
          value={college}
          className={styles.input}
          placeholder='college/university'
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
        <input
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          className={styles.input}
          placeholder='confirm password'
          onChange={onChange}
        />
        <button
          disabled={isInvalid}
          type='submit'
          className={`${isInvalid && styles.disabled} ${styles.btn}`}
        >
          Sign Up
        </button>
        <Link href='/'>Already a user? Log In here.</Link>
      </form>
    </section>
  );
};

export default register;
