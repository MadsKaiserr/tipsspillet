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
import StageHeader from '../layout/stageheader';
import { getSearch } from '../services/search';
 
function Opret ({ }) {

    const [minSetting, setMinSetting] = useState(false);
    const [maksSetting, setMaksSetting] = useState(false);
    const [indskydelseSetting, setIndskydelseSetting] = useState(true);
    const [leagueSetting, setLeagueSetting] = useState(false);
    const [nav, setNav] = useState("generelt");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [ligasearchStr, setLigaSearchStr] = useState("");

    const [items, setItems] = useState(getSearch());
    const [favorites, setFavorites] = useState([]);

    const [spilNavn, setSpilNavn] = useState("");
    const [password, setPassword] = useState("");
    const [spilVarighed, setVarighed] = useState("");
    const [indskydelse, setIndskydelse] = useState(150);
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
        if (((spilMax > 0 && maksSetting) || (!maksSetting)) && ((spilSynlighed === "privat" && password !== "") || (spilSynlighed === "offentlig")) && ((spilMin >= 0 && minSetting) || (!minSetting)) && spilNavn !== "" && spilVarighed !== "" && spilStart >=0 && ((indskydelse >= 0 && indskydelseSetting) || (!indskydelseSetting))) {
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
                    max_amount: 10000,
                    indskydelse_int: 0,
                    indskydelse_amount: 0,
                    ligaer: [],
                    admin: getUser().username,
                    synlighed: spilSynlighed,
                    password: "",
                    players: [{player: userEmail, username: username, info: {money: spilStart, notifikationer: [], medlemsskab: medlemsskab}, odds: []}]
                }

                if (minSetting) {
                    gruppespilBody.min_amount = spilMin;
                }
                if (maksSetting) {
                    gruppespilBody.max_amount = spilMax;
                }
                if (indskydelseSetting) {
                    gruppespilBody.indskydelse_amount = indskydelse;
                }
                if (leagueSetting) {
                    var leagues = [];
                    for (var q in favorites) {
                        leagues.push(favorites[q].id);
                    }
                    gruppespilBody.ligaer = leagues;
                }
                if (spilSynlighed === "privat") {
                    gruppespilBody.password = password;
                }
        
                axios.post(signupURL, gruppespilBody, gruppespilConfig).then(result => {
                    console.log("AWS - Gruppespil:", result);
                    window.open("/stage/aktive-spil", "_self");
                }).catch(error => {
                    console.log(error);
                    setLoading(false)
                })
            }).catch(error => {
                console.log("Fejl ved indhentning af data" + error)
                setLoading(false)
            })
        } else {
            if ((spilMax <= 0 && maksSetting)) {
                setNav("eco");
                setMessage("Maksbeløb kan ikke være 0 eller negativt");
            } else if ((spilMin < 0 && minSetting)) {
                setNav("eco");
                setMessage("Mininumbeløb kan ikke være negativt");
            } else if (spilNavn === "") {
                setNav("generelt");
                setMessage("Du mangler at angive spillets navn");
            } else if ((spilVarighed > 0 && varighedSetting) === "") {
                setNav("generelt");
                setMessage("Du mangler at angive spillets slutdato");
            } else if (spilStart <= 0) {
                setNav("eco");
                setMessage("Startbeløb kan ikke være 0 eller negativt");
            } else if (spilSynlighed === "privat" && password === "") {
                setMessage("Sæt et kodeord, som spillere skal bruge til at tilmelde sig gruppespillet");
            } else {
                setMessage("Der skete en fejl. Tjek dine input, og kontroller der ikke er brugt bogstaver i tal-input.");
            }
            setLoading(false)
        }
    }

    function addFavorite(id, name, image, liga, type) {
        if (favorites.findIndex(obj => obj.id === id) >= 0) {
            var duppel = favorites;
            duppel.splice((favorites.findIndex(obj => obj.id === id)), 1);
            setFavorites(duppel);
            document.getElementById("klub-" + id + type).classList.remove("setup-checkbox-active");
            document.getElementById("icon-" + id + type).classList.remove("display");
        } else {
            setFavorites([...favorites, {
                "id": id,
                "name": name,
                "image": image,
                "liga": liga,
                "type": type
            }]);
            document.getElementById("klub-" + id + type).classList.add("setup-checkbox-active");
            document.getElementById("icon-" + id + type).classList.add("display");
        }
    }

    return (
        <>
            <Head>
                <title>Opret gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="match-figure" style={{top: "200px"}}>
                <div className="info-figure1"></div>
                <div className="info-figure2"></div>
            </div>
            <div className="stage-main-article-container">
                <div className="gruppespil-section">
                    <p className="op-h1">Opret gruppespil</p>
                    <p className="op-h2">Opret dit eget gruppespil</p>
                    <div className="op-form">
                        <div className="op-form-element">
                            <p className="op-form-p">Gruppespillets navn</p>
                            <input type="text" value={spilNavn} onChange={event => setSpilNavn(event.target.value)} className="op-input" placeholder="Eks. Danbolig's Gruppespil" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Slutdato</p>
                            <input type="date" value={spilVarighed} onChange={event => setVarighed(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Synlighed</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (spilSynlighed === "offentlig"){setSynlighed("privat")}else{setSynlighed("offentlig")}}}>
                                {spilSynlighed === "offentlig" && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg></div>}
                                {spilSynlighed === "privat" && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Offentligt gruppespil</p>
                            </div>
                        </div>
                        {spilSynlighed === "privat" && <div className="op-form-element">
                            <p className="op-form-p">Kodeord til tilmelding</p>
                            <input type="password" value={password} onChange={event => setPassword(event.target.value)} className="op-input" autoComplete='off' />
                        </div>}
                        <div className="op-form-element">
                            <p className="op-form-p">Specielle ligaer</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (leagueSetting){setLeagueSetting(false)}else{setLeagueSetting(true)}}}>
                                {!leagueSetting && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg></div>}
                                {leagueSetting && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Alle ligaer</p>
                            </div>
                        </div>
                        {leagueSetting && <div className="setup-element">
                            <p className="op-form-p" style={{padding: "10px 0px"}}>Ligaer</p>
                            <div className="setup-search">
                                <input type="text" placeholder="Søg" className="setup-input" onChange={event => setLigaSearchStr(event.target.value)} />
                            </div>
                            <ul className="setup-hits">
                                {items.map((item) => {
                                    if (item.type === "liga") {
                                        if (ligasearchStr === "") {
                                            if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox" >
                                                            <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        } else {
                                            if ((item.name.toLowerCase()).includes(ligasearchStr.toLowerCase())) {
                                                if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox" >
                                                                <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            }
                                        }
                                    }
                                })}
                            </ul>
                        </div>}
                        <div className="op-form-element">
                            <p className="op-form-p">Startbeløb</p>
                            <input type="number" value={spilStart} onChange={event => setStart(event.target.value)} className="op-input" placeholder="0" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Minimumsbeløb</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (minSetting){setMinSetting(false)}else{setMinSetting(true)}}}>
                                {minSetting && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg></div>}
                                {!minSetting && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Tilføj minimumsbeløb</p>
                            </div>
                        </div>
                        {minSetting && <div className="op-form-element">
                            <p className="op-form-p">Mininumbeløb</p>
                            <input type="number" value={spilMin} onChange={event => setMin(event.target.value)} className="op-input" placeholder="0" />
                        </div>}
                        <div className="op-form-element">
                            <p className="op-form-p">Maksbeløb</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (maksSetting){setMaksSetting(false)}else{setMaksSetting(true)}}}>
                                {maksSetting && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg></div>}
                                {!maksSetting && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Tilføj maksbeløb</p>
                            </div>
                        </div>
                        {maksSetting && <div className="op-form-element">
                            <p className="op-form-p">Maksbeløb</p>
                            <input type="number" value={spilMax} onChange={event => setMax(event.target.value)} className="op-input" placeholder="0" />
                        </div>}
                        <div className="op-form-element">
                            <p className="op-form-p">Indskydelse</p>
                            <div className="op-box" style={{marginTop: "10px"}} onClick={() => {if (indskydelseSetting){setIndskydelseSetting(false)}else{setIndskydelseSetting(true)}}}>
                                {indskydelseSetting && <div className="op-input-tick-active"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg></div>}
                                {!indskydelseSetting && <div className="op-input-tick"></div>}
                                <p className="op-form-p" style={{fontWeight: "400", fontSize: "14px"}}>Tilføj ugentligt indskydelse</p>
                            </div>
                        </div>
                        {indskydelseSetting && <div className="op-form-element">
                            <p className="op-form-p">Ugentligt indskydelse</p>
                            <input type="number" value={indskydelse} onChange={event => setIndskydelse(event.target.value)} className="op-input" placeholder="0" />
                        </div>}
                    </div>
                    {message !== "" && <p className="form-error">{message}</p>}
                    <button className="wc-btn" onClick={opretHandler}>{loading && <div className="loader" id="loader"></div>}{!loading && <>Opret Gruppespil</>}</button>
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