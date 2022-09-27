import * as React from 'react';
import Head from 'next/head'
import Header from './layout/header';
import FaqComponent from './components/faq';
 
function _404 () {
    return (
        <>
            <Head>
                <title>404 - Side ikke fundet | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">404 - Siden blev ikke fundet</p>
                    <h1 className="main-component-h4 red-gradient animation-fadeleft animation-delay-200">404 - Siden kunne ikke findes</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Gå tilbage til forsiden, eller tjek din forbindelse og prøv igen.</h2>
                </div>
            </div>
            <FaqComponent />
        </>
    )
}
 
export default _404;