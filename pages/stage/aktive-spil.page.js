import * as React from 'react';
import { useState, useEffect } from 'react';
import { getUser } from "../services/authService";
import axios from "axios";
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
import Height from '../components/height';
import DownArrow from './../img/down-arrow.png';
import cookie from 'js-cookie'
 
function StageAktiveSpil ({ data }) {
    const router = useRouter()

    useEffect(() => {
        console.log("AWS - Gruppespil:", data)
        var myArray = [];
        for (var q in data.allGruppespil) {
            if (data.allGruppespil[q].players.findIndex(obj => obj.player === getUser().email) >= 0) {
                myArray.push(data.allGruppespil[q]);
            }
        }
        setItems(myArray);
        setSearch(myArray);
        setLoading("");
    }, [])

    const [query, setQuery] = useState("");

    const [search, setSearch] = useState([]);

    function makeSearch() {
        var dupli = items;
        var newDupli = [];
        if (query !== "") {
            for (var q in dupli) {
                if (dupli[q].name.includes(query)) {
                    newDupli.push(dupli[q]);
                }
            }
        } else {
            newDupli = dupli;
        }
        setSearch(newDupli);
    }

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState("Indlæser...")

    const [nav, setNav] = useState("alle");

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loading])

    function setActiveGame(id, index, name, notifikationer) {
        cookie.set("activeGame", id, {expires: 7});
        cookie.set("notifikationer", notifikationer, {expires: 7});
        localStorage.setItem("activeGame", id);
        localStorage.setItem("playerIndex", index);
        localStorage.setItem("aktive-spil-suspend", "null");
        router.push("/stage")
    }

    const [modalh1, setModalH1] = useState("Benyt adgangsbillet");
    const [modalh2, setModalH2] = useState("Det ser ud til, at du ikke har noget abonnement til at oprette gruppespil. Vil du gøre brug af en af dine adgangsbilletter istedet?");

    function showModal() {
        setModalH1("Opgrader abonnement");
        setModalH2('Opgrader dit abonnement for at få adgang til at oprette gruppespil, eller køb en adgangsbillet under "Priser".');
        document.getElementById("main-modal").classList.add("display-flex");
    }

    function opretSpilHandler() {
        if (getUser().rolle !== "none") {
            router.push("/stage/opret")
        } else {
            router.push("/priser")
        }
    }

    const [messageType, setMessageType] = useState("error-con-error");

    function setNotiMessage(type, heading, message) {
    window.scrollTo(0, 0)
        if (type === "error") {
            setMessageType("error-con-error");
            document.getElementById("errorIcon").classList.add("display");
        } else if (type === "success") {
            document.getElementById("errorIcon").classList.remove("display");
            setMessageType("error-con-success");
        }
        document.getElementById("errorCon").classList.add("display");
        document.getElementById("errorConH").innerHTML = heading;
        document.getElementById("errorConP").innerHTML = message;
    }

    function billetHandler() {
        const user_email = getUser() ? getUser().email : "";
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/adgangsbilletter?player=" + user_email;
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Adgangsbilletter:", response);
            if (response.data.adgangsbilletter.length > 0) {
                var foundBillet = false;
                var billetIndex = -1;
                for (var i in response.data.adgangsbilletter) {
                    if (response.data.adgangsbilletter[i].used === false && response.data.adgangsbilletter[i].type === "gruppespil") {
                        foundBillet = true;
                        billetIndex = parseInt(i);
                    }
                }
                if (foundBillet === true && billetIndex >= 0) {
                    const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/adgangsbilletter";
                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "player": user_email,
                        "index": billetIndex
                    }

                    axios.patch(URL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Adgangsbilletter:", response)
                        document.getElementById("main-modal").classList.remove("display-flex");
                        router.push("/stage/opret-spil")
                    }).catch(error => {
                        console.log("Fejl ved indhentning af data" + error)
                        setNotiMessage("error", "Serverfejl", "Der skete en fejl ved opdatering af din billet.");
                        document.getElementById("main-modal").classList.remove("display-flex");
                    })
                } else {
                    document.getElementById("main-modal").classList.remove("display-flex");
                    setNotiMessage("error", "Ingen billetter", "Det ser ud til, at du ikke har nogle gruppespil-adgangsbilletter. Du kan købe dem under 'Priser'.");
                }
            } else {
                document.getElementById("main-modal").classList.remove("display-flex");
                setNotiMessage("error", "Ingen billetter", "Det ser ud til, at du ikke har nogle adgangsbilletter. Du kan købe dem under 'Priser'.");
            }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    const [currentType, setCurrentType] = useState("alle");

    function getTopN(arr, n) {
        var clone = arr.slice(0);
        // sort descending
        clone.sort(function(x, y) {
            if (x.info.money === y.info.money) return 0;
            else if (parseInt(x.info.money) < parseInt(y.info.money)) return 1;
            else return -1;
        });
        return clone.slice(0, n);
    }

    return (
        <>
            <Head>
                <title>Aktive spil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            {/* <div className="match-figure" id="">
                <div className="info-figure1"></div>
                <div className="info-figure2"></div>
            </div> */}
            <div className="main-modal" id="main-modal">
                <div className="modal-box">
                    <p className="main-modal-h1">{modalh1}</p>
                    <p className="main-modal-h2">{modalh2}</p>
                    <div className="modal-touch">
                        <p className="nav-btn-outline" onClick={() => {setModalH1("");setModalH2("");document.getElementById("main-modal").classList.remove("display-flex")}}>Fortryd</p>
                        <Link href="/priser"><button className="nav-btn-default">Se abonnementer</button></Link>
                    </div>
                </div>
            </div>
            <div className="gr-container">
                <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div className="error-text">
                        <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                        <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                    </div>
                </div>
                <div className="td-type">
                    <h1 className="td-h1">Dine gruppespil</h1>
                    <div className="td-btns">
                    <div className="td-type-con animation-fadetop" style={{background: "var(--primary"}} onClick={() => opretSpilHandler()}><span className="td-type-p" style={{color: "#fff"}}>Opret gruppespil</span></div>
                        <div className="td-type-con animation-fadetop" onClick={() => {document.getElementById("type-drop").classList.toggle("display-not")}}>
                            Type: <span className="td-type-p">{currentType}</span>
                            <Image width="7px" height="7px" src={DownArrow} alt="Pil ned" className="nav-icon" />
                            <div className="td-type-drop display-not" id="type-drop">
                                <p className="td-type-drop-p" onClick={() => setCurrentType("gruppespil")}>Gruppespil</p>
                                <p className="td-type-drop-p" onClick={() => setCurrentType("afsluttede")}>Afsluttede</p>
                                <p className="td-type-drop-p" onClick={() => setCurrentType("dyster")}>Præmiedyster</p>
                                <div className="td-type-drop-divider"></div>
                                <p className="td-type-drop-p" onClick={() => setCurrentType("alle")}>Alle</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="td-box animation-fadetop" style={{margin: "auto", minHeight: "300px", backgroundColor: "transparent", paddingLeft: "0px", paddingRight: "0px", boxShadow: "none"}}>
                    <div className="td-wrapper">
                        <div className="match-loader display" id="stage-loader1"></div>
                        <ul className="td-table" style={{maxHeight: "none", gap: "10px"}}>
                            {search.map((item) => {
                                const index = item.players.findIndex(obj => obj.player === getUser().email);
                                var Facebooks = 0;
                                var facebookArray = [];
                                var activeKupon = 0;
                                for (var u in item.players) {
                                    if (item.players[u].fb_logo_id) {
                                        Facebooks = Facebooks + 1;
                                        facebookArray.push(item.players[u]);
                                    }
                                    if (item.players[u].player === getUser().email) {
                                        for (var q in item.players[u].odds) {
                                            if (item.players[u].odds[q].calculated === "false") {
                                                activeKupon = activeKupon + 1;
                                            }
                                        }
                                    }
                                }
                                var position = 0;
                                var topScorers = getTopN(item.players, item.players.length);
                                topScorers.forEach(function(gameItem, index2) {
                                    if (gameItem.player === getUser().email) {
                                        position = index2 + 1;
                                    }
                                });

                                var returnable = 
                                <li key={item.id} className="as-element" onClick={() => setActiveGame(item.id, index, item.name, item.players[index].info.notifikationer.length)}>
                                    <div>
                                        <p className="as-h1">{item.name}</p>
                                        <p className="as-h2">Spillet slutter {new Date(item.varighed).getDate().toString().padStart(2, '0') + "/" + (new Date(item.varighed).getMonth() + 1).toString().padStart(2, '0') + "/" + new Date(item.varighed).getFullYear().toString().padStart(2, '0')}</p>
                                        <div className="hero-info">
                                            <div className="hero-info-block">
                                                <p className="hero-info-block-h1">{item.players.length}</p>
                                                <p className="hero-info-block-h2">Spillere</p>
                                            </div>
                                            <div className="hero-info-block">
                                                <p className="hero-info-block-h1">{position}</p>
                                                <p className="hero-info-block-h2">Din position</p>
                                            </div>
                                            <div className="hero-info-block">
                                                <p className="hero-info-block-h1">{activeKupon}</p>
                                                <p className="hero-info-block-h2">Aktive kuponer</p>
                                            </div>
                                        </div>
                                    </div>
                                    {cookie.get("activeGame") && <>
                                        {cookie.get("activeGame") === item.id && <><button className="td-outline">Allerede aktivt</button></>}
                                        {cookie.get("activeGame") !== item.id && <><button className="td-btn">Sæt som aktiv</button></>}
                                    </>}
                                    {!cookie.get("activeGame") && <><button className="td-btn">Sæt som aktiv</button></>}
                                </li>;
                                if (currentType === "alle") {
                                    if (new Date(item.varighed).getTime() > new Date().getTime()) {
                                        return returnable;
                                    }
                                } else if (currentType === "gruppespil") {
                                    if ((item.synlighed === "offentlig" || item.synlighed === "privat") && new Date(item.varighed).getTime() > new Date().getTime()) {
                                        return returnable;
                                    }
                                } else if (currentType === "afsluttede") {
                                    if (new Date(item.varighed).getTime() < new Date().getTime()) {
                                        return returnable;
                                    }
                                } else if (currentType === "dyster") {
                                    if (item.synlighed === "dyst" && new Date(item.varighed).getTime() > new Date().getTime()) {
                                        return returnable;
                                    }
                                }
                            })}
                            {currentType === "alle" && <>
                                {search.filter(function( obj ) { return new Date(obj.varighed).getTime() > new Date().getTime() }).length === 0 && <>
                                    <div className="td-empty-container">
                                        <div className="td-empty-bg"></div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-cta">
                                            <p className="td-empty-h1">Ingen aktive gruppespil</p>
                                            <p className="td-empty-cta-p">Find eller opret et gruppespil for at komme igang</p>
                                            <Link href="/gruppespil"><a className="find-btn">Find gruppespil</a></Link>
                                        </div>
                                    </div>
                                </>}
                            </>}
                            {currentType === "gruppespil" && <>
                                {search.filter(function( obj ) { return obj.synlighed === 'offentlig' && new Date(obj.varighed).getTime() > new Date().getTime() }).length === 0 && <>
                                    <div className="td-empty-container">
                                        <div className="td-empty-bg"></div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-cta">
                                            <p className="td-empty-h1">Ingen aktive gruppespil</p>
                                            <p className="td-empty-cta-p">Find eller opret et gruppespil for at komme igang</p>
                                            <Link href="/gruppespil"><a className="td-empty-cta-p" style={{color: "var(--primary)", fontWeight: "500"}}>Find gruppespil</a></Link>
                                        </div>
                                    </div>
                                </>}
                            </>}
                            {currentType === "afsluttede" && <>
                                {search.filter(function( obj ) { return new Date(obj.varighed).getTime() < new Date().getTime() }).length === 0 && <>
                                    <div className="td-empty-container">
                                        <div className="td-empty-bg"></div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-cta">
                                            <p className="td-empty-h1">Ingen afsluttede gruppespil</p>
                                            <p className="td-empty-cta-p">Du har ingen afsluttede gruppespil</p>
                                        </div>
                                    </div>
                                </>}
                            </>}
                            {currentType === "dyster" && <>
                                {search.filter(function( obj ) { return obj.synlighed === 'dyst' && new Date(obj.varighed).getTime() > new Date().getTime() }).length === 0 && <>
                                    <div className="td-empty-container">
                                        <div className="td-empty-bg"></div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-element" style={{marginLeft: "-50px"}}>
                                            <div className="td-empty-logo">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#fff" viewBox="0 0 16 16">
                                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                                </svg>
                                            </div>
                                            <div className="td-empty-p"></div>
                                        </div>
                                        <div className="td-empty-cta">
                                            <p className="td-empty-h1">Ingen aktive dyster</p>
                                            <p className="td-empty-cta-p">Find aktive præmiedyster for at komme igang</p>
                                        </div>
                                    </div>
                                </>}
                            </>}
                        </ul>
                    </div>
                </div>
                <div className="td-spacer animation-fadetop"></div>
                <div className="td-box animation-fadetop" style={{margin: "auto"}}>
                    <p className="find-h1">Find nye gruppespil</p>
                    <p className="find-p">Tilmeld dig offentlige eller private gruppespil, og spil mod familie og venner.</p>
                    <Link href="/gruppespil"><button className="find-btn">Find nyt gruppespil</button></Link>
                    <div className="td-divider">
                        <div className="td-line"></div>
                            <p className="td-or">Eller</p>
                        <div className="td-line"></div>
                    </div>
                    <p className="find-h1">Opret et gruppespil</p>
                        <p className="find-p">Opret dit eget gruppespil, og inviter familie og venner til kamp.</p>
                        <button className="find-btn" onClick={() => opretSpilHandler()}>Opret gruppespil</button>
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
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    const resp = await axios.get('https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil', requestConfig);
    const data = resp.data;
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
 
export default StageAktiveSpil;