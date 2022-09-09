import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
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
                <meta property="og:description" content="Kontaktside for Tipsspillet - Få svar på spørgsmål du ikke finder på siden, anmeld fejl eller kom i kontakt med os." />
            </Head>
            <Header />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="kontakt-parent"><path className="pages-wave" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,133.3C672,139,768,149,864,181.3C960,213,1056,267,1152,261.3C1248,256,1344,192,1392,160L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            <div className="kontakt-container">
                <div className="kontakt-where">
                    <h2 className="kontakt-where-h1">Kontakt os</h2>
                    <div className="kontakt-where-splitter"></div>
                    <h3 className="kontakt-where-h2">Tipsspillet</h3>
                </div>
                <h1 className="kontakt-h1">Kontakt os</h1>
                <p className="kontakt-h3" style={{fontSize: "16px"}}>Vi, hos Tipsspillet, stræber os på at brugeren kan benytte sig af en online betting-platform i alle aldre uden økonomisk risiko.</p>
                <div className="kt-container">
                    <div className="kt-element">
                        <svg xmlns="http://www.w3.org/2000/svg" className="kt-icon" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                        <p className="kt-p">+45 23 96 58 58</p>
                    </div>
                    <div className="kt-element">
                        <svg xmlns="http://www.w3.org/2000/svg" className="kt-icon" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                        <p className="kt-p">madskaiser@tipsspillet.dk</p>
                    </div>
                    <div className="kt-element">
                        <svg xmlns="http://www.w3.org/2000/svg" className="kt-icon" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                        <p className="kt-p">4300 Holbæk, Danmark</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Kontakt;