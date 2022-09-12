import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from './layout/header';
import axios from "axios";
import FaqComponent from './components/faq';
import SpilMed from './components/spilmed';
import PriserComp from './components/priser';
import Spacer from './components/spacer';
 
function Priser () {

    return (
        <>
            <Head>
                <title>Priser - Køb Abonnement | Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/priser" />
                <meta name="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet priser, tipsspillet abonnement, abonnement, priser, betting abonnement, odds abonnement" />
                <meta itemProp="name" content="Tipsspillet Priser og Abonnement" />
                <meta itemProp="description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
                <meta property="og:title" content="Priser - Abonnement - Tipsspillet" />
                <meta property="og:description" content="Premium: 79kr - Opret egne gruppespil, deltag i præmiedyster, få udvidet statistikker, gratis betting tips og meget mere. Eller køb adgangsbillet til præmiedyster for 9 kr. - Eller gruppespilsbillet, som giver adgang til at oprette eget gruppespil til 37 kr." />
            </Head>
            <Header />
            <Spacer />
            <div className="main-modal" id="main-modal">
                <div className="modal-box">
                    <p className="main-modal-h1">Abonnement ikke tilgængeligt</p>
                    <p className="main-modal-h2">Abonnement er på nuværende tidspunkt ikke tilgængeligt for køb. Prøv igen senere...</p>
                    <div className="modal-touch">
                        <button className="nav-btn-default" onClick={() => {document.getElementById("main-modal").classList.remove("display-flex")}}>Tilbage</button>
                    </div>
                </div>
            </div>
            <PriserComp />
            <FaqComponent />
            <SpilMed />
        </>
    )
}
 
export default Priser;