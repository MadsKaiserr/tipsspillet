import { useState, useEffect } from 'react';
import axios from "axios";
import { getUser } from "../../services/authService";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../../layout/stageheader';
import Height from '../../components/height';
import cookie from 'js-cookie'
import Back from "../../components/back.js";
 
function GruppespilIndstillinger ({data}) {

    const [allowed, setAllowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const [gsName, setGsName] = useState("");
    const [gsId, setGsId] = useState("");
    const [gsNameCopy, setGsNameCopy] = useState("");
    const [gsVarighed, setGsVarighed] = useState("");
    const [gsIndskydelse, setGsIndskydelse] = useState(0);
    const [gsSynlighed, setGsSynlighed] = useState(0);
    const [gsPassword, setGsPassword] = useState("");

    useEffect(() => {
        setGsName(data.name);
        setGsNameCopy(data.name);
        setGsVarighed(data.varighed);
        setGsIndskydelse(data.indskydelse_amount);
        setGsSynlighed(data.synlighed);
        setGsId(data.id);
        if (data.admin === getUser().username) {
            setAllowed(true);
        }
    }, [])

    function updateGruppespil() {
        setLoading(true);
        const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updategruppespil";
        const requestConfig2 = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        const requestBody2 = {
            name: gsName,
            id: gsId,
            varighed: gsVarighed,
            indskydelse: gsIndskydelse,
            synlighed: gsSynlighed,
            password: gsPassword
        }
        console.log(requestBody2)
        axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
            console.log("AWS - Update gruppespil:", response);
            setMessage("Gruppespillet blev opdateret");
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setMessage("Der skete en fejl under opdatering af gruppespil");
            setLoading(false);
        })
    }

    return (
        <>
            <Head>
                <title>Gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="match-figure" style={{top: "100px"}}>
                <div className="info-figure1"></div>
                <div className="info-figure2"></div>
            </div>
            <div className="stage-main-article-container">
                <Back />
                {allowed && <div className="gruppespil-section">
                    <p className="op-h1">{gsNameCopy}</p>
                    <p className="op-h2">Gruppespillets indstillinger</p>
                    <div className="op-form">
                        {/* <div className="op-form-element">
                            <p className="op-form-p">Spillets navn</p>
                            <input type="text" value={gsName} onChange={event => setGsName(event.target.value)} className="op-input" />
                        </div> */}
                        <div className="op-form-element">
                            <p className="op-form-p">Slutdato</p>
                            <input type="date" value={gsVarighed} onChange={event => setGsVarighed(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Ugentlig indskydelse</p>
                            <input type="number" value={gsIndskydelse} onChange={event => setGsIndskydelse(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Synlighed</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (gsSynlighed === "offentlig"){setGsSynlighed("privat")}else{setGsSynlighed("offentlig")}}}>
                                {gsSynlighed === "offentlig" && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg></div>}
                                {gsSynlighed === "privat" && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Offentligt gruppespil</p>
                            </div>
                        </div>
                        {gsSynlighed === "privat" && <div className="op-form-element">
                            <p className="op-form-p">Kodeord til tilmelding</p>
                            <input type="password" value={gsPassword} placeholder="******" onChange={event => setGsPassword(event.target.value)} className="op-input" autoComplete='off' />
                        </div>}
                    </div>
                    {message !== "" && <p className="og-msg" style={{textAlign: "left"}}>{message}</p>}
                    <button className="wc-btn" onClick={() => updateGruppespil()}>{loading && <div className="loader" id="loader"></div>}{!loading && <>Opdater Gruppespil</>}</button>
                </div>}
                {!allowed && <div className="gruppespil-section" style={{fontSize: "14px"}}>
                    Der skete en fejl... Prøv at genindlæse siden, eller kontakt os, hvis du er den rette administrator af dette gruppespil.
                </div>}
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
        return { props: {} };
    };
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=11'
    )
    if (!req.cookies.auth) {
        sendRedirectLocation('/signup')
    }
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    var resp;
    var data = {};
    if (req.cookies.activeGame) {
        resp = await axios.get("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + req.cookies.activeGame, requestConfig);
        var data = resp.data;
    }
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
 
export default GruppespilIndstillinger;