import { useState, useEffect } from 'react';
import axios from "axios";
import { getUser } from "../services/authService";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import StageHeader from '../layout/stageheader';
 
function StageGruppespil () {

    useEffect(() => {
        if (localStorage.getItem("activeGame")) {
            setActiveGame(localStorage.getItem("activeGame"));
        }
        const user = getUser();
        setUsername(user.username);
    }, [])

    const [username, setUsername] = useState("");

    const [playerOdds, setPlayerOdds] = useState([]);

    const [time, setTime] = useState(false);
    const [timeText, setTimeText] = useState("");

    const [tableArray, setTableArray] = useState([]);

    const [gevinst, setGevinst] = useState("Indlæser...");
    const [first, setFirst] = useState("Indlæser...");
    const [kuponer, setKuponer] = useState("Indlæser...");
    const [startAm, setStartAm] = useState(0);
    const [gameName, setGameName] = useState("");
    const [beskeder, setBeskeder] = useState([]);
    const [beskederLength, setBeskederLength] = useState(0);

    const [beskedText, setBeskedText] = useState("");

    const [gameAdmin, setGameAdmin] = useState("");

    const [activeGame, setActiveGame] = useState("");

    const [loadingText, setLoadingText] = useState("Indlæser...");
    
    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            if (document.getElementById("stage-loader1")) {
                document.getElementById("stage-loader1").classList.remove("display");
            }
            if (document.getElementById("stage-loader2")) {
                document.getElementById("stage-loader2").classList.remove("display");
            }
        }
    }, [loadingText])

    useEffect(() => {
        if (time === true) {
            setTimeout(function (){
                setTime(false);
                setTimeText("")
            }, 15000);
        }
    }, [time])

    function getTopN(arr, n) {
        var clone = arr.slice(0);
        clone.sort(function(x, y) {
            if (x.info.money === y.info.money) return 0;
            else if (parseInt(x.info.money) < parseInt(y.info.money)) return 1;
            else return -1;
        });
        return clone.slice(0, n);
    }

    useEffect(() => {
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + localStorage.getItem("activeGame");

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfig).then(response => {
            console.log("AWS - Gruppespil:", response)
            if (response.data.admin !== undefined && response.data.admin !== null) {
                var newTableArray = [];
                var myPlayer = [];
                for (var k in response.data.players) {
                    if (response.data.players[k].player === localStorage.getItem("email")) {
                        myPlayer = response.data.players[k].odds;
                        setGameAdmin(response.data.admin);
                        localStorage.setItem("notifikationer", response.data.players[k].info.notifikationer.length);
                    }
                }
                setBeskeder(response.data.beskeder);
                setBeskederLength(response.data.beskeder.length);
                myPlayer.sort((a, b) => {
                    return a.iat - b.iat;
                });
                setPlayerOdds(myPlayer.reverse());
                setGameName(response.data.name);
                setStartAm(response.data.start_amount);
    
                var startValue = parseInt(response.data.start_amount);
                var gevinstVar = 0;
                var antalKuponer = 0;
                for (var i in response.data.players) {
                    var kapital = response.data.players[i].info.money;
                    gevinstVar = gevinstVar + (kapital - startValue);
    
                    var playerKuponer = response.data.players[i].odds.length;
                    antalKuponer = antalKuponer + playerKuponer;
                    var finalKuponer = antalKuponer + "";
                }
                var gevinstDone = gevinstVar+" kr.";
                setGevinst(gevinstDone);
                setKuponer(finalKuponer);
    
                var n = response.data.players.length;
                var topScorers = getTopN(response.data.players, n);
                topScorers.forEach(function(item, index) {
                    if (index === 0) {
                        setFirst(item.username+"");
                    }
                    setTableArray(newTableArray => [...newTableArray, item]);
                });
                setLoadingText("")
            } else {
                if (localStorage.getItem("activeGame")) {
                    document.getElementById("main-error").classList.add("display-flex");
                    document.getElementById("main-error-p").innerHTML = "Dit aktive spil er suspenderet.";
                    localStorage.setItem("aktive-spil-suspend", "true");
                }
            }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }, [])

    function adminSettings() {
        if (gameAdmin === localStorage.getItem("email")){
            return (
                <Link href="">
                    <button className="gruppespil3-btn">Indstillinger</button>
                </Link>
            );
        } else {
            return (
                <></>
            );
        }
    }

    const sendBesked = event => {
        event.preventDefault();
        if (beskedText !== "" && time !== true) {
            setTimeText("")
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/besked";

            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const auth = JSON.parse(localStorage.getItem("auth"));

            var beskedArray = beskeder;
            beskedArray.push({
                name: auth.username,
                besked: beskedText,
                iat: new Date().getTime()
            })
            setBeskederLength(beskederLength + 1);
            setBeskeder(beskedArray);
    
            const verifyBody = {
                beskedA: {
                    name: auth.username,
                    besked: beskedText
                },
                game: localStorage.getItem("activeGame")
            }

    
            axios.patch(URL, verifyBody, requestConfig).then(response => {
                console.log("AWS - Besked:", response);
                setBeskedText("");
            }).catch(error => {
                console.log(error);
            })
            setTime(true);
        } else if (beskedText === "") {
            setTimeText("Din besked kan ikke være tom.")
        } else {
            setTimeText("Der skal gå minimum 15 sekunder mellem hver besked.")
        }
    }

    function getBeskeder() {
        if (beskederLength >= 5) {
            return beskeder.slice(beskederLength - 5,beskederLength).map((item) => {
            var nameVar = "chat-name";
            if (item.name === JSON.parse(localStorage.getItem("auth")).username) {
                nameVar = "chat-name-active";
            }

            var dato_string = "";
            var dato_time_string = "";
            var dato_day;
            var dato_month;
            var dato_year;

            var dato_minutes;
            var dato_hours;
            if (item.iat !== undefined) {
                dato_minutes = new Date(parseInt(item.iat)).getMinutes();
                dato_hours = new Date(parseInt(item.iat)).getHours();
                if ((dato_minutes.toString()).length === 1) {
                     dato_time_string = dato_hours + ":0" + dato_minutes;
                } else {
                    dato_time_string = dato_hours + ":" + dato_minutes;
                }

                var today_day = new Date().getDate();
                var today_month = new Date().getMonth();
                var today_year = new Date().getFullYear();
                dato_day = new Date(parseInt(item.iat)).getDate();
                dato_month = new Date(parseInt(item.iat)).getMonth();
                dato_year = new Date(parseInt(item.iat)).getFullYear();
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

            return (
                <li key={item.iat}>
                    <div className="chat-element">
                        <div className="chat-top">
                            <div className="chat-top-left">
                                <div className="chat-pic"></div>
                                <p className={nameVar}>{item.name}</p>
                                <p className="chat-dato">{dato_string}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="chat-int" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </div>
                        <p className="chat-p">{item.besked}</p>
                    </div>
                </li>
                );
            }
        )} else {
            return beskeder.slice(0,5).map((item) => {
                var nameVar = "chat-name";
                if (item.name === JSON.parse(localStorage.getItem("auth")).username) {
                    nameVar = "chat-name-active";
                }
    
                var dato_string = "";
                var dato_time_string = "";
                var dato_day;
                var dato_month;
                var dato_year;
    
                var dato_minutes;
                var dato_hours;
                if (item.iat !== undefined) {
                    dato_minutes = new Date(parseInt(item.iat)).getMinutes();
                    dato_hours = new Date(parseInt(item.iat)).getHours();
                    if ((dato_minutes.toString()).length === 1) {
                         dato_time_string = dato_hours + ":0" + dato_minutes;
                    } else {
                        dato_time_string = dato_hours + ":" + dato_minutes;
                    }
    
                    var today_day = new Date().getDate();
                    var today_month = new Date().getMonth();
                    var today_year = new Date().getFullYear();
                    dato_day = new Date(parseInt(item.iat)).getDate();
                    dato_month = new Date(parseInt(item.iat)).getMonth();
                    dato_year = new Date(parseInt(item.iat)).getFullYear();
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
    
                return (
                    <li key={item.iat}>
                        <div className="chat-element">
                            <div className="chat-top">
                                <div className="chat-top-left">
                                    <div className="chat-pic"></div>
                                    <p className={nameVar}>{item.name}</p>
                                    <p className="chat-dato">{dato_string}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="chat-int" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                            </div>
                            <p className="chat-p">{item.besked}</p>
                        </div>
                    </li>
                    );
                }
            )
        }
    }

    return (
        <>
            <Head>
                <title>Gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            {activeGame && <div className="gruppespil-container-2">
                <div className="gruppespil-section">
                    <Link href="/priser"><a className="gruppespil-opret-own">Opret dit eget gruppespil</a></Link>
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">{gameName}</h1>
                            <Link href="/stage/aktive-spil">
                                <button className="gruppespil2-btn">Skift</button>
                            </Link>
                            {adminSettings()}
                        </div>
                        <div className="gruppespil-info-info">
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Total Gevinst</p>
                                <p className="gruppespil-info-element-h1">{Number(parseFloat(gevinst).toFixed(2))} kr.</p>
                            </div>
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Førende</p>
                                <p className="gruppespil-info-element-h1">{first}</p>
                            </div>
                            <div className="gruppespil-info-element">
                                <p className="gruppespil-info-element-p">Antal Kuponer</p>
                                <p className="gruppespil-info-element-h1">{kuponer}</p>
                            </div>
                        </div>
                    </div>
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Chat</h1>
                        </div>
                        <div className="chat-container">
                            <ul>
                                {getBeskeder()}
                            </ul>
                            <form className="chat-input" onSubmit={sendBesked}>
                                <input id="chat_input" type="text" className="chat-field" value={beskedText} placeholder="Skriv en besked" onChange={event => setBeskedText(event.target.value)} onSubmit={sendBesked} />
                                <svg xmlns="http://www.w3.org/2000/svg" className="chat-send" onClick={sendBesked} viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                </svg>
                            </form>
                            <p className="chat-error">{timeText}</p>
                        </div>
                    </div>
                    <div className="gruppespil-info">
                        <div className="gruppespil-title" id="gruppespil-title">
                            <h1 className="gruppespil-h1">Dine Kuponer</h1>
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
                                        if ((dato_minutes.toString()).length === 1) {
                                            dato_time_string = dato_hours + ":0" + dato_minutes;
                                    } else {
                                        dato_time_string = dato_hours + ":" + dato_minutes;
                                    }

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
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Spildeltagere</h1>
                        </div>
                        <div className="spil-loader display" id="stage-loader2"></div>
                        <div className="gruppespil-table">
                            <div className="gruppespil-table-top">
                                <p className="gruppespil-table-title gruppetable-navn">NAVN</p>
                                <p className="gruppespil-table-title gruppetable-number" id="table-anv">VÆDDEMÅL</p>
                                <p className="gruppespil-table-title gruppetable-kapital">KAPITAL</p>
                                <p className="gruppespil-table-title gruppetable-number" id="table-av">AKTIVE VÆDDEMÅL</p>
                            </div>
                            <ul>
                                {tableArray.map((item, index) => {
                                    var profit = parseInt(item.info.money) - startAm;
                                    var kapital = item.info.money;
                                    var profitHtml = <></>;
                                    if (profit >= 0) {
                                        profitHtml = <p className="gruppespil-table-p gruppetable-kapital gruppetable-win"><svg xmlns="http://www.w3.org/2000/svg" className="gruppetable-icon-win" viewBox="0 0 16 16">
                                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                    </svg>{profit},00 kr.<span className="gruppetable-span">({kapital},00 kr.)</span></p>;
                                    } else {
                                        profitHtml = <p className="gruppespil-table-p gruppetable-kapital gruppetable-loss"><svg xmlns="http://www.w3.org/2000/svg" className="gruppetable-icon-loss" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>{profit},00 kr.<span className="gruppetable-span">({kapital},00 kr.)</span></p>;
                                    }

                                    var medlemsskab = item.info.medlemsskab;
                                    if (medlemsskab === "plus") {
                                        medlemsskab = "gruppespil-table-medlemsskab-primary";
                                    } else if (medlemsskab === "premium") {
                                        medlemsskab = "gruppespil-table-medlemsskab-gold";
                                    } else if (medlemsskab === "administrator") {
                                        medlemsskab = "gruppespil-table-medlemsskab-special";
                                    } else {
                                        medlemsskab = "gruppespil-table-medlemsskab-silver";
                                    }

                                    var aktive = 0;
                                    for (var w in item.odds) {
                                        if (item.odds[w].calculated === "false") {
                                            aktive = aktive + 1;
                                        }
                                    }

                                    var showMe = "";
                                    if (item.player === localStorage.getItem("email")) {
                                        showMe = " gruppespil-row-active";
                                    }

                                    return (
                                        <li key={item.player}>
                                            <Link href={"/stage/gruppespil/spiller?spiller="+item.player+"&game="+activeGame}>
                                                <div className={"gruppespil-table-row"+showMe}>
                                                    <p className="gruppespil-table-place gruppetable-place">{index + 1}</p>
                                                    <div className={medlemsskab}></div>
                                                    <p className="gruppespil-table-h1 gruppetable-el-navn">{item.username}</p>
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-anv-data">{item.odds.length}</p>
                                                    {profitHtml}
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-av-data">{aktive}</p>
                                                </div>
                                            </Link>
                                        </li>
                                        );
                                    }
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="gruppespil-info" id="inviteInfo">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Inviter venner</h1>
                            <p className="gruppespil-scroll">Klik for at kopiere</p>
                        </div>
                        <div className="opret-element-input gruppespil-invite" onClick={() => {navigator.clipboard.writeText("https://tipsspillet.dk/gruppesession?game=" + activeGame + "&type=invite"); document.getElementById("copied").classList.toggle("display-not"); setTimeout(function (){
        document.getElementById("copied").classList.toggle("display-not")
    }, 1000);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="invite-icon" viewBox="0 0 16 16">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                            </svg>
                            <p className="invite-p">invite.tipsspillet.dk/{activeGame}&type=invite</p>
                            <div className="invite-copied display-not" id="copied">Kopieret</div>
                        </div>
                    </div>
                </div>
            </div>}
            {!activeGame && <div className="gruppespil-container-2">
                    <div className="gruppespil-section">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Velkommen, {username && <>{username}</>}</h1><br></br>
                            <p className="info-p">Du har ikke noget valgt spil.</p>
                            <Link href="/stage/aktive-spil">
                                <button className="gruppespil-btn">Vælg spil</button>
                            </Link>
                        </div>
                        <div className="info-figure">
                            <div className="info-figure1"></div>
                            <div className="info-figure2"></div>
                        </div>
                    </div>
            </div>}
        </>
    )
}
 
export default StageGruppespil;