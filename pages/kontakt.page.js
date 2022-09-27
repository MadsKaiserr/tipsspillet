import * as React from 'react';
import Head from 'next/head'
import Header from './layout/header';

function Kontakt() {

    return (
        <>
            <Head>
                <title>Kontakt - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/kontakt" />
                <meta name="description" content="Kontaktside for Tipsspillet - Få svar på spørgsmål du ikke finder på siden, anmeld fejl eller kom i kontakt med os." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet kontakt, kontakt,kontakt tipsspillet,tipsspillet hjælp,kontaktside" />
                <meta itemProp="name" content="Tipsspillet Kontakt" />
                <meta itemProp="description" content="Kontaktside for Tipsspillet - Få svar på spørgsmål du ikke finder på siden, anmeld fejl eller kom i kontakt med os." />
                <meta property="og:title" content="Kontakt - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/kontakt" />
                <meta property="og:description" content="Kontaktside for Tipsspillet - Få svar på spørgsmål du ikke finder på siden, anmeld fejl eller kom i kontakt med os." />
            </Head>
            <Header />
            <div className="gs-container">
                <div className="main-block-container">
                    <div className="hero-text">
                        <h3 className="cp-h3 animation-fadeleft">Kom i kontakt med os</h3>
                        <h1 className="cp-h1 animation-fadeleft animation-delay-200">Kontakt Tipsspillet</h1>
                        <h2 className="cp-h2 animation-fadetop animation-delay-300">Få svar på dine spørgsmål, og kom i <span className="color-primary font-weight-500">kontakt</span> direkte med os.</h2>
                    </div>
                </div>
                <div className="gs-wrapper">
                    <div className="kt-container">
                        <div className="kt-wrapper">
                            <div className="kt-type">
                                <p clasName="kt-p">Navn</p>
                                <input type="text" className="kt-input" placeholder="Fx. Mads Kaiser" />
                            </div>
                            <div className="kt-type">
                                <p clasName="kt-p">Email</p>
                                <input type="text" className="kt-input" placeholder="Fx. madskaiser@gmail.com" />
                            </div>
                        </div>
                        <div className="kt-type" style={{width: "100%"}}>
                            <p clasName="kt-p">Besked</p>
                            <textarea className="kt-area" placeholder="Tekst..." />
                        </div>
                        <button className="kontakt-btn">Send mail</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Kontakt;