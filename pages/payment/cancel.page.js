import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '../layout/header';
import FaqComponent from '../components/faq';
 
function Cancel () {

    return (
        <>
            <Head>
                <title>Køb annulleret - Køb Abonnement | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <div className="hero-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Køb annulleret</p>
                    <h1 className="main-component-h1 red-gradient animation-fadeleft animation-delay-200">Dit køb blev annuleret</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Du har ikke gennemført dit køb - Gå tilbage og prøv igen, eller kontant os ved gentagende annulleringer.</h2>
                </div>
            </div>
            <div className="priser-container">
                
            </div>
            <FaqComponent />
        </>
    )
}
 
export default Cancel;