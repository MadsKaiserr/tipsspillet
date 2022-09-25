import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import DownArrow from './img/down-arrow.png';
import Header from './layout/header';
import Router, { useRouter } from 'next/router'
import { getUser } from "./services/authService";
 
function Gruppespil ({data}) {
    const router = useRouter()
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState("Indlæser...");

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

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loading])

    useEffect(() => {
        console.log("AWS - Gruppespil:", data)
        if (!data.notFound) {
            var newArray = [];
            for (var q in data.allGruppespil) {
                if (new Date(data.allGruppespil[q].varighed).getTime() > new Date().getTime()) {
                    newArray.push(data.allGruppespil[q]);
                }
            }
            setItems(newArray);
            setSearch(newArray);
            setLoading("");
        }
    }, [])

    const [currentType, setCurrentType] = useState("alle");

    function gruppespilHandler() {
        if (getUser() ? getUser().email : "") {
            if (getUser() ? getUser().rolle : "" === "premium" || getUser() ? getUser().rolle : "" === "administrator") {
                router.push("/stage/opret-spil");
            } else {
                router.push("/priser");
            }
        } else {
            router.push("/signup");
        }
    }

    return (
        <>
            <Head>
                <title>Find gruppespil og præmiedyster - Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/gruppespil" />
                <meta name="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="gruppespil,betting gruppespil" />
                <meta itemProp="name" content="Tipsspillet Gruppespil" />
                <meta itemProp="description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
                <meta property="og:title" content="Find gruppespil og præmiedyster - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/gruppespil" />
                <meta property="og:description" content="Opret gruppespil eller tilmeld præmiedyster, og dyst gratis mod venner og familie i fodbold-betting med virtuelle penge." />
            </Head>
            <Header />
            <div className="main-modal" id="main-modal">
                <div className="modal-box">
                    <p className="main-modal-h1">Abonnement ikke tilgængeligt</p>
                    <p className="main-modal-h2">Abonnement er på nuværende tidspunkt ikke tilgængeligt for køb. Prøv igen senere...</p>
                    <div className="modal-touch">
                        <button className="nav-btn-default" onClick={() => {document.getElementById("main-modal").classList.remove("display-flex")}}>Tilbage</button>
                    </div>
                </div>
            </div>
            <div className="main-block-container">
                <div className="hero-text">
                    <p className="main-component-p animation-fadeleft">Find gruppespil og præmiedyster</p>
                    <h1 className="main-component-h1 main-gradient animation-fadeleft animation-delay-200">Gruppespil og Dyster</h1>
                    <h2 className="main-component-h3 animation-fadetop animation-delay-300">Find netop det gruppespil der passer dig, eller <span className="color-primary font-weight-500">tilmeld</span> dig et <span className="color-primary font-weight-500">gruppespil</span> med venner og familie.</h2>
                </div>
            </div>
            <div className="td-container">
                <div className="td-type" style={{justifyContent: "flex-end"}}>
                    <div className="td-type-con animation-fadetop" onClick={() => {document.getElementById("type-drop").classList.toggle("display-not")}} style={{animationDelay: "0.5s"}}>
                        Type: <span className="td-type-p">{currentType}</span>
                        <Image width="7px" height="7px" src={DownArrow} alt="Pil ned" className="nav-icon" />
                        <div className="td-type-drop display-not" id="type-drop">
                            <p className="td-type-drop-p" onClick={() => setCurrentType("offentlige")}>Offentlige</p>
                            <p className="td-type-drop-p" onClick={() => setCurrentType("private")}>Private</p>
                            <p className="td-type-drop-p" onClick={() => setCurrentType("dyster")}>Præmiedyster</p>
                            <div className="td-type-drop-divider"></div>
                            <p className="td-type-drop-p" onClick={() => setCurrentType("alle")}>Alle</p>
                        </div>
                    </div>
                </div>
                <div className="td-box animation-fadetop" style={{margin: "auto"}}>
                    <div className="td-top">
                        <div className="td-top-left">
                            <div className="td-input-con">
                                <div className="td-input">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="td-input-icon" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                    <input type="text" className="td-input-field" onChange={event => setQuery(event.target.value)} placeholder="Søg i gruppespil..." />
                                </div>
                                <button className="td-btn-search" style={{marginLeft: "0px", borderRadius: "5px"}} onClick={() => {makeSearch()}}>Søg</button>
                            </div>
                        </div>
                        <div className="td-top-right">
                            <div className="td-radio">
                                <div className="td-radio-element-active">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="var(--softBlack)" opacity={0.6} viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </div>
                                <div className="td-radio-element">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="var(--softBlack)" opacity={0.6} viewBox="0 0 16 16">
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="td-wrapper">
                        <div className="td-modifier">
                            <p className="td-modifier-p modifier-mod" id="td-navn">NAVN</p>
                            <p className="td-modifier-p modifier-mod" id="td-synlighed">SYNLIGHED</p>
                            <p className="td-modifier-p modifier-mod" id="td-spillere">SPILLERE</p>
                            <p className="td-modifier-p modifier-mod" id="td-admin">ADMINISTRATOR</p>
                        </div>
                        <div className="match-loader display" id="stage-loader1"></div>
                        <ul className="td-table">
                            {search.map((item) => {
                                if (currentType === "offentlige") {
                                    if (item.synlighed === "offentlig") {
                                        return (
                                                <li key={item.id} className="tl-element">
                                                    <Link href={"/gruppesession?game=" + item.id}>
                                                        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                                            <div className="tl-wrapper" id="td-navn">
                                                                <div className="tl-img">
                                                                    {item.name.slice(0,1)}
                                                                </div>
                                                                <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                                            </div>
                                                            <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                                            <p className="td-modifier-p" id="td-spillere">{item.players.length}</p>
                                                            <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                        );
                                    }
                                } else if (currentType === "private") {
                                    if (item.synlighed === "privat") {
                                        return (
                                                <li key={item.id} className="tl-element">
                                                    <Link href={"/gruppesession?game=" + item.id}>
                                                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                                        <div className="tl-wrapper" id="td-navn">
                                                            <div className="tl-img">
                                                                {item.name.slice(0,1)}
                                                            </div>
                                                            <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                                        </div>
                                                        <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                                        <p className="td-modifier-p" id="td-spillere">{item.players.length}</p>
                                                        <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                        );
                                    }
                                } else if (currentType === "dyster") {
                                    if (item.synlighed === "dyst") {
                                        return (
                                                <li key={item.id} className="tl-element">
                                                    <Link href={"/gruppesession?game=" + item.id}>
                                                    <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                                        <div className="tl-wrapper" id="td-navn">
                                                            <div className="tl-img">
                                                                {item.name.slice(0,1)}
                                                            </div>
                                                            <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                                        </div>
                                                        <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                                        <p className="td-modifier-p" id="td-spillere">{item.players.length}</p>
                                                        <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                        );
                                    }
                                } else if (currentType === "alle") {
                                    return (
                                            <li key={item.id} className="tl-element">
                                                <Link href={"/gruppesession?game=" + item.id}>
                                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                                    <div className="tl-wrapper" id="td-navn">
                                                        <div className="tl-img">
                                                            {item.name.slice(0,1)}
                                                        </div>
                                                        <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                                    </div>
                                                    <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                                    <p className="td-modifier-p" id="td-spillere">{item.players.length}</p>
                                                    <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                                    </div>
                                                </Link>
                                            </li>
                                    );
                                }
                            })}
                            {currentType === "offentlige" && <>
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
                                            <p className="td-empty-h1">Ingen offentlige gruppespil</p>
                                            <p className="td-empty-cta-p">Find eller opret et gruppespil for at komme igang</p>
                                        </div>
                                    </div>
                                </>}
                            </>}
                            {currentType === "private" && <>
                                {search.filter(function( obj ) { return obj.synlighed === 'privat' && new Date(obj.varighed).getTime() < new Date().getTime() }).length === 0 && <>
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
                                            <p className="td-empty-h1">Ingen private gruppespil</p>
                                            <p className="td-empty-cta-p">Find eller opret et gruppespil for at komme igang</p>
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
                                            <p className="td-empty-h1">Ingen gruppespil</p>
                                            <p className="td-empty-cta-p">Find eller opret et gruppespil for at komme igang</p>
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
                    <p className="find-p">Tilmeld dig offentlige eller private gruppespil, og spil mod venner og familie.</p>
                    <button className="find-btn">Find gruppespil</button>
                    <div className="td-divider">
                        <div className="td-line"></div>
                            <p className="td-or">Eller</p>
                        <div className="td-line"></div>
                    </div>
                    <p className="find-h1">Opret et gruppespil</p>
                        <p className="find-p">Opret dit eget gruppespil, og inviter venner og familie til kamp.</p>
                    <button className="find-btn">Opret gruppespil</button>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    var resp = await axios.get("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil", requestConfig);;
    var data = resp.data;
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
export default Gruppespil;