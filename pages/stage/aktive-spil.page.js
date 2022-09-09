import * as React from 'react';
import { useState, useEffect } from 'react';
import { getUser } from "../services/authService";
import axios from "axios";
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
 
function StageAktiveSpil () {

    useEffect(() => {
        getGroups();
    }, [])

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState("Indlæser...")

    const user = getUser();
    const fornavn = user !== 'undefined' && user ? user.username : '';

    const [nav, setNav] = useState("alle");

    function setActiveGame(id, index, name) {
        localStorage.setItem("activeGame", id);
        localStorage.setItem("playerIndex", index);
        localStorage.setItem("aktive-spil-suspend", "null");
        window.open("/stage/", "_self");
    }

    function getGroups() {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppespil";

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Gruppespil:", response)
            setItems(response.data.allGruppespil);
            if (response.data.allGruppespil.length === 0) {
                setCheckEmpty(1)
            }
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    const [modalh1, setModalH1] = useState("Benyt adgangsbillet");
    const [modalh2, setModalH2] = useState("Det ser ud til, at du ikke har noget abonnement til at oprette gruppespil. Vil du gøre brug af en af dine adgangsbilletter istedet?");

    function showModal() {
        setModalH1("Opgrader abonnement");
        setModalH2('Opgrader dit abonnement for at få adgang til at oprette gruppespil, eller køb en adgangsbillet under "Priser".');
        document.getElementById("main-modal").classList.add("display-flex");
    }

    function opretSpilHandler() {
        if (JSON.parse(localStorage.getItem("auth")).rolle === "premium" || JSON.parse(localStorage.getItem("auth")).rolle === "administrator") {
            window.open("/stage/opret-spil", "_self");
        } else {
            showModal();
        }
    }

    const [checkEmpty, setCheckEmpty] = useState(0);

    function checkEmptyDiv() {
        if (checkEmpty === 1) {
            return (<p className='gruppespil-stage-404'>Der blev ikke fundet nogle gruppespil...</p>);
        } else {
            return (<></>);
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
        const user_email = localStorage.getItem("email");
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
                        window.open("/stage/opret-spil", "_self");
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

    useEffect(() => {
        if (nav === "alle") {
            document.getElementById("alle").className = "display";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element-active";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "private") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element-active";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "offentlige") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display";
            document.getElementById("afsluttede").className = "display-not";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element-active";
            document.getElementById("afsluttedeN").className = "aktivespil-element";
        } else if (nav === "afsluttede") {
            document.getElementById("alle").className = "display-not";
            document.getElementById("private").className = "display-not";
            document.getElementById("offentlige").className = "display-not";
            document.getElementById("afsluttede").className = "display";

            document.getElementById("alleN").className = "aktivespil-element";
            document.getElementById("privateN").className = "aktivespil-element";
            document.getElementById("offentligeN").className = "aktivespil-element";
            document.getElementById("afsluttedeN").className = "aktivespil-element-active";
        }
    }, [nav])

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
            <div className="gruppespil-container-2">
                <div className={messageType} id="errorCon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div className="error-text">
                        <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                        <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                    </div>
                </div>
                <div className="gruppespil-section">
                <div className="aktivespil-header">
                    <h1 className="aktivespil-h1">Dine gruppespil</h1>
                    <div className="aktivespil-nav">
                        <button className="aktivespil-element-active" id="alleN" onClick={() => setNav("alle")}>Aktive spil</button>
                        <button className="aktivespil-element" id="privateN" onClick={() => setNav("private")}>Private spil</button>
                        <button className="aktivespil-element" id="offentligeN" onClick={() => setNav("offentlige")}>Offentligt spil</button>
                        <button className="aktivespil-element" id="afsluttedeN" onClick={() => setNav("afsluttede")}>Afsluttede spil</button>
                    </div>
                </div>
                <div className="spil-container" style={{width: "100%"}}>
                    <ul id="alle" className="display" style={{width: "100%"}}>
                        {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                var slut_dato = new Date(item.varighed).getTime();
                                var nowDate = new Date().getTime();
                                if (item.players[x].player === localStorage.getItem("email") && slut_dato > nowDate) {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));

                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = dif_back / (1000*3600*24);

                                    var elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Sæt som aktiv</button>;
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px", opacity: "0.6"}}>Aktiv</button>;
                                    }

                                    var first = "";
                                    var second = "";
                                    var third = "";

                                    var n = item.players.length;
                                    var topScorers = getTopN(item.players, n);
                                    topScorers.forEach(function(res, index) {
                                        if (index === 0) {
                                            first = res.username;
                                        } else if (index === 1) {
                                            second = res.username;
                                        } else if (index === 2) {
                                            third = res.username;
                                        }
                                    });

                                    return (
                                        <li key={item.id}>
                                            <div onClick={() => setActiveGame(item.id, index, item.name)} className="dyst-table-row">
                                                <div className="vl-icon-div">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                    </svg>
                                                    <div className="dyst-figure"></div>
                                                </div>
                                                <p className="dyst-p">{item.name}</p>
                                                <div className="dyst-info">
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players[index].info.money}</p>
                                                        <p className="dyst-info-h2">Kapital</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players.length}</p>
                                                        <p className="dyst-info-h2">Tilmeldte</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{parseInt(dif_back_days + "")}</p>
                                                        <p className="dyst-info-h2">Dage tilbage</p>
                                                    </div>
                                                </div>
                                                <div className="dyst-wrapper">
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">1.</p>
                                                        <p className="dyst-win-p">{first}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">2.</p>
                                                        <p className="dyst-win-p">{second}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">3.</p>
                                                        <p className="dyst-win-p">{third}</p>
                                                    </div>
                                                </div>
                                                {elAktiv}
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                        {checkEmptyDiv()}
                    </ul>
                    <ul id="private" className="display-not" style={{width: "100%"}}>
                        {loading}
                        {items.map(item => {
                            for (var x in item.players) {
                                var slut_dato = new Date(item.varighed).getTime();
                                var nowDate = new Date().getTime();
                                if (item.players[x].player === localStorage.getItem("email") && slut_dato > nowDate && item.synlighed === "privat") {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));

                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = dif_back / (1000*3600*24);

                                    var elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Sæt som aktiv</button>;
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px", opacity: "0.6"}}>Aktiv</button>;
                                    }

                                    var first = "";
                                    var second = "";
                                    var third = "";

                                    var n = item.players.length;
                                    var topScorers = getTopN(item.players, n);
                                    topScorers.forEach(function(res, index) {
                                        if (index === 0) {
                                            first = res.username;
                                        } else if (index === 1) {
                                            second = res.username;
                                        } else if (index === 2) {
                                            third = res.username;
                                        }
                                    });

                                    return (
                                        <li key={item.id}>
                                            <div onClick={() => setActiveGame(item.id, index, item.name)} className="dyst-table-row">
                                                <div className="vl-icon-div">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                    </svg>
                                                    <div className="dyst-figure"></div>
                                                </div>
                                                <p className="dyst-p">{item.name}</p>
                                                <div className="dyst-info">
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players[index].info.money}</p>
                                                        <p className="dyst-info-h2">Kapital</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players.length}</p>
                                                        <p className="dyst-info-h2">Tilmeldte</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{parseInt(dif_back_days + "")}</p>
                                                        <p className="dyst-info-h2">Dage tilbage</p>
                                                    </div>
                                                </div>
                                                <div className="dyst-wrapper">
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">1.</p>
                                                        <p className="dyst-win-p">{first}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">2.</p>
                                                        <p className="dyst-win-p">{second}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">3.</p>
                                                        <p className="dyst-win-p">{third}</p>
                                                    </div>
                                                </div>
                                                {elAktiv}
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                    <ul id="offentlige" style={{width: "100%"}}>
                    {loading}
                    {items.map(item => {
                            for (var x in item.players) {
                                var slut_dato = new Date(item.varighed).getTime();
                                var nowDate = new Date().getTime();
                                if (item.players[x].player === localStorage.getItem("email") && slut_dato > nowDate && (item.synlighed === "offentlig" || item.synlighed === "dyst")) {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));

                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = dif_back / (1000*3600*24);

                                    var elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Sæt som aktiv</button>;
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px", opacity: "0.6"}}>Aktiv</button>;
                                    }

                                    var first = "";
                                    var second = "";
                                    var third = "";

                                    var n = item.players.length;
                                    var topScorers = getTopN(item.players, n);
                                    topScorers.forEach(function(res, index) {
                                        if (index === 0) {
                                            first = res.username;
                                        } else if (index === 1) {
                                            second = res.username;
                                        } else if (index === 2) {
                                            third = res.username;
                                        }
                                    });

                                    return (
                                        <li key={item.id}>
                                            <div onClick={() => setActiveGame(item.id, index, item.name)} className="dyst-table-row">
                                                <div className="vl-icon-div">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                    </svg>
                                                    <div className="dyst-figure"></div>
                                                </div>
                                                <p className="dyst-p">{item.name}</p>
                                                <div className="dyst-info">
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players[index].info.money}</p>
                                                        <p className="dyst-info-h2">Kapital</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players.length}</p>
                                                        <p className="dyst-info-h2">Tilmeldte</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{parseInt(dif_back_days + "")}</p>
                                                        <p className="dyst-info-h2">Dage tilbage</p>
                                                    </div>
                                                </div>
                                                <div className="dyst-wrapper">
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">1.</p>
                                                        <p className="dyst-win-p">{first}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">2.</p>
                                                        <p className="dyst-win-p">{second}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">3.</p>
                                                        <p className="dyst-win-p">{third}</p>
                                                    </div>
                                                </div>
                                                {elAktiv}
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                    <ul id="afsluttede" style={{width: "100%"}}>
                    {loading}
                    {items.map(item => {
                            for (var x in item.players) {
                                var slut_dato = new Date(item.varighed).getTime();
                                var nowDate = new Date().getTime();
                                if (item.players[x].player === localStorage.getItem("email") && slut_dato < nowDate) {
                                    const index = item.players.findIndex(obj => obj.player === localStorage.getItem("email"));

                                    var back = new Date().getTime();
                                    var dif_back = slut_dato - back;
                                    var dif_back_days = dif_back / (1000*3600*24);

                                    var elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px"}}>Sæt som aktiv</button>;
                                    if (localStorage.getItem("activeGame") === item.id) {
                                        elAktiv = <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "20px", opacity: "0.6"}}>Aktiv</button>;
                                    }

                                    var first = "";
                                    var second = "";
                                    var third = "";

                                    var n = item.players.length;
                                    var topScorers = getTopN(item.players, n);
                                    topScorers.forEach(function(res, index) {
                                        if (index === 0) {
                                            first = res.username;
                                        } else if (index === 1) {
                                            second = res.username;
                                        } else if (index === 2) {
                                            third = res.username;
                                        }
                                    });

                                    return (
                                        <li key={item.id}>
                                            <div onClick={() => setActiveGame(item.id, index, item.name)} className="dyst-table-row">
                                                <div className="vl-icon-div">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="dyst-icon" viewBox="0 0 16 16">
                                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                                    </svg>
                                                    <div className="dyst-figure"></div>
                                                </div>
                                                <p className="dyst-p">{item.name}</p>
                                                <div className="dyst-info">
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players[index].info.money}</p>
                                                        <p className="dyst-info-h2">Kapital</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{item.players.length}</p>
                                                        <p className="dyst-info-h2">Tilmeldte</p>
                                                    </div>
                                                    <div className="dyst-info-element">
                                                        <p className="dyst-info-h1">{parseInt(dif_back_days + "")}</p>
                                                        <p className="dyst-info-h2">Dage tilbage</p>
                                                    </div>
                                                </div>
                                                <div className="dyst-wrapper">
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">1.</p>
                                                        <p className="dyst-win-p">{first}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">2.</p>
                                                        <p className="dyst-win-p">{second}</p>
                                                    </div>
                                                    <div className="dyst-element">
                                                        <p className="dyst-win-h1">3.</p>
                                                        <p className="dyst-win-p">{third}</p>
                                                    </div>
                                                </div>
                                                {elAktiv}
                                            </div>
                                        </li>);
                                }
                            }
                            }
                        )}
                    </ul>
                </div>
                <button className="main-btn-login" onClick={() => {opretSpilHandler()}}>Opret nyt gruppespil</button>
                <Link href="/stage/find-spil"><button className="main-btn-outline marginLeft20">Find nye gruppespil</button></Link>
                </div>
                </div>
        </>
    )
}
 
export default StageAktiveSpil;