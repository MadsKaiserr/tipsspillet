import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '../layout/header';
import FaqComponent from '../components/faq';
import axios from "axios";
import { getUser } from "../services/authService";

function Success () {

    useEffect(() => {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/retrieve";
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const session_id = urlParams.get('session_id');

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody = {
            "session_key": session_id,
            "email": getUser() ? getUser().email : ""
        }

        axios.post(URL, requestBody, requestConfig).then(response => {
            console.log(response);
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Køb gennemført - Køb Abonnement | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Gennemført køb</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Tak for dit køb!</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Dit abonnement vil blive aktiveret indenfor få timer. Oplever du problemer, bedes du kontakte os.</h2>
                </div>
                <Link href="/stage"><a className="faq-btn">Begynd at bette</a></Link>
            </div>
            <div className="priser-container">
                
            </div>
            <FaqComponent />
        </>
    )
}
 
export default Success;