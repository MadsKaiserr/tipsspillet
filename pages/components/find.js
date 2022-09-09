import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
 
function Find () {

    const [items, setItems] = useState([]);

    const [checkEmpty, setCheckEmpty] = useState(0);

    const [loading, setLoading] = useState("Indlæser...");

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
            document.getElementById("stage-loader2").classList.remove("display");
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
            setItems(response.data.allGruppespil);
            setSearch(response.data.allGruppespil);
            if (response.data.allGruppespil.length === 0) {
                setCheckEmpty(1)
            }
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    function checkEmptyDiv() {
        if (checkEmpty === 1) {
            return (<p className='gruppespil-table-404'>Der blev ikke fundet nogle gruppespil...</p>);
        } else {
            return (<></>);
        }
    }

    function changeNav(nav) {
        if (nav === "alle") {
            document.getElementById("alleG").className = "display";
            document.getElementById("privateG").className = "display-not";
            document.getElementById("offentligeG").className = "display-not";

            document.getElementById("alleGK").className = "aktivespil-element-active";
            document.getElementById("privateGK").className = "aktivespil-element";
            document.getElementById("offentligeGK").className = "aktivespil-element";
        } else if (nav === "private") {
            document.getElementById("alleG").className = "display-not";
            document.getElementById("privateG").className = "display";
            document.getElementById("offentligeG").className = "display-not";

            document.getElementById("alleGK").className = "aktivespil-element";
            document.getElementById("privateGK").className = "aktivespil-element-active";
            document.getElementById("offentligeGK").className = "aktivespil-element";
        } else if (nav === "offentlige") {
            document.getElementById("alleG").className = "display-not";
            document.getElementById("privateG").className = "display-not";
            document.getElementById("offentligeG").className = "display";

            document.getElementById("alleGK").className = "aktivespil-element";
            document.getElementById("privateGK").className = "aktivespil-element";
            document.getElementById("offentligeGK").className = "aktivespil-element-active";
        } else if (nav === "alleP") {
            document.getElementById("alleP").className = "display";
            document.getElementById("kommendeP").className = "display-not";
            document.getElementById("afsluttedeP").className = "display-not";

            document.getElementById("allePK").className = "aktivespil-element-active";
            document.getElementById("kommendePK").className = "aktivespil-element";
            document.getElementById("afsluttedePK").className = "aktivespil-element";
        } else if (nav === "kommendeP") {
            document.getElementById("alleP").className = "display-not";
            document.getElementById("kommendeP").className = "display";
            document.getElementById("afsluttedeP").className = "display-not";

            document.getElementById("allePK").className = "aktivespil-element";
            document.getElementById("kommendePK").className = "aktivespil-element-active";
            document.getElementById("afsluttedePK").className = "aktivespil-element";
        } else if (nav === "afsluttedeP") {
            document.getElementById("alleP").className = "display-not";
            document.getElementById("kommendeP").className = "display-not";
            document.getElementById("afsluttedeP").className = "display";

            document.getElementById("allePK").className = "aktivespil-element";
            document.getElementById("kommendePK").className = "aktivespil-element";
            document.getElementById("afsluttedePK").className = "aktivespil-element-active";
        }
    }

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

    return (
        <>
            <div className="gruppespil-div">
                <div className="gruppespil-top">
                    <h1 className="gruppespil-h1">Find gruppespil</h1>
                    <div className="aktivespil-nav">
                        <button className="aktivespil-element-active" id="alleGK" onClick={() => {changeNav("alle")}}>Alle gruppespil</button>
                        <button className="aktivespil-element" id="privateGK" onClick={() => {changeNav("private")}}>Private spil</button>
                        <button className="aktivespil-element" id="offentligeGK" onClick={() => {changeNav("offentlige")}}>Offentligt spil</button>
                    </div>
                </div>
                <div className="gruppespi-body">
                    <div className="gr-inputs">
                        <div className="gruppespil-input-div">
                            <svg xmlns="http://www.w3.org/2000/svg" className="gruppespil-search-icon" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <input type="text" className="login-form-input" onChange={event => setQuery(event.target.value)} style={{paddingLeft: "45px"}} placeholder="Find det rette gruppespil"/>
                        </div>
                        <button className="nav-btn-default" style={{marginLeft: "0px", borderRadius: "5px"}} onClick={() => {makeSearch()}}>Søg</button>
                    </div>
                    <div className="gruppespil-table">
                        <div className="gruppespil-table-top">
                            <p className="gruppespil-table-title gruppetable-navn2" style={{marginLeft: "10px"}}>NAVN</p>
                            <p className="gruppespil-table-title gruppetable-number2">SYNLIGHED</p>
                            <p className="gruppespil-table-title gruppetable-kapital2">SPILLERE</p>
                            <p className="gruppespil-table-title gruppetable-number22">ADMINISTRATOR</p>
                        </div>
                        <ul id="alleG">
                            <div className="match-loader display" id="stage-loader1"></div>
                            {search.map((item) => {
                                if (item.synlighed !== "dyst") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="gruppespil-table-row">
                                                <div className="gruppespil-table-row">
                                                    <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}</p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                    </svg>
                                                    <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                } else return;
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="privateG">
                            {items.map((item) => {
                                if (item.synlighed === "privat") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var dystClass = ""
                                    var dystSpan = ""
                                    if (item.synlighed === "dyst") {
                                        synlighed = "Præmiedyst";
                                        dystClass = "dyst-span";
                                        dystSpan = "Præmiedyst";
                                    }
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="gruppespil-table-row">
                                                <div className="gruppespil-table-row">
                                                    <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                    </svg>
                                                    <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                    }
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="offentligeG">
                            {items.map((item) => {
                                if (item.synlighed === "offentlig") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var dystClass = ""
                                    var dystSpan = ""
                                    if (item.synlighed === "dyst") {
                                        synlighed = "Præmiedyst";
                                        dystClass = "dyst-span";
                                        dystSpan = "Præmiedyst";
                                    }
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="gruppespil-table-row">
                                                <div className="gruppespil-table-row">
                                                    <p className="gruppespil-table-h1 gruppetable-navn2-el">{item.name}<span className={dystClass}>{dystSpan}</span></p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el2">{synlighed}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="gruppespiltable-icon" viewBox="0 0 16 16">
                                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                    </svg>
                                                    <p className="gruppespil-table-p gruppetable-kapital2-el">{item.players.length}</p>
                                                    <p className="gruppespil-table-p gruppetable-number2-el">{item.admin}</p>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                    }
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="gruppespil-div">
                <div className="gruppespil-top">
                    <h1 className="gruppespil-h1">Præmiedyster</h1>
                    <div className="aktivespil-nav">
                        <button className="aktivespil-element-active" id="allePK" onClick={() => {changeNav("alleP")}}>Igangværende dyster</button>
                        <button className="aktivespil-element" id="kommendePK" onClick={() => {changeNav("kommendeP")}}>Kommende dyster</button>
                        <button className="aktivespil-element" id="afsluttedePK" onClick={() => {changeNav("afsluttedeP")}}>Afsluttede dyster</button>
                    </div>
                </div>
                <div className="gruppespi-body">
                    <div className="gruppespil-table">
                        <ul id="alleP">
                            <div className="match-loader display" id="stage-loader2"></div>
                            {items.map((item) => {
                                if (item.synlighed === "dyst") {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var slut_dato = new Date(item.varighed).getTime();
                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = parseInt((dif_back / (1000*3600*24)) + "");
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="dyst-table-row">
                                                <div className="dyst-table-row">
                                                    <div className="vl-icon-div">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                        </svg>
                                                        <div className="dyst-figure"></div>
                                                    </div>
                                                    <p className="dyst-p">{item.name}</p>
                                                    <div className="dyst-info">
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.start_amount}</p>
                                                            <p className="dyst-info-h2">Startbeløb</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.players.length}</p>
                                                            <p className="dyst-info-h2">Tilmeldte</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{dif_back_days}</p>
                                                            <p className="dyst-info-h2">Dage tilbage</p>
                                                        </div>
                                                    </div>
                                                    <div className="dyst-wrapper">
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">1.</p>
                                                            <p className="dyst-win-p">Premium</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">2.</p>
                                                            <p className="dyst-win-p">Gruppespilsbillet</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">3.</p>
                                                            <p className="dyst-win-p">Adgangsbillet</p>
                                                        </div>
                                                    </div>
                                                    <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Tilmeld</button>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                } else return;
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="kommendeP">
                        {items.map((item) => {
                                if (item.synlighed === "dyst" && item.oprettelse > new Date().getTime()) {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var slut_dato = new Date(item.varighed).getTime();
                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = parseInt((dif_back / (1000*3600*24)) + "");
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="dyst-table-row">
                                                <div className="dyst-table-row">
                                                    <div className="vl-icon-div">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                        </svg>
                                                        <div className="dyst-figure"></div>
                                                    </div>
                                                    <p className="dyst-p">{item.name}</p>
                                                    <div className="dyst-info">
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.start_amount}</p>
                                                            <p className="dyst-info-h2">Startbeløb</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.players.length}</p>
                                                            <p className="dyst-info-h2">Tilmeldte</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{dif_back_days}</p>
                                                            <p className="dyst-info-h2">Dage tilbage</p>
                                                        </div>
                                                    </div>
                                                    <div className="dyst-wrapper">
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">1.</p>
                                                            <p className="dyst-win-p">1.000 kr.</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">2.</p>
                                                            <p className="dyst-win-p">500 kr.</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">3.</p>
                                                            <p className="dyst-win-p">250 kr.</p>
                                                        </div>
                                                    </div>
                                                    <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Tilmeld</button>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                } else return;
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                        <ul className="display-not" id="afsluttedeP">
                        {items.map((item) => {
                            var slut_dato = new Date(item.varighed).getTime();
                                if (item.synlighed === "dyst" && slut_dato < new Date().getTime()) {
                                    const gruppespilURL = "/gruppesession?game=" + item.id;
                                    var synlighed = item.synlighed;
                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = parseInt((dif_back / (1000*3600*24)) + "");
                                    return (
                                        <li key={item.id} className="display" style={{width: "100%"}}>
                                            <Link href={gruppespilURL} className="dyst-table-row">
                                                <div className="dyst-table-row">
                                                    <div className="vl-icon-div">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                        </svg>
                                                        <div className="dyst-figure"></div>
                                                    </div>
                                                    <p className="dyst-p">{item.name}</p>
                                                    <div className="dyst-info">
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.start_amount}</p>
                                                            <p className="dyst-info-h2">Startbeløb</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{item.players.length}</p>
                                                            <p className="dyst-info-h2">Tilmeldte</p>
                                                        </div>
                                                        <div className="dyst-info-element">
                                                            <p className="dyst-info-h1">{dif_back_days}</p>
                                                            <p className="dyst-info-h2">Dage tilbage</p>
                                                        </div>
                                                    </div>
                                                    <div className="dyst-wrapper">
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">1.</p>
                                                            <p className="dyst-win-p">1.000 kr.</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">2.</p>
                                                            <p className="dyst-win-p">500 kr.</p>
                                                        </div>
                                                        <div className="dyst-element">
                                                            <p className="dyst-win-h1">3.</p>
                                                            <p className="dyst-win-p">250 kr.</p>
                                                        </div>
                                                    </div>
                                                    <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Tilmeld</button>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                } else return;
                                }
                            )}
                            {checkEmptyDiv()}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default Find;