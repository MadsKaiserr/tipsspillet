import './css/variables.css'
import './css/responsive.css'
import './css/forside.css';
import './css/components.css';
import './css/signup.css';
import './css/gruppespil.css';
import './css/priser.css';
import './css/stage.css';
import './css/match.css';
import './css/blog.css';
import Script from 'next/script'
import Footer from './layout/footer';
import Login from './components/login';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Head from 'next/head'

Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="gtag"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6CYY86HX7R');`,
        }}
      />
      <Script id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2906349,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <Script async id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="d44cf7c1-e161-4a23-b759-e15e515a068e" data-blockingmode="auto" type="text/javascript"></Script>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6CYY86HX7R"></Script>
      {/*<Script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></Script> */}
      {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7071523482288616" crossOrigin="anonymous"></Script> */}
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-language" content="da" />
        <link rel="alternate" hrefLang="da" />
        <meta name="ahrefs-site-verification" content="73a7adbfc78a33be4964a1fbbe25c40fa085edc8b2d105bebf9a27ebc21e0a80"></meta>

        <meta name="trustpilot-one-time-domain-verification-id" content="ff4f2ee6-6577-4745-905d-b14b269c3fb3"/>

        <meta name="copyright" content="Tipsspillet, https://www.tipsspillet.dk/" />
        <meta itemProp="image" content="https://www.tipsspillet.dk/FBBanner.jpg" />

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
        <meta property="og:image" content="https://www.tipsspillet.dk/FBBanner.jpg" />
        <meta data-react-helmet="true" property="og:image" content="https://www.tipsspillet.dk/FBBanner.jpg" />

        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Script id="CookieDeclaration" src="https://consent.cookiebot.com/d44cf7c1-e161-4a23-b759-e15e515a068e/cd.js" type="text/javascript" async></Script>
      <Login />
      <Component {...pageProps}/>
      <Footer />
    </>
  );
}

export default MyApp
