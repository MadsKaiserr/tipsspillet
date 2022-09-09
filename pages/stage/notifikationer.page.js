import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import StageHeader from '../layout/stageheader';
 
function StageNotifikationer () {

    const [items, setItems] = useState([]);

    const [loadingText, setLoadingText] = useState("Indlæser...");
    const [errorText, setErrorText] = useState("Der blev ikke fundet nogle notifikationer...")

    useEffect(() => {
        if (localStorage.getItem("activeGame") && localStorage.getItem("activeGame") !== "") {
            var activeGame = localStorage.getItem("activeGame");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + activeGame;
    
            const requestConfigen = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
            axios.get(URL, requestConfigen).then(response => {
                console.log("AWS - Gruppespil:", response);
                for (var i in response.data.players) {
                    if (response.data.players[i].player === localStorage.getItem("email")) {
                        setItems(response.data.players[i].info.notifikationer);
                        if (response.data.players[i].info.notifikationer.length > 0) {
                            setErrorText("");
                        }
                    }
                }
                setLoadingText("")
            }).catch(error => {
                setErrorText(error);
                console.log("Fejl ved indhentning af data" + error)
            })
        } else {
            setErrorText("Tilmed dig et gruppespil, for at få notifikationer fra det...")
            setLoadingText("")
        }
    }, [])
    
    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loadingText])

    return (
        <>
        <Head>
            <title>Notifikationer - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
            <div className="noti-main">
                <h1 className="noti-h1">Notifikationer</h1>
                <p className="nogames display left" style={{paddingTop: "15px"}}>{errorText}</p>
                <div className="spil-loader display" id="stage-loader1"></div>
                {items.slice(0).reverse().map(noti => {
                    var dato_string = "";
                    var dato_time_string = "";
                    var dato_day;
                    var dato_month;
                    var dato_year;

                    var dato_minutes;
                    var dato_hours;
                    if (noti.date !== undefined) {
                        dato_minutes = new Date(noti.date).getMinutes();
                        dato_hours = new Date(noti.date).getHours();
                        dato_time_string = dato_hours + ":" + dato_minutes;

                        var today_day = new Date().getDate();
                        var today_month = new Date().getMonth();
                        var today_year = new Date().getFullYear();
                        dato_day = new Date(noti.date).getDate();
                        dato_month = new Date(noti.date).getMonth();
                        dato_year = new Date(noti.date).getFullYear();
                        if (today_day === dato_day && today_month === dato_month && today_year === dato_year) {
                            dato_string = "I dag, " + dato_time_string;
                        } else if ((today_day - 1) === dato_day && today_month === dato_month && today_year === dato_year) {
                            dato_string = "I går, " + dato_time_string;
                        } else if ((today_day - 2) === dato_day && today_month === dato_month && today_year === dato_year) {
                            dato_string = "I forgårs, " + dato_time_string;
                        } else {
                            dato_string = dato_day + "/" + dato_month + " - " + dato_time_string;
                        }
                    }

                    if (noti.type === "bet_place") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section">
                                <div className="noti-left">
                                    <p className="noti-sec-h1">Du har placeret en kupon</p>
                                    <p className="noti-sec-p">Du har gennemført et køb af en kupon.</p>
                                    <p className="noti-sec-dato">{dato_string}</p>
                                </div>
                                <ul className="noti-right">
                                {noti.kupon.map((item) => {
                                        var kuponClass = "gruppespil-kupon";
                                        var potentiel = <span>Potentiel</span>;
                                        if (item.vundet === 1) {
                                            kuponClass = "gruppespil-kupon-1";
                                            potentiel = <span className="potentiel-tabt">Tabt</span>;
                                        } else if (item.vundet === 2) {
                                            kuponClass = "gruppespil-kupon-2";
                                            potentiel = <span className="potentiel-vundet">Vundet</span>;
                                        }
                                        var mstime = new Date().getTime();
                                        var randomNumber = Math.floor(Math.random() * 512);
                                        var randomId = mstime+"-"+randomNumber;
                                        var afgjort = "Ikke afgjort";
                                        var afgjortStyle = {color: "var(--softBlack)"};
                                        if (item.calculated === "true") {
                                            afgjort = "Alle afgjort";
                                            afgjortStyle = {color: "var(--primary)"};
                                        }

                                        var dato_string = "";
                                        var dato_time_string = "";
                                        var dato_day;
                                        var dato_month;
                                        var dato_year;

                                        var dato_minutes;
                                        var dato_hours;
                                        if (item.iat !== undefined) {
                                            dato_minutes = new Date(item.iat).getMinutes();
                                            dato_hours = new Date(item.iat).getHours();
                                            dato_time_string = dato_hours + ":" + dato_minutes;

                                            var today_day = new Date().getDate();
                                            var today_month = new Date().getMonth();
                                            var today_year = new Date().getFullYear();
                                            dato_day = new Date(item.iat).getDate();
                                            dato_month = new Date(item.iat).getMonth();
                                            dato_year = new Date(item.iat).getFullYear();
                                            if (today_day === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I dag, " + dato_time_string;
                                            } else if ((today_day - 1) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I går, " + dato_time_string;
                                            } else if ((today_day - 2) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I forgårs, " + dato_time_string;
                                            } else {
                                                dato_string = dato_day + "/" + dato_month + " - " + dato_time_string;
                                            }
                                        }
                                        if (item.type === "kombination") {
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                            <div className="kupon-container" style={kuponStyle}>
                                                                                <div className="kupon-divider-first"></div>
                                                                                <div className="bet-top">
                                                                                    <p className="kupon-top-p">Dit væddemål</p>
                                                                                    <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                                </div>
                                                                                <div className="kupon-divider"></div>
                                                                                <div className="kupon-content">
                                                                                    <div className="kupon-info">
                                                                                        <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                        <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                    </div>
                                                                                    <div className="kupon-odds">
                                                                                        <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                                </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <p className="kupon-bottom-info-p">Total indsats</p>
                                                                <p className="kupon-bottom-info-p-right">{item.indsats},00 kr.</p><br />
                                                                <p className="kupon-bottom-info-p">Total odds</p>
                                                                <p className="kupon-bottom-info-p-right">{(Number(item.fullProb)).toFixed(2)}</p>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">{potentiel} udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{(item.indsats * item.fullProb).toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        } else {
                                            var totalIndsats = 0;
                                            var totalUdbetaling = 0;
                                            for (var q in item.bets) {
                                                totalIndsats = totalIndsats + item.bets[q].indsats;
                                                totalUdbetaling = totalUdbetaling + (item.bets[q].indsats * parseFloat(item.bets[q].probability));
                                            }
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                        <div className="kupon-container" style={kuponStyle}>
                                                                            <div className="kupon-divider-first"></div>
                                                                            <div className="bet-top">
                                                                                <p className="kupon-top-p">Dit væddemål</p>
                                                                                <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                            </div>
                                                                            <div className="kupon-divider"></div>
                                                                            <div className="kupon-content">
                                                                                <div className="kupon-info">
                                                                                    <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                    <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                </div>
                                                                                <div className="kupon-odds">
                                                                                    <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                                    <p className="kupon-h2"><span className="kupon-h2-span">Indsats: </span>{element.indsats}</p>
                                                                            </div>
                                                                            </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <div className="kupon-info-div">
                                                                    <p className="kupon-bottom-info-p">Total indsats</p>
                                                                    <p className="kupon-bottom-info-p-right">{totalIndsats},00 kr.</p>
                                                                </div>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">Udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{totalUdbetaling.toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        }
                                        }
                                    )}
                                </ul>
                            </div>
                        </li>
                            );
                    } else if (noti.type === "bet_won") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section-success">
                                <div className="noti-left">
                                    <p className="noti-sec-h1">Væddemål vundet</p>
                                    <p className="noti-sec-p">Du har vundet et væddemål, som havde en <span className="noti-span">udbetaling: {noti.udbetaling} kr.</span></p>
                                    <p className="noti-sec-dato">{dato_time_string}</p>
                                </div>
                                <ul className="noti-right">
                                {noti.kupon.map((item) => {
                                        var kuponClass = "gruppespil-kupon";
                                        var potentiel = <span>Potentiel</span>;
                                        if (item.vundet === 1) {
                                            kuponClass = "gruppespil-kupon-1";
                                            potentiel = <span className="potentiel-tabt">Tabt</span>;
                                        } else if (item.vundet === 2) {
                                            kuponClass = "gruppespil-kupon-2";
                                            potentiel = <span className="potentiel-vundet">Vundet</span>;
                                        }
                                        var mstime = new Date().getTime();
                                        var randomNumber = Math.floor(Math.random() * 512);
                                        var randomId = mstime+"-"+randomNumber;
                                        var afgjort = "Ikke afgjort";
                                        var afgjortStyle = {color: "var(--softBlack)"};
                                        if (item.calculated === "true") {
                                            afgjort = "Alle afgjort";
                                            afgjortStyle = {color: "var(--primary)"};
                                        }

                                        var dato_string = "";
                                        var dato_time_string = "";
                                        var dato_day;
                                        var dato_month;
                                        var dato_year;

                                        var dato_minutes;
                                        var dato_hours;
                                        if (item.iat !== undefined) {
                                            dato_minutes = new Date(item.iat).getMinutes();
                                            dato_hours = new Date(item.iat).getHours();
                                            dato_time_string = dato_hours + ":" + dato_minutes;

                                            var today_day = new Date().getDate();
                                            var today_month = new Date().getMonth();
                                            var today_year = new Date().getFullYear();
                                            dato_day = new Date(item.iat).getDate();
                                            dato_month = new Date(item.iat).getMonth();
                                            dato_year = new Date(item.iat).getFullYear();
                                            if (today_day === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I dag, " + dato_time_string;
                                            } else if ((today_day - 1) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I går, " + dato_time_string;
                                            } else if ((today_day - 2) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I forgårs, " + dato_time_string;
                                            } else {
                                                dato_string = dato_day + "/" + dato_month + " - " + dato_time_string;
                                            }
                                        }
                                        if (item.type === "kombination") {
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                        <div className="kupon-container" style={kuponStyle}>
                                                                            <div className="kupon-divider-first"></div>
                                                                            <div className="bet-top">
                                                                                <p className="kupon-top-p">Dit væddemål</p>
                                                                                <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                            </div>
                                                                            <div className="kupon-divider"></div>
                                                                            <div className="kupon-content">
                                                                                <div className="kupon-info">
                                                                                    <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                    <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                </div>
                                                                                <div className="kupon-odds">
                                                                                    <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                            </div>
                                                                            </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <p className="kupon-bottom-info-p">Total indsats</p>
                                                                <p className="kupon-bottom-info-p-right">{item.indsats},00 kr.</p><br />
                                                                <p className="kupon-bottom-info-p">Total odds</p>
                                                                <p className="kupon-bottom-info-p-right">{(Number(item.fullProb)).toFixed(2)}</p>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">{potentiel} udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{(item.indsats * item.fullProb).toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        } else {
                                            var totalIndsats = 0;
                                            var totalUdbetaling = 0;
                                            for (var q in item.bets) {
                                                totalIndsats = totalIndsats + item.bets[q].indsats;
                                                totalUdbetaling = totalUdbetaling + (item.bets[q].indsats * parseFloat(item.bets[q].probability));
                                            }
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                        <div className="kupon-container" style={kuponStyle}>
                                                                            <div className="kupon-divider-first"></div>
                                                                            <div className="bet-top">
                                                                                <p className="kupon-top-p">Dit væddemål</p>
                                                                                <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                            </div>
                                                                            <div className="kupon-divider"></div>
                                                                            <div className="kupon-content">
                                                                                <div className="kupon-info">
                                                                                    <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                    <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                </div>
                                                                                <div className="kupon-odds">
                                                                                    <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                                    <p className="kupon-h2"><span className="kupon-h2-span">Indsats: </span>{element.indsats}</p>
                                                                            </div>
                                                                            </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <div className="kupon-info-div">
                                                                    <p className="kupon-bottom-info-p">Total indsats</p>
                                                                    <p className="kupon-bottom-info-p-right">{totalIndsats},00 kr.</p>
                                                                </div>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">Udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{totalUdbetaling.toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        }
                                        }
                                    )}
                                </ul>
                            </div>
                        </li>
                    );
                    } else if (noti.type === "bet_lose") {
                        return (
                        <li key={noti.id}>
                            <div className="noti-section-error">
                                <div className="noti-left">
                                    <p className="noti-sec-h1">Væddemål tabt</p>
                                    <p className="noti-sec-p">Du har tabt din væddemål <span className="noti-span">nummer: {noti.odds}</span>.</p>
                                    <p className="noti-sec-dato">{dato_time_string}</p>
                                </div>
                                <ul className="noti-right">
                                {noti.kupon.map((item) => {
                                        var kuponClass = "gruppespil-kupon";
                                        var potentiel = <span>Potentiel</span>;
                                        if (item.vundet === 1) {
                                            kuponClass = "gruppespil-kupon-1";
                                            potentiel = <span className="potentiel-tabt">Tabt</span>;
                                        } else if (item.vundet === 2) {
                                            kuponClass = "gruppespil-kupon-2";
                                            potentiel = <span className="potentiel-vundet">Vundet</span>;
                                        }
                                        var mstime = new Date().getTime();
                                        var randomNumber = Math.floor(Math.random() * 512);
                                        var randomId = mstime+"-"+randomNumber;
                                        var afgjort = "Ikke afgjort";
                                        var afgjortStyle = {color: "var(--softBlack)"};
                                        if (item.calculated === "true") {
                                            afgjort = "Alle afgjort";
                                            afgjortStyle = {color: "var(--primary)"};
                                        }

                                        var dato_string = "";
                                        var dato_time_string = "";
                                        var dato_day;
                                        var dato_month;
                                        var dato_year;

                                        var dato_minutes;
                                        var dato_hours;
                                        if (item.iat !== undefined) {
                                            dato_minutes = new Date(item.iat).getMinutes();
                                            dato_hours = new Date(item.iat).getHours();
                                            dato_time_string = dato_hours + ":" + dato_minutes;

                                            var today_day = new Date().getDate();
                                            var today_month = new Date().getMonth();
                                            var today_year = new Date().getFullYear();
                                            dato_day = new Date(item.iat).getDate();
                                            dato_month = new Date(item.iat).getMonth();
                                            dato_year = new Date(item.iat).getFullYear();
                                            if (today_day === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I dag, " + dato_time_string;
                                            } else if ((today_day - 1) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I går, " + dato_time_string;
                                            } else if ((today_day - 2) === dato_day && today_month === dato_month && today_year === dato_year) {
                                                dato_string = "I forgårs, " + dato_time_string;
                                            } else {
                                                dato_string = dato_day + "/" + dato_month + " - " + dato_time_string;
                                            }
                                        }
                                        if (item.type === "kombination") {
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                        <div className="kupon-container" style={kuponStyle}>
                                                                            <div className="kupon-divider-first"></div>
                                                                            <div className="bet-top">
                                                                                <p className="kupon-top-p">Dit væddemål</p>
                                                                                <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                            </div>
                                                                            <div className="kupon-divider"></div>
                                                                            <div className="kupon-content">
                                                                                <div className="kupon-info">
                                                                                    <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                    <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                </div>
                                                                                <div className="kupon-odds">
                                                                                    <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                            </div>
                                                                            </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <p className="kupon-bottom-info-p">Total indsats</p>
                                                                <p className="kupon-bottom-info-p-right">{item.indsats},00 kr.</p><br />
                                                                <p className="kupon-bottom-info-p">Total odds</p>
                                                                <p className="kupon-bottom-info-p-right">{(Number(item.fullProb)).toFixed(2)}</p>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">{potentiel} udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{(item.indsats * item.fullProb).toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        } else {
                                            var totalIndsats = 0;
                                            var totalUdbetaling = 0;
                                            for (var q in item.bets) {
                                                totalIndsats = totalIndsats + item.bets[q].indsats;
                                                totalUdbetaling = totalUdbetaling + (item.bets[q].indsats * parseFloat(item.bets[q].probability));
                                            }
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            
                                                        </div>
                                                        <ul>
                                                            {item.bets.map((element) => {
                                                                var mstime = new Date().getTime();
                                                                var randomNumber = Math.floor(Math.random() * 512);
                                                                var randomId = mstime+"-"+randomNumber;
    
                                                                var returnDate = new Date(element.bet_date*1000);
                                                                var returnMinutes = "" + returnDate.getMinutes();
                                                                if ((returnMinutes.toString()).length < 2) {
                                                                    returnMinutes = "0" + returnMinutes;
                                                                }
    
                                                                var returnHours = "" + returnDate.getHours();
                                                                if ((returnHours.toString()).length < 2) {
                                                                    returnHours = "0" + returnHours;
                                                                }
    
                                                                var returnDay = "";
                                                                if (new Date().getDate() !== returnDate.getDate()) {
                                                                    var returnMonth = "" + (returnDate.getMonth() + 1);
                                                                    if ((returnMonth.toString()).length < 2) {
                                                                        returnMonth = "0" + returnMonth;
                                                                    }
                                                                    returnDay = returnDate.getDate() + "/" + returnMonth + " - ";
                                                                } else {
                                                                    returnDay = "I dag";
                                                                }
    
                                                                var kuponStyle = {};
                                                                if (item.wins !== undefined && item.calculated === "true") {
                                                                    var winIndex = item.wins.findIndex(obj => obj.game === element.game && element.betType === obj.type && element.result === obj.result);
                                                                    if (winIndex >= 0) {
                                                                        kuponStyle = {borderLeft: "4px var(--green) solid"};
                                                                    } else {
                                                                        kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                    }
                                                                } else if (item.calculated === "true") {
                                                                    kuponStyle = {borderLeft: "4px var(--red) solid"};
                                                                }
    
                                                                return (
                                                                    <li key={randomId} className="display">
                                                                        <Link href={"/stage/match?game=" + element.game}>
                                                                        <div className="kupon-container" style={kuponStyle}>
                                                                            <div className="kupon-divider-first"></div>
                                                                            <div className="bet-top">
                                                                                <p className="kupon-top-p">Dit væddemål</p>
                                                                                <p className="kupon-top-p">{returnDay} {returnHours}:{returnMinutes}</p>
                                                                            </div>
                                                                            <div className="kupon-divider"></div>
                                                                            <div className="kupon-content">
                                                                                <div className="kupon-info">
                                                                                    <p className="kupon-h1">{element.hometeam} - {element.visitorteam}</p>
                                                                                    <p className="kupon-p">{getKupon(element.betType,element.hometeam,element.visitorteam)}: <span className="weight600">{getString(element.betType,element.result,element.hometeam,element.visitorteam)}</span></p>
                                                                                </div>
                                                                                <div className="kupon-odds">
                                                                                    <p className="kupon-h2">{(Number(element.probability)).toFixed(2)}</p>
                                                                                    <p className="kupon-h2"><span className="kupon-h2-span">Indsats: </span>{element.indsats}</p>
                                                                            </div>
                                                                            </div>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                        <div className="kupon-bottom display">
                                                            <div className="kupon-bottom-info">
                                                                <div className="kupon-info-div">
                                                                    <p className="kupon-bottom-info-p">Total indsats</p>
                                                                    <p className="kupon-bottom-info-p-right">{totalIndsats},00 kr.</p>
                                                                </div>
                                                            </div>
                                                            <div className="kupon-confirm">
                                                                <div className="kupon-confirm-div">
                                                                    <p className="kupon-confirm-p">Udbetaling:</p>
                                                                    <p className="kupon-confirm-h1">{totalUdbetaling.toFixed(2)} kr.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                        }
                                        }
                                    )}
                                </ul>
                            </div>
                        </li>
                    );
                    }
                })}
            </div>
        </>
    )
}
 
export default StageNotifikationer;