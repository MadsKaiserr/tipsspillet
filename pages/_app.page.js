import './css/variables.css'
import './css/responsive.css'
import './css/forside.css';
import './css/components.css';
import './css/signup.css';
import './css/gruppespil.css';
import './css/priser.css';
import './css/stage.css';
import './css/match.css';

import Footer from './layout/footer';
import Login from './components/login';

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-language" content="da" />

        <meta name="trustpilot-one-time-domain-verification-id" content="ff4f2ee6-6577-4745-905d-b14b269c3fb3"/>

        <meta name="copyright" content="Tipsspillet, https://www.tipsspillet.dk/" />
        <meta itemProp="image" content="https://www.tipsspillet.dk/logo-primary.png" />

        <meta property="al:ios:app_name" content="Tipsspillet" />
        <meta property="al:ios:url" content="https://www.tipsspillet.dk" />
        <meta property="al:android:url" content="https://www.tipsspillet.dk" />
        <meta property="al:android:app_name" content="Tipsspillet" />
        <meta name="theme-color" content="#fff" />
        <meta name="msapplication-navbutton-color" content="#fff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#fff" />

        <meta property="al:web:url" content="https://www.tipsspillet.dk" />

        <meta property="og:site_name" content="Tipsspillet" />
        <meta property="og:locale" content="da-DK" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tipsspillet.dk" />
        <meta property="og:embed" content="Tipsspillet" />
        <meta property="og:image" content="https://www.tipsspillet.dk/logo-primary.png" />
        <meta data-react-helmet="true" property="og:image" content="https://www.tipsspillet.dk/logo-primary.png" />

        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Login />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp
