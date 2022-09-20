import * as React from 'react';
import { useState, useEffect } from 'react';
import { getUser } from "../services/authService";
import axios from "axios";
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Height from '../components/height';
import PrimaryLogo from '../img/logo-primary.png';
import { Gradient } from '../services/Gradient.js'
 
function Opret ({ }) {
    const router = useRouter()

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [spilNavn, setSpilNavn] = useState("");
    const [spilVarighed, setVarighed] = useState("");
    const [indskydelse, setIndskydelse] = useState(0);
    const [spilStart, setStart] = useState(1000);
    const [spilMin, setMin] = useState(0);
    const [spilMax, setMax] = useState(10000);
    const [spilSynlighed, setSynlighed] = useState("offentlig");

    useEffect(() => {
        if (document.getElementById("navn")) {
            document.getElementById("navn").classList.remove("cg-error");
            setMessage("")
        }
    }, [spilNavn])

    useEffect(() => {
        if (document.getElementById("min")) {
            document.getElementById("min").classList.remove("cg-error");
            setMessage("")
        }
    }, [spilMin])

    useEffect(() => {
        if (document.getElementById("maks")) {
            document.getElementById("maks").classList.remove("cg-error");
            setMessage("")
        }
    }, [spilMax])

    useEffect(() => {
        if (document.getElementById("start")) {
            document.getElementById("start").classList.remove("cg-error");
            setMessage("")
        }
    }, [spilStart])

    useEffect(() => {
        if (document.getElementById("varighed")) {
            document.getElementById("varighed").classList.remove("cg-error");
            setMessage("")
        }
    }, [spilVarighed])

    useEffect(() => {
        if (document.getElementById("indskydelse")) {
            document.getElementById("indskydelse").classList.remove("cg-error");
            setMessage("")
        }
    }, [indskydelse])

    const opretHandler = (e) => {
        e.preventDefault()
        setLoading(true)
        const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession";
        const user_email = getUser().email;
        if (((spilMax > 0 && maksSetting) || (!maksSetting)) && ((spilMin > 0 && minSetting) || (!minSetting)) && spilNavn !== "" && spilVarighed !== "" && spilStart >=0 && ((indskydelse > 0 && indskydelseSetting) || (!indskydelseSetting))) {
            setMessage("");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/playergruppespil?player=" + user_email;

            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }

            axios.get(URL, requestConfig).then(response => {
                console.log("AWS - Gruppespil:", response)
                    var gCount = 0;
                    for (var y in response.data.allGruppespil) {
                        var varighedDate = new Date(response.data.allGruppespil[y].varighed).getTime();
                        var nowDate = new Date().getTime();
                        if (nowDate < varighedDate) {
                            gCount = gCount + 1;
                        }
                    }
                    if (gCount >= 4) {
                        setMessage("Du har allerede 5 aktive spil, og du kan derfor ikke oprette flere.");
                        setLoading(false)
                    } else {
                        const gruppespilConfig = {
                            headers: {
                                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                            }
                        }
                
                        var medlemsskab;
                        var userEmail;
                        var username;
                        
                        if (getUser().email) {
                            medlemsskab = getUser().rolle;
                            userEmail = getUser().email;
                            username = getUser().username;
                        } else {
                            medlemsskab = "none";
                            userEmail = "Ukendt";
                            username = "Ukendt";
                        }
                
                        const gruppespilBody = {
                            name: spilNavn,
                            varighed: spilVarighed,
                            start_amount: spilStart,
                            min_amount: 0,
                            max_amount: 0,
                            weeks: 0,
                            weeks_amount: 0,
                            bankerot_tilstand: "tilskuer",
                            bankerot_belob: "0",
                            admin: getUser().username,
                            synlighed: spilSynlighed,
                            players: [{player: userEmail, username: username, info: {money: spilStart, notifikationer: [], medlemsskab: medlemsskab}, odds: []}]
                        }

                        if (minSetting) {
                            gruppespilBody.min_amount = spilMin;
                        }
                        if (maksSetting) {
                            gruppespilBody.max_amount = spilMax;
                        }
                        if (indskydelseSetting) {
                            gruppespilBody.weeks_amount = indskydelse;
                        }
                
                        axios.post(signupURL, gruppespilBody, gruppespilConfig).then(result => {
                            console.log("AWS - Gruppespil:", result);
                            window.open("/stage/aktive-spil", "_self");
                        }).catch(error => {
                            console.log(error);
                            setLoading(false)
                        })
                    }
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
                setLoading(false)
            })
        } else {
            if ((spilMax > 0 && maksSetting)) {
                setMessage("Maksbeløb kan ikke være 0 eller negativt");
                document.getElementById("maks").classList.add("cg-error");
            } else if ((spilMin > 0 && minSetting)) {
                setMessage("Mininumbeløb kan ikke være negativt");
                document.getElementById("min").classList.add("cg-error");
            } else if (spilNavn === "") {
                setMessage("Du mangler at afgive spillets navn");
                document.getElementById("navn").classList.add("cg-error");
            } else if ((spilVarighed > 0 && varighedSetting) === "") {
                setMessage("Du mangler at afgive spillets slutdato");
                document.getElementById("varighed").classList.add("cg-error");
            } else if (spilStart <= 0) {
                setMessage("Startbeløb kan ikke være 0 eller negativt");
                document.getElementById("start").classList.add("cg-error");
            } else {
                setMessage("Der skete en fejl. Tjek dine input, og kontroller der ikke er brugt bogstaver i tal-input.");
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        const gradient = new Gradient()
        gradient.initGradient('#gradient-canvas')
    }, [])

    const [minSetting, setMinSetting] = useState(false);
    const [maksSetting, setMaksSetting] = useState(false);
    const [indskydelseSetting, setIndskydelseSetting] = useState(true);

    return (
        <>
            <Head>
                <title>Opret gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Height />
            <div className="route-thirds">
                <div className="signup-tilbage" onClick={() => window.open("/stage/aktive-spil", "_SELF")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="var(--black)" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    <p className="signup-tilbage-p">Tilbage til gruppespil</p>
                </div>
                <div className="route-thirds-element-1" id="third">
                    <div className="signup-popup" id="info1">
                        <div className="cg-info">
                            <h1 className="cg-h1">Opret et gruppespil</h1>
                            <h2 className="cg-h2">Opstil indstillinger til dit gruppespil.</h2>
                        </div>
                        <form onSubmit={opretHandler} className="cg-form">
                            <input type="text" autoComplete="off" className="cg-input" id="navn" value={spilNavn} placeholder="Spillets navn" onChange={event => setSpilNavn(event.target.value)} />
                            <input type="date" autoComplete="off" className="cg-input" id="varighed" value={spilVarighed} onChange={event => setVarighed(event.target.value)} placeholder="Slutdato" />
                            <div className="cg-settings">
                                <div className="cg-setting" onClick={() => {if(spilSynlighed === "offentlig"){setSynlighed("privat")}else{setSynlighed("offentlig")}}}>
                                    <div className="cg-setting-info">
                                        <div className="cg-setting-pic">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                            </svg>
                                        </div>
                                        <div className="cg-setting-text">
                                            <p className="cg-setting-h1">Synlighed</p>
                                            <p className="cg-setting-h2">Private gruppespil kræver adgangskode</p>
                                        </div>
                                    </div>
                                    <div className="cg-cta">
                                        {spilSynlighed === "privat" && <p className="cg-cta-p-active">Privat</p>}
                                        {spilSynlighed === "offentlig" && <p className="cg-cta-p">Offentlig</p>}
                                    </div>
                                </div>
                                <div className="cg-setting" style={{cursor: "not-allowed"}}>
                                    <div className="cg-setting-info">
                                        <div className="cg-setting-pic">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" viewBox="0 0 16 16">
                                                <path d="M7.964 1.527c-2.977 0-5.571 1.704-6.32 4.125h-.55A1 1 0 0 0 .11 6.824l.254 1.46a1.5 1.5 0 0 0 1.478 1.243h.263c.3.513.688.978 1.145 1.382l-.729 2.477a.5.5 0 0 0 .48.641h2a.5.5 0 0 0 .471-.332l.482-1.351c.635.173 1.31.267 2.011.267.707 0 1.388-.095 2.028-.272l.543 1.372a.5.5 0 0 0 .465.316h2a.5.5 0 0 0 .478-.645l-.761-2.506C13.81 9.895 14.5 8.559 14.5 7.069c0-.145-.007-.29-.02-.431.261-.11.508-.266.705-.444.315.306.815.306.815-.417 0 .223-.5.223-.461-.026a.95.95 0 0 0 .09-.255.7.7 0 0 0-.202-.645.58.58 0 0 0-.707-.098.735.735 0 0 0-.375.562c-.024.243.082.48.32.654a2.112 2.112 0 0 1-.259.153c-.534-2.664-3.284-4.595-6.442-4.595Zm7.173 3.876a.565.565 0 0 1-.098.21.704.704 0 0 1-.044-.025c-.146-.09-.157-.175-.152-.223a.236.236 0 0 1 .117-.173c.049-.027.08-.021.113.012a.202.202 0 0 1 .064.199Zm-8.999-.65a.5.5 0 1 1-.276-.96A7.613 7.613 0 0 1 7.964 3.5c.763 0 1.497.11 2.18.315a.5.5 0 1 1-.287.958A6.602 6.602 0 0 0 7.964 4.5c-.64 0-1.255.09-1.826.254ZM5 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                                            </svg>
                                        </div>
                                        <div className="cg-setting-text">
                                            <p className="cg-setting-h1">Startbeløb</p>
                                            <p className="cg-setting-h2">Startbeløb hver ny spiller start med</p>
                                        </div>
                                    </div>
                                    <div className="cg-cta" style={{opacity: "0.6"}}>
                                        <p className="cg-cta-p-active">Til</p>
                                    </div>
                                </div>
                                <input type="text" autoComplete="off" id="start" onChange={event => setStart(parseInt(((event.target.value.replace(".", "")).replace(",", ""))))} className="cg-input" style={{fontSize: "14px", margin: "0px 10px", width: "calc(100% - 20px)", marginBottom: "10px"}} placeholder="Ex. 150" />
                                <div className="cg-setting" onClick={() => {if(minSetting){setMinSetting(false)}else{setMinSetting(true)}}}>
                                    <div className="cg-setting-info">
                                        <div className="cg-setting-pic">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" viewBox="0 0 16 16">
                                                <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm4 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
                                            </svg>
                                        </div>
                                        <div className="cg-setting-text">
                                            <p className="cg-setting-h1">Minimum beløb</p>
                                            <p className="cg-setting-h2">Minimumbeløb pr. væddemål</p>
                                        </div>
                                    </div>
                                    <div className="cg-cta">
                                        {minSetting && <p className="cg-cta-p-active">Til</p>}
                                        {!minSetting && <p className="cg-cta-p">Fra</p>}
                                    </div>
                                </div>
                                {minSetting && <input type="text" autoComplete="off" id="min" onChange={event => setMin(parseInt(((event.target.value.replace(".", "")).replace(",", ""))))} className="cg-input" style={{fontSize: "14px", margin: "0px 10px", width: "calc(100% - 20px)", marginBottom: "10px"}} placeholder="Ex. 150" />}
                                <div className="cg-setting" onClick={() => {if(maksSetting){setMaksSetting(false)}else{setMaksSetting(true)}}}>
                                    <div className="cg-setting-info">
                                        <div className="cg-setting-pic">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" viewBox="0 0 16 16">
                                                <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z"/>
                                            </svg>
                                        </div>
                                        <div className="cg-setting-text">
                                            <p className="cg-setting-h1">Maksimum beløb</p>
                                            <p className="cg-setting-h2">Maksimumbeløb pr. væddemål</p>
                                        </div>
                                    </div>
                                    <div className="cg-cta">
                                        {maksSetting && <p className="cg-cta-p-active">Til</p>}
                                        {!maksSetting && <p className="cg-cta-p">Fra</p>}
                                    </div>
                                </div>
                                {maksSetting && <input type="text" autoComplete="off" id="maks" onChange={event => setMax(parseInt(((event.target.value.replace(".", "")).replace(",", ""))))} className="cg-input" style={{fontSize: "14px", margin: "0px 10px", width: "calc(100% - 20px)", marginBottom: "10px"}} placeholder="Ex. 150" />}
                                <div className="cg-setting" onClick={() => {if(indskydelseSetting){setIndskydelseSetting(false)}else{setIndskydelseSetting(true)}}}>
                                    <div className="cg-setting-info">
                                        <div className="cg-setting-pic">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                                            </svg>
                                        </div>
                                        <div className="cg-setting-text">
                                            <p className="cg-setting-h1">Indskydelse</p>
                                            <p className="cg-setting-h2">Mængde spillere skal modtage hver uge</p>
                                        </div>
                                    </div>
                                    <div className="cg-cta">
                                        {indskydelseSetting && <p className="cg-cta-p-active">Til</p>}
                                        {!indskydelseSetting && <p className="cg-cta-p">Fra</p>}
                                    </div>
                                </div>
                                {indskydelseSetting && <input autoComplete="off" type="text" id="indskydelse" className="cg-input" onChange={event => setIndskydelse(parseInt(((event.target.value.replace(".", "")).replace(",", ""))))} style={{fontSize: "14px", margin: "0px 10px", width: "calc(100% - 20px)", marginBottom: "10px"}} placeholder="Ex. 150" />}
                            </div>
                            {!indskydelseSetting && <p className="cg-h2" style={{fontSize: "12px", maxWidth: "100%", padding: "5px 0px"}}>BEMÆRK: Uden indskydelse hver uge, vil spillere potentielt ikke kunne være med, hvis de taber alle deres penge.</p>}
                            <div className="form-btn">
                                {message !== "" && <p className="form-error">{message}</p>}
                                <button value="Login" className="main-btn-login" style={{width: "100%"}} type="submit">{loading && <div className="loader" id="loader"></div>}{!loading && <>Opret gruppespil</>}</button>
                            </div>
                        </form>
                    </div>
                    <p className="footer-copyright" style={{position: "absolute", bottom: "5px", opacity: "0.3"}}>©2022 Alle rettigheder forbeholdes | Mads Kaiser</p>
                </div>
                <div className="route-thirds-element-2">
                    <canvas className="canvas-container-signup" id="gradient-canvas" data-transition-in></canvas>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ res, req, query }) {
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
    if (JSON.parse(req.cookies.auth).rolle === "none") {
        sendRedirectLocation('/priser');
    }
    return {
        props: { },
    }
}
 
export default Opret;