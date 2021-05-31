import '../styles/globals.css';
import FirebaseContext from '../context/firebase';
import { FieldValue, firebase } from '../lib/firebase';
import Layout from '../components/Layout';

import ProtectedRoute from '../helpers/ProtectedRoute';

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <ProtectedRoute>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoute>
    </FirebaseContext.Provider>
  );
}

export default MyApp;
