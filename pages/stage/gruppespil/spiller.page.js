import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getKupon, getString } from "../../services/algo.js";
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../../layout/stageheader';
 
function StageSpiller () {

    const router = useRouter();

    const [loadingText, setLoadingText] = useState("Indlæser...");

    const [gevinst, setGevinst] = useState(0);
    const [kuponer, setKuponer] = useState(0);
    const [online, setOnline] = useState(1657540794801);
    const [player, setPlayer] = useState("Indlæser...")
    
    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
            // document.getElementById("stage-loader2").classList.remove("display");
        }
    }, [loadingText])

    const [playerOdds, setPlayerOdds] = useState([]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + urlParams.get("game");

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Gruppespil:", response)
            var myPlayer = [];
            for (var k in response.data.players) {
                if (response.data.players[k].player === urlParams.get("spiller")) {
                    myPlayer = response.data.players[k].odds;
                    setGevinst(parseInt(response.data.players[k].info.money))
                    setKuponer(response.data.players[k].odds.length);
                    setPlayer(response.data.players[k].player);
                }
            }
            setPlayerOdds(myPlayer.reverse());
            setLoadingText("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Spiller - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="gruppespil-container-2">
                <button className="back-btn" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="match-back" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                </button>
                <div className="gruppespil-section">
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">{player}</h1>
                        </div>
                        <div className="gruppespil-info-info">
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Kapital</p>
                                <p className="gruppespil-info-element-h1">{gevinst},00 kr</p>
                            </div>
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Antal kuponer</p>
                                <p className="gruppespil-info-element-h1">{kuponer}</p>
                            </div>
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Sidst online</p>
                                <p className="gruppespil-info-element-h1">{new Date(online).getDate()}/{new Date(online).getMonth() + 1}/{new Date(online).getFullYear()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="gruppespil-info">
                            <div className="gruppespil-title" id="gruppespil-title">
                                <h1 className="gruppespil-h1">Kuponer</h1>
                                <p className="gruppespil-scroll">Scroll for at se flere</p>
                            </div>
                            <div className="spil-loader display" id="stage-loader1"></div>
                            <div className="gruppespil-kuponer" id="gruppespil-kuponer">
                                <ul>
                                    {playerOdds.map((item) => {
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
                                                <li key={item.id + "-" + randomId} className="gruppespil-li">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            <p className="kupon-right-p" style={afgjortStyle}>{afgjort}</p>
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

                                            var doneUdbetaling = 0;
                                            for (var y in item.wins) {
                                                for (var u in item.bets) {
                                                    if (item.bets[u].game === item.wins[y].game && item.bets[u].result === item.wins[y].result) {
                                                        doneUdbetaling = item.bets[u].indsats * parseFloat(item.bets[u].probability);
                                                    }
                                                }
                                            }

                                            var pUdbetaling = <div className="kupon-confirm-div">
                                                <p className="kupon-confirm-p">Potentiel udbetaling:</p>
                                                <p className="kupon-confirm-h1">{totalUdbetaling} kr.</p>
                                            </div>;
                                            if (item.vundet === 1) {
                                                pUdbetaling = <div className="kupon-confirm-div">
                                                    <p className="kupon-confirm-p"><span className="potentiel-tabt">Tabt</span> udbetaling:</p>
                                                    <p className="kupon-confirm-h1">{totalUdbetaling} kr.</p>
                                                </div>;
                                            } else if (item.vundet === 2) {
                                                pUdbetaling = <div className="kupon-confirm-div">
                                                    <p className="kupon-confirm-p">Potentiel udbetaling: {totalUdbetaling} kr.</p>
                                                    <p className="kupon-confirm-p"><span className="potentiel-vundet">Vundet</span> udbetaling:</p>
                                                    <p className="kupon-confirm-h1">{doneUdbetaling} kr.</p>
                                                </div>;
                                            }
                                            return (
                                                <li key={item.id + "-" + randomId} className="display">
                                                    <div className={kuponClass}>
                                                        <div className="kupon-top">
                                                            <p className="kupon-left-p">{dato_string}</p>
                                                            <p className="kupon-header-p">{item.type}</p>
                                                            <p className="kupon-right-p" style={afgjortStyle}>{afgjort}</p>
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
                                                                {pUdbetaling}
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
                        </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </>
    )
}
 
export default StageSpiller;