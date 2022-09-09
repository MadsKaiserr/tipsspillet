import * as React from 'react';
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import Bin from '../img/bin.png';
import Height from '../components/height';
 
function StageIndstillinger () {

    const [dataLoad, setDataLoad] = useState(false);

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [fornavn, setFornavn] = useState("Indlæser...")
    const [efternavn, setEfternavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);

    function apiCall() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user?user="+ localStorage.getItem("email");

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log(response)
            setUser(JSON.stringify(response.data));
            setUsernameField(response.data["username"]);
            setEmailField(response.data["email"]);
            setFornavn(response.data["fornavn"]);
            setEfternavn(response.data["efternavn"]);
            if (response.data.type === "facebook") {
                setFacebook(true);
            }

            const year = new Date(response.data["oprettelse"]).getFullYear();
            const month = new Date(response.data["oprettelse"]).getMonth();
            const day = new Date(response.data["oprettelse"]).getDate();
            setOprettelseText(day + "/" + month + "/" + year);
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    if (dataLoad === false) {
        setTimeout(function (){
            apiCall();
            console.log("API: Called");
        }, 500);
        setDataLoad(true);
    }

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="settings">
                <div className="profil-main-container">
                    <div className="setting-element">
                        <div className="setting-top">
                            <p className="setting-top-p">Brugerindstillinger</p>
                        </div>
                        <div className="setting-wrapper">
                            <div className="settings-element" style={{padding: "7px 0px"}}>
                                <p className="setting-h1">Navn:</p>
                                <p className="setting-h2">{fornavn + " " + efternavn}</p>
                            </div>
                            <div className="settings-element" style={{padding: "7px 0px"}}>
                                <p className="setting-h1">Brugernavn:</p>
                                <p className="setting-h2">{usernameField}</p>
                            </div>
                            <div className="settings-element" style={{padding: "7px 0px"}}>
                                <p className="setting-h1">Email:</p>
                                <p className="setting-h2">{emailField}</p>
                            </div>
                            <div className="settings-element" style={{padding: "7px 0px"}}>
                                <p className="setting-h1">Oprettet:</p>
                                <p className="setting-h2">{oprettelseText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="setting-element">
                        <div className="setting-top">
                            <p className="setting-top-p">Konto</p>
                        </div>
                        <div className="setting-wrapper" style={{gap: "5px"}}>
                            {!facebook && <div className="settings-element" style={{gap: "15px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="setting-icon" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                                <p className="setting-h3">Opsæt konto med Facebook</p>
                            </div>}
                            {facebook && <div className="settings-element" style={{gap: "15px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="setting-icon" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                                <div className="setting-double">
                                    <p className="setting-h3">Konto opsat med facebook</p>
                                    <p className="setting-h4">{emailField}</p>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className="setting-element">
                        <div className="setting-top">
                            <p className="setting-top-p">Slet konto</p>
                        </div>
                        <div className="setting-wrapper" style={{gap: "5px"}}>
                            <div className="settings-element" style={{paddingLeft: "15px", marginLeft: "-15px", width: "calc(100% + 30px)", gap: "15px", backgroundColor: "rgba(205, 61, 100, 0.2)"}}>
                                <Image src={Bin} height="25px" width="25px" />
                                <p className="setting-h3" style={{color: "var(--red)", fontWeight: "600"}}>Slet din konto</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageIndstillinger;