import * as React from 'react';
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import Heart from '../img/heart.png';
import Height from '../components/height';
 
function StageProfil () {

    const [dataLoad, setDataLoad] = useState(false);

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [fornavn, setFornavn] = useState("Indlæser...")
    const [efternavn, setEfternavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favoritter")));
    }, [])

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
                <div className="setting-wrapper" style={{border: "1px #ebebeb solid"}}>
                    <div className="profil-figure">
                        <div className="info-figure1"></div>
                        <div className="info-figure2"></div>
                    </div>
                    <div className="profil-overlay"></div>
                    <div className="setting-profil-wrapper">
                        <div className="setting-profil-billede">
                            <svg xmlns="http://www.w3.org/2000/svg" className="setting-profile-icon" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                            </svg>
                        </div>
                        <p className="setting-profil-h1">{usernameField}</p>
                        <p className="setting-profil-p">Rediger profil</p>
                    </div>
                </div>
                <div className="profil-main-container">
                    <div className="setting-element">
                        <div className="setting-top">
                            <p className="setting-top-p">Følger</p>
                        </div>
                        <div className="setting-wrapper">
                            <ul className="setup-hits">
                                {favorites.map((item) => {
                                    return (
                                        <li key={item.name + item.image}>
                                            <Link href={"/stage/team?team=" + item.id}>
                                                <div className="setup-hit" style={{padding: "10px 5px"}}>
                                                    <div className="setup-hit-wrapper">
                                                        <Image width="25px" height="25px" src={item.image} className="setup-img" />
                                                        <div className="setup-icon-div">
                                                            <Image width="12px" height="12px" src={Heart} />
                                                        </div>
                                                        <p className="setup-p">{item.name}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="setting-element">
                        <div className="setting-top">
                            <p className="setting-top-p">Abonnement</p>
                        </div>
                        <div className="setting-wrapper">
                            <div className="settings-element" style={{padding: "7px 0px"}}>
                                <p className="setting-h1">Navn:</p>
                                <p className="setting-h2">{fornavn + " " + efternavn}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageProfil;