import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
 
function Gruppespil () {

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
        apiCall()
    }, [])

    function apiCall() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Gruppespil:", response)
            var newArray = [];
            for (var q in response.data.allGruppespil) {
                if (new Date(response.data.allGruppespil[q].varighed).getTime() > new Date().getTime()) {
                    newArray.push(response.data.allGruppespil[q]);
                }
            }
            setItems(newArray);
            setSearch(newArray);
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    const [currentType, setCurrentType] = useState("alle");

    function setType(type) {
        if (type === "offentlige") {
            document.getElementById("offentlige").className = "td-input-element-active";
            document.getElementById("private").className = "td-input-element";
            document.getElementById("dyster").className = "td-input-element";
            document.getElementById("alle").className = "td-input-element";
            setCurrentType("offentlige");
        } else if (type === "private") {
            document.getElementById("private").className = "td-input-element-active";
            document.getElementById("offentlige").className = "td-input-element";
            document.getElementById("dyster").className = "td-input-element";
            document.getElementById("alle").className = "td-input-element";
            setCurrentType("private");
        } else if (type === "alle") {
            document.getElementById("alle").className = "td-input-element-active";
            document.getElementById("offentlige").className = "td-input-element";
            document.getElementById("private").className = "td-input-element";
            document.getElementById("dyster").className = "td-input-element";
            setCurrentType("alle");
        } else if (type === "dyster") {
            document.getElementById("alle").className = "td-input-element";
            document.getElementById("dyster").className = "td-input-element-active";
            document.getElementById("offentlige").className = "td-input-element";
            document.getElementById("private").className = "td-input-element";
            setCurrentType("dyster");
        }
    }

    function gruppespilHandler() {
        if (localStorage.getItem("auth")) {
            if (JSON.parse(localStorage.getItem("auth")).rolle === "premium" || JSON.parse(localStorage.getItem("auth")).rolle === "administrator") {
                window.open("/stage/opret-spil", "_SELF");
            } else {
                window.open("/priser", "_SELF");
            }
        } else {
            window.open("/signup", "_SELF");
        }
    }

    return (
        <>
            <div className="td-container">
                <div className="td-box animation-fadetop" style={{animationDelay: "0.5s"}}>
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
                            <div className="td-input-max">
                                <div className="td-input-element-active" id="alle" onClick={() => setType("alle")}>Alle</div>
                                <div className="td-input-element" id="offentlige" onClick={() => setType("offentlige")}>Offentlige</div>
                                <div className="td-input-element" id="private" onClick={() => setType("private")}>Private</div>
                                <div className="td-input-element" id="dyster" onClick={() => setType("dyster")}>Præmiedyster</div>
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
                            <a className="td-btn" onClick={() => gruppespilHandler()}>Opret gruppespil</a>
                        </div>
                    </div>
                    <div className="td-wrapper">
                        <div className="td-modifier">
                            <p className="td-modifier-p" style={{fontWeight: "500"}} id="td-navn">NAVN</p>
                            <p className="td-modifier-p" style={{fontWeight: "500"}} id="td-synlighed">SYNLIGHED</p>
                            <p className="td-modifier-p" style={{fontWeight: "500"}} id="td-spillere">SPILLERE</p>
                            <p className="td-modifier-p" style={{fontWeight: "500"}} id="td-admin">ADMINISTRATOR</p>
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
                                                                    {/* <Image src="" height="20px" width="20px" /> */}
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
                                                                {/* <Image src="" height="20px" width="20px" /> */}
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
                                                                {/* <Image src="" height="20px" width="20px" /> */}
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
                                                            {/* <Image src="" height="20px" width="20px" /> */}
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
            </div>
        </>
    )
}
 
export default Gruppespil;