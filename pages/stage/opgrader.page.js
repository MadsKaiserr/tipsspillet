import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import StageHeader from '../layout/stageheader';
import Height from '../components/height';
import Back from "../components/back.js";
import { getUser } from "../services/authService";
import cookie from 'js-cookie'
 
function StageOpgrader () {

    return (
        <>
            <Head>
                <title>Opgrader Abonnement - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="op-container" style={{background: "var(--surface)"}}>
                <div className="op-content" style={{paddingTop: "30px"}}>
                    <Back />
                    <p className="op-h1">Opgrader abonnement</p>
                    <p className="op-h2">Administrer dit abonnement</p>
                    <div className="nt-content" style={{paddingTop: "20px"}}>
                        <div className="ua-element"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ res, req }) {
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
        return { props: {} };
    };
    if (!req.cookies.auth) {
        sendRedirectLocation('/signup')
    }
    return {
        props: { },
    }
}
 
export default StageOpgrader;