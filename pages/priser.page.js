import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
import axios from "axios";
import FaqComponent from './components/faq';
import PriserComp from './components/priser';
import Spacer from './components/spacer';
 
function Priser () {

    return (
        <>
            <Head>
                <title>Priser - Køb Abonnement | Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/priser" />
                <meta name="description" content="Hvad koster abonnement hos Tipsspillet? Spil helt gratis, eller opgrader til Plus eller Premium, og opret gruppespil og deltag i præmiedyster." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet priser, tipsspillet abonnement, abonnement, priser, betting abonnement, odds abonnement" />
                <meta itemProp="name" content="Tipsspillet Priser og Abonnement" />
                <meta itemProp="description" content="Hvad koster abonnement hos Tipsspillet? Spil helt gratis, eller opgrader til Plus eller Premium, og opret gruppespil og deltag i præmiedyster." />
                <meta property="og:title" content="Priser - Abonnement - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/priser" />
                <meta property="og:description" content="Hvad koster abonnement hos Tipsspillet? Spil helt gratis, eller opgrader til Plus eller Premium, og opret gruppespil og deltag i præmiedyster." />
            </Head>
            <Header />
            <Spacer />
            <div className="main-container">
                <div className="hero-text">
                    <h1 className="priser-h1 animation-fadeleft animation-delay-200">Priser og Abonnement</h1>
                    <h2 className="priser-h2 animation-fadetop animation-delay-300">Find det <span style={{color: "var(--primary)", fontWeight: "500"}}>abonnement</span> der bedst passer dig.</h2>
                </div>
            </div>
            <PriserComp />
            <FaqComponent />
        </>
    )
}
 
export default Priser;