import '../styles/globals.css';
import FirebaseContext from '../context/firebase';
import { FieldValue, firebase } from '../lib/firebase';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
