import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
import FaqComponent from './components/faq';
 
function _500 () {

    return (
        <>
            <Head>
                <title>500 - Serverfejl | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">404 - Serverfejl</p>
                    <h1 className="main-component-h1 red-gradient animation-fadeleft animation-delay-200">Der opstod fejl på serveren.</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Prøv igen senere.</h2>
                </div>
            </div>
            <FaqComponent />
        </>
    )
}
 
export default _500;