import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from "axios";
import Header from './layout/header';
 
function Email () {

    const handleSubmit = (e) => {
        e.preventDefault()

        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/sendemail";
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }
        const requestBody = {
            toAddress: "mebondekaiser@gmail.com"
        }

        axios.post(URL, requestBody, requestConfig).then(response => {
            console.log("AWS - Sendemail:", response)
        }).catch(error => {
            console.log("Fejl ved indhentning af data " + error)
        })
    }

    return (
        <>
            <Head>
                <title>Køb annulleret - Køb Abonnement | Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Emails</p>
                    <h1 className="main-component-h1 red-gradient animation-fadeleft animation-delay-200">Send en email</h1>
                </div>
            </div>
            <div className="main-container">
                <p className="faq-btn" onClick={(e)=>{handleSubmit(e)}}>Send email</p>
            </div>
        </>
    )
}
 
export default Email;