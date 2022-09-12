import * as React from 'react';
import { useState, useEffect } from 'react';
import FindComponent from './components/find';
import Head from 'next/head'
import Header from './layout/header';
 
function Gruppespil () {

    return (
        <>
            <Head>
                <title>Find gruppespil og præmiedyster - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/gruppespil" />
                <meta name="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="gruppespil,betting gruppespil" />
                <meta itemProp="name" content="Tipsspillet Gruppespil" />
                <meta itemProp="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta property="og:title" content="Find gruppespil og præmiedyster - Tipsspillet" />
                <meta property="og:description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
            </Head>
            <Header />
            <div className="hero-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Find gruppespil og præmiedyster</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Gruppespil og Dyster</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Find netop det gruppespil der passer dig, eller <span className="color-primary font-weight-500">tilmeld</span> dig et <span className="color-primary font-weight-500">gruppespil</span> med venner og familie.</h2>
                </div>
            </div>
            <FindComponent />
        </>
    )
}
 
export default Gruppespil;