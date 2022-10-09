import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Header from '../layout/header';
import FaqComponent from '../components/faq';
import axios from "axios";
import { getUser } from "../services/authService";
import cookie from 'js-cookie'

function Success () {

    useEffect(() => {
        if (getUser()) {
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
                "email": getUser().email
            }
    
            axios.post(URL, requestBody, requestConfig).then(response => {
                console.log(response);
                var rolle = "none";
                var rolle_exp = 0;
                if (response.data.session.amount_total === 5900) {
                    rolle_exp = new Date((new Date().getMonth() + 2) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
                    rolle = "premium";
                } else if (response.data.session.amount_total === 3900) {
                    rolle_exp = new Date((new Date().getMonth() + 2) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
                    rolle = "plus";
                } else if (response.data.session.amount_total === 11700) {
                    rolle_exp = new Date((new Date().getMonth() + 4) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
                    rolle = "premium";
                } else if (response.data.session.amount_total === 8700) {
                    rolle_exp = new Date((new Date().getMonth() + 4) + "/" + new Date().getDate() + "/" + new Date().getFullYear());
                    rolle = "plus";
                } else if (response.data.session.amount_total === 34800) {
                    rolle_exp = new Date((new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + (new Date().getFullYear() + 1));
                    rolle = "premium";
                } else if (response.data.session.amount_total === 22800) {
                    rolle_exp = new Date((new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + (new Date().getFullYear() + 1));
                    rolle = "plus";
                }
                var cookieAuth = JSON.parse(cookie.get("auth"));
                cookieAuth.rolle = rolle;
                cookieAuth.rolle_exp = rolle_exp;
                cookie.set("auth", JSON.stringify(cookieAuth), {expires: 7});
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
            })
        }
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