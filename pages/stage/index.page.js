import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getUser } from "../services/authService";
import { getKupon, getString } from "../services/algo.js";
import { DayPicker } from 'react-day-picker';
import da from 'date-fns/locale/da';
import 'react-day-picker/dist/style.css';
import Congrats from '../img/congrats.svg';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
import Height from '../components/height';
 
function StageForside () {

    useEffect(() => {
        if (window.innerWidth < 1020) {
            if (document.getElementById("kupon")) {
                document.getElementById("kupon").classList.add("kupon-min");
                document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
            }
        }

        getSpiller();
        if (localStorage.getItem("activeGame")) {
            gameCall();
        }

        if (odds !== null && odds !== undefined) {
            if (sessionStorage.getItem("odds") !== "" && sessionStorage.getItem("odds") !== null && sessionStorage.getItem("odds") !== undefined) {
                var secreturn = JSON.parse(sessionStorage.getItem("odds"));
                var oddsreplice = 1;
                for (var u in secreturn) {
                    oddsreplice = oddsreplice * parseFloat(secreturn[u].probability);
                }
                setReturnOdds(oddsreplice);
                setOdds(JSON.parse(sessionStorage.getItem("odds")));
                setNotUsableBtn(JSON.parse(sessionStorage.getItem("notUsableBtn")));
                setKuponBtn("kupon-btn");
            }
        }

        window.addEventListener("scroll", function(){
            if (document.getElementById("kupon")) {
                var kupon = document.getElementById("kupon");
                kupon.classList.toggle("kupon-top2", window.scrollY >0);
            }
            if (document.getElementById("md-container")) {
                var md = document.getElementById("md-container");
                md.classList.toggle("md-sticky", window.scrollY > 250);
            }
        })
    
        window.addEventListener("resize", function(){
            if (window.innerWidth < 1020) {
                if (document.getElementById("kupon")) {
                    document.getElementById("kupon").classList.add("kupon-min");
                    document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
                }
            } else {
                if (document.getElementById("kupon")) {
                    document.getElementById("kupon").classList.remove("kupon-min");
                    document.getElementById("kupon-title").innerHTML = kuponType;
                }
            }
        })
        if (document.getElementById('md-wrapper')) {
            document.getElementById('md-wrapper').scrollLeft = 250;
        }
    }, [])

    const [popular, setPopular] = useState([
        {
            "id": 14,
            "name": "Manchester United",
            "liga": "Premier League",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png"
        },
        {
            "id": 18583,
            "name": "Danmark",
            "liga": "Landshold",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/18583.png"
        },
        {
            "id": 85,
            "name": "FC København",
            "liga": "Superliga",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/21/85.png"
        },
        {
            "id": 8,
            "name": "Liverpool",
            "liga": "Premier League",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png"
        },
        {
            "id": 3468,
            "name": "Real Madrid",
            "liga": "La Liga",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/12/3468.png"
        },
        {
            "id": 18647,
            "name": "Frankrig",
            "liga": "Landshold",
            "img": "https://cdn.sportmonks.com/images/soccer/teams/23/18647.png"
        }
    ])

    const [currentLeagues, setCurrentLeagues] = useState([]);
    const [ligaLoad, setLigaLoad] = useState(false);

    const [auth, setAuth] = useState("");
    const [activeGame, setActiveGame] = useState("");

    useEffect(() => {
        setAuth(localStorage.getItem("auth"));
        setActiveGame(localStorage.getItem("activeGame"));
    }, [])

    const [selected, setSelected] = useState(new Date());
    const [chosenDate, setChosenDate] = useState("I dag");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substring(0,10))

    const [position, setPosition] = useState(0);
    const [positionCount, setPositionCount] = useState(0);
    const [slutdato, setSlutdato] = useState("Ingen");
    const [slutdatostr, setSlutdatoStr] = useState("Ingen");
    const [activeGameName, setActiveGameName] = useState("Indlæser...");
    const [selectedGame, setSelectedGame] = useState([]);

    const [items, setItems] = useState([]);
    const [kommendeItems, setKommendeItems] = useState([]);
    const [favoritItems, setFavoritItems] = useState([]);
    const [loadingText, setLoadingText] = useState("Indlæser...");
    const [favoritter, setFavoritter] = useState([]);
    const [kuponType, setKuponType] = useState("Single");

    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-main0").classList.add("opacity100");
            document.getElementById("stage-main1").classList.add("opacity100");
            // document.getElementById("stage-main2").classList.add("display");
            // document.getElementById("stage-main3").classList.add("display");

            document.getElementById("stage-loader1").classList.remove("display");
            document.getElementById("stage-loader2").classList.remove("display");
        }
    }, [loadingText])
    const [notUsableBtn, setNotUsableBtn] = useState([]);
    const [kuponBtn, setKuponBtn] = useState("kupon-btn odd-notusable");
    const [odds, setOdds] = useState([]);
    const [returnOdds, setReturnOdds] = useState(1);

    useEffect(() => {
        if (odds.length > 0) {
            document.getElementById("kombination-content").classList.add("display");
            if (odds.length > 1) {
                setKuponType("Kombination");
                document.getElementById("kuponType").classList.add("display-flex");
            } else {
                setKuponType("Single");
                document.getElementById("kuponType").classList.remove("display-flex");
            }
        } else {
            document.getElementById("kombination-content").classList.remove("display");
            document.getElementById("kuponType").classList.remove("display-flex");
        }
    }, [odds])

    useEffect(() => {
        if (kuponType === "Singler") {
            // document.getElementById("singler").classList.add("kupon-type-element-active");
            document.getElementById("kombination").classList.remove("kupon-type-element-active");
            // document.getElementById("system").classList.remove("kupon-type-element-active");
            
            document.getElementById("singler-content").classList.add("display");
            document.getElementById("kombination-content").classList.remove("display");

            document.getElementById("singler-bottom").classList.add("display");
            document.getElementById("kombination-bottom").classList.remove("display");
        } else if (kuponType === "Kombination") {
            // document.getElementById("singler").classList.remove("kupon-type-element-active");
            document.getElementById("kombination").classList.add("kupon-type-element-active");
            // document.getElementById("system").classList.remove("kupon-type-element-active");

            document.getElementById("singler-content").classList.remove("display");
            document.getElementById("kombination-content").classList.add("display");

            document.getElementById("singler-bottom").classList.remove("display");
            document.getElementById("kombination-bottom").classList.add("display");
        }
    }, [kuponType])

    const [singleIndsats, setSingleIndsats] = useState(0);
    const [singleUdbetaling, setSingleUdbetaling] = useState(0);
    const [indsats, setIndsats] = useState(0);
    const [udbetaling, setUdbetaling] = useState(0);
    const [currentMoney, setCurrentMoney] = useState(0);

    var checkMonth = "" + (new Date().getMonth() + 1);
    if (checkMonth.length === 1) {
        checkMonth = "0" + checkMonth;
    }
    var checkDay = "" + new Date().getDate();
    if (checkDay.length === 1) {
        checkDay = "0" + checkDay;
    }
    var checkDay2 = "" + (new Date().getDate() + 1);
    if (checkDay2.length === 1) {
        checkDay2 = "0" + checkDay2;
    }

    var leagueQuery = "fixtures/between/"+ new Date().getFullYear() + "-" + checkMonth + "-" + checkDay + "/" + new Date().getFullYear() + "-" + checkMonth + "-" + checkDay2;

    useEffect(() => {
        var checkMonths = "" + (new Date(selected).getMonth() + 1);
        if (checkMonths.length === 1) {
            checkMonths = "0" + checkMonths;
        }
        var checkDays = "" + new Date(selected).getDate();
        if (checkDays.length === 1) {
            checkDays = "0" + checkDays;
        }
        var checkDay2s = "" + (new Date(new Date(selected).getTime() + (3600 * 1000 * 24)).getDate());
        if (checkDay2s.length === 1) {
            checkDay2s = "0" + checkDay2s;
        }
        var checkMonths2 = checkMonths;
        if (new Date(new Date(selected).getTime() + (3600 * 1000 * 24)).getDate() === 1) {
            checkMonths2 = "" + (new Date(selected).getMonth() + 2);
            if (checkMonths2.length === 1) {
                checkMonths2 = "0" + checkMonths2;
            }
        }
        if (new Date(selected).getDate() === new Date().getDate() && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I dag");
        } else if (new Date(selected).getDate() === new Date().getDate() + 1 && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I morgen")
        } else if (new Date(selected).getDate() === new Date().getDate() - 1 && new Date(selected).toLocaleString("da-DK", {month: 'long'}) === new Date().toLocaleString("da-DK", {month: 'long'}) && new Date(selected).getFullYear === new Date().getFullYear) {
            setChosenDate("I går")
        } else {
            setChosenDate(new Date(selected).getDate() + " " + new Date(selected).toLocaleString("da-DK", {month: 'long'}))
        }
        leagueQuery = "fixtures/between/" + new Date(selected).getFullYear() + "-" + checkMonths + "-" + checkDays + "/" + new Date(selected).getFullYear() + "-" + checkMonths2 + "-" + checkDay2s;
        apiCall();
        
        var tMonth = (new Date(selected).getMonth() + 1) + "";
        if (tMonth.length === 1) {
            tMonth = "0" + tMonth;
        }
        var tDate = new Date(selected).getDate() + "";
        if (tDate.length === 1) {
            tDate = "0" + tDate;
        }
        setSelectedDate(new Date(selected).getFullYear() + "-" + tMonth + "-" + tDate);
        setLoadingText("Indlæser...");
    }, [selected])

    function place3wayBet(btnId, matchId, homeTeam, visitorTeam, probability, oddsResult, oddsDate) {
        if (!notUsableBtn.includes(btnId) && odds.length < 6) {
            document.getElementById(btnId).classList.add("odd-off");
            setNotUsableBtn([...notUsableBtn, "3Way Result"+btnId]);
            sessionStorage.setItem("notUsableBtn", JSON.stringify([...notUsableBtn, "3Way Result"+btnId]))
    
            var mstime = new Date().getTime();
            var randomNumber = Math.floor(Math.random() * 512);
            var randomId = mstime+"-"+randomNumber;
            const jsonNote = {
                "id": randomId,
                "match": matchId,
                "hometeam": homeTeam,
                "visitorteam": visitorTeam,
                "probability": probability,
                "odds_type": "3Way Result",
                "odds_result": oddsResult,
                "odds_date": oddsDate
            }
    
            setOdds([...odds, jsonNote]);
    
            for (var o in odds) {
                setReturnOdds(returnOdds * odds[o].probability);
            }
            setReturnOdds(returnOdds * jsonNote.probability);
            if (udbetaling === 0) {
                setUdbetaling((jsonNote.probability * indsats));
            } else {
                setUdbetaling((returnOdds * jsonNote.probability) * indsats);
            }
            setKuponBtn("kupon-btn");
            sessionStorage.setItem("odds", JSON.stringify([...odds, jsonNote]))
        } else if (odds.length >= 6) {
            setNotiMessage("error", "For mange væddemål", "Du har allerede 6 ud af 6 mulige væddemål pr. kupon.")
        }
    }

    function rem3wayBet(matchId, type, result) {
        var returnOddsNew = 1;
        var udbetalingNew = 0;
        var oddsSession = JSON.parse(sessionStorage.getItem("odds"));
        for (var y in oddsSession) {
            if (oddsSession[y].odds_result !== result + "") {
                returnOddsNew = returnOddsNew * parseFloat(oddsSession[y].probability);
                udbetalingNew = returnOddsNew * indsats;
            }
        }
        for (var y in oddsSession) {
            if (oddsSession[y].match === parseInt(matchId) && oddsSession[y].odds_result === result + "") {
                const betIdIndex = "3Way Result"+matchId+"-"+oddsSession[y].odds_result;

                var storageReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                var indexRep = storageReplica.indexOf(betIdIndex);
                storageReplica.splice(indexRep, 1);
                setNotUsableBtn(storageReplica);
                sessionStorage.setItem("notUsableBtn", JSON.stringify(storageReplica));

                var oddsSessionIndex = oddsSession.findIndex(item => item.match === matchId && item.odds_result === result + "");
                oddsSession.splice(oddsSessionIndex, 1);
                setOdds(oddsSession);
                sessionStorage.setItem("odds", JSON.stringify(oddsSession));
            }
        }
        setReturnOdds(returnOddsNew);
        setUdbetaling(udbetalingNew);
        if ((odds.length - 1) <= 0) {
            setKuponBtn("kupon-btn odd-notusable");
            document.getElementById("kombination-content").classList.remove("display");
            document.getElementById("singler-content").classList.remove("display");

            document.getElementById("kombination-bottom").classList.add("display");
            document.getElementById("singler-bottom").classList.remove("display");
        }
    }

    function updateUdbetaling(type, oddsSend, indsats) {
        if (type === "kombination") {
            var indsatsValue = document.getElementById("indsatsInput").value;
            setUdbetaling(returnOdds * parseInt(indsatsValue));
        } else {
            var totalUdbetaling = 0;
            for (var q in odds) {
                var dc = document.getElementById("singleindsats"+odds[q].match+"-"+odds[q].odds_result);
                if (dc.value !== "" && dc.value !== null && dc.value !== undefined) {
                    totalUdbetaling = totalUdbetaling + (parseFloat(dc.value) * parseFloat(odds[q].probability));
                }
            }
            setSingleUdbetaling(totalUdbetaling);
        }
    }

    function delBet(betId, matchId) {
        var returnOddsNew = 1;
        var udbetalingNew = 0;
        for (var y in odds) {
            if (odds[y].id === betId) {
                const betIdIndex = "3Way Result"+matchId+"-"+odds[y].odds_result;

                var index = notUsableBtn.indexOf(betIdIndex);
                notUsableBtn.splice(index, 1);

                var storageReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                var indexRep = storageReplica.indexOf(betIdIndex);
                storageReplica.splice(indexRep, 1)
                sessionStorage.setItem("notUsableBtn", JSON.stringify(storageReplica));

                setOdds(odds.filter(item => item.id !== betId));
                var replica = odds.filter(item => item.id !== betId);
                sessionStorage.setItem("odds", JSON.stringify(replica));
            } else {
                returnOddsNew = returnOddsNew * odds[y].probability;
                udbetalingNew = returnOddsNew * indsats;
            }
        }
        setReturnOdds(returnOddsNew);
        setUdbetaling(udbetalingNew);
        if ((odds.length - 1) <= 0) {
            setKuponBtn("kupon-btn odd-notusable");
            document.getElementById("kombination-content").classList.remove("display");
            document.getElementById("singler-content").classList.remove("display");

            document.getElementById("kombination-bottom").classList.add("display");
            document.getElementById("singler-bottom").classList.remove("display");
        }
    }

    function placeBet(type) {
        if (type === "kombination") {
            var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            var placeBetBTN = document.getElementById("placeBetBTN");
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || indsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (indsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                    placeBetBTN.innerHTML = "Placér bet";
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
                placeBetBTN.innerHTML = "Placér bet";
            } else {
                if (currentMoney < indsats || indsats < selectedGame["min_amount"] || indsats > selectedGame["max_amount"]) {
                    if (currentMoney < indsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                        placeBetBTN.innerHTML = "Placér bet";
                    } else if (indsats < selectedGame["min_amount"]) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                        placeBetBTN.innerHTML = "Placér bet";
                    } else if (indsats > selectedGame["max_amount"]) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                        placeBetBTN.innerHTML = "Placér bet";
                    }
                } else {
                    var newDiv = JSON.parse(sessionStorage.getItem("odds"));
                    var valueArr = newDiv.map(function(item){ return item.id });
                        var isDuplicate = valueArr.some(function(item, idx){ 
                            return valueArr.indexOf(item) != idx 
                        });
                        if (isDuplicate) {
                            setNotiMessage("error", "Hovsa...", "Det ser ud til du har duplikeret et odds... Ryd din kupon og prøv igen");
                            placeBetBTN.innerHTML = "Placér bet";
                        } else {
                            const placeBetUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/bet";
                    const userEmail = localStorage.getItem("email");
            
                    const betConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }
        
                    const localGame = localStorage.getItem("activeGame");
                    const localIndex = parseInt(localStorage.getItem("playerIndex"));
        
                    var last_date = 0;
                    var gammel = false;
                    var currentDate = new Date().getTime();
                    for (var p in odds) {
                        const bet_dato = parseInt(odds[p].odds_date);
                        if (bet_dato*1000 < currentDate) {
                            setNotiMessage("error", "Gammel væddemål", "Et væddemål du prøver at oddse på er allerede startet.");
                            placeBetBTN.innerHTML = "Placér bet";
                            gammel = true;
                        } else {
                            if (bet_dato > last_date) {
                                last_date = bet_dato;
                            }
                        }
                    }
        
                    if (gammel !== true) {
                        const betBody = {
                            "betId": localGame,
                            "updateValue": {
                                "bets": [],
                                "player": userEmail,
                                "indsats": indsats,
                                "fullProb": returnOdds,
                                "last_date": last_date,
                                "type": "kombination"
                            },
                            "index": localIndex
                        }
                
                        for (var m in odds) {
                            const match = odds[m].match;
                            const result = odds[m].odds_result;
                            const probability = odds[m].probability;
                            const type = odds[m].odds_type;
                            const visitorteamString = odds[m].visitorteam;
                            const hometeamString = odds[m].hometeam;
                            const bet_date = odds[m].odds_date;
                
                            betBody.updateValue.bets[m] = {
                                "game" : match,
                                "betType": type,
                                "result": result,
                                "probability": probability,
                                "hometeam": hometeamString,
                                "visitorteam": visitorteamString,
                                "bet_date": bet_date,
                                "indsats": 0
                            }
                        }
                
                        axios.patch(placeBetUrl, betBody, betConfig).then(response => {
                            document.getElementById("bet-modal").classList.add("display-not");
                            // document.getElementById("singler-modal").classList.add("display-not")
                            document.getElementById("placed-modal").classList.remove("display-not");
                            console.log("AWS - Oprettet:", betBody, response)
                            setCurrentMoney(currentMoney - indsats);
                        }).catch(error => {
                            console.log(error);
                            setNotiMessage("error", "Fejl ved oprettelse af væddemål", error);
                        })
                        emptyBets();
                        setNotiMessage("success", "Væddemål placeret", "Dit væddemål er nu placeret. Gå til 'Mine gruppespil' for at se dine væddemål.");
                        var placeBetBTN2 = document.getElementById("placeBetBTN");
                        placeBetBTN2.innerHTML = "Placér bet";
                    }
                        }
                }
            }
        } else {
            var nowDate = new Date().getTime();
        var varighedDate = new Date(slutdato).getTime();
        var placeBetBTN = document.getElementById("placeBetBTN");
        if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || singleIndsats <= 0) {
            if (!(odds.length > 0)) {
                setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                placeBetBTN.innerHTML = "Placér bet";
            } else if (!(localStorage.getItem("activeGame"))) {
                setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                placeBetBTN.innerHTML = "Placér bet";
            } else if (singleIndsats <= 0) {
                setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                placeBetBTN.innerHTML = "Placér bet";
            }
        } else if (nowDate > varighedDate) {
            setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            placeBetBTN.innerHTML = "Placér bet";
        } else {
            if (currentMoney < singleIndsats || singleIndsats < selectedGame["min_amount"] || singleIndsats > selectedGame["max_amount"]) {
                if (currentMoney < singleIndsats) {
                    setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (singleIndsats < selectedGame["min_amount"]) {
                    setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    placeBetBTN.innerHTML = "Placér bet";
                } else if (singleIndsats > selectedGame["max_amount"]) {
                    setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    placeBetBTN.innerHTML = "Placér bet";
                }
            } else {
                var newDiv = JSON.parse(sessionStorage.getItem("odds"));
                var valueArr = newDiv.map(function(item){ return item.id });
                    var isDuplicate = valueArr.some(function(item, idx){ 
                        return valueArr.indexOf(item) != idx 
                    });
                    if (isDuplicate) {
                        setNotiMessage("error", "Hovsa...", "Det ser ud til du har duplikeret et odds... Ryd din kupon og prøv igen");
                        placeBetBTN.innerHTML = "Placér bet";
                    } else {
                        const placeBetUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/bet";
                const userEmail = localStorage.getItem("email");
        
                const betConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const localGame = localStorage.getItem("activeGame");
                const localIndex = parseInt(localStorage.getItem("playerIndex"));
    
                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Gammel væddemål", "Et væddemål du prøver at oddse på er allerede startet.");
                        placeBetBTN.innerHTML = "Placér bet";
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }
    
                if (gammel !== true) {
                    const betBody = {
                        "betId": localGame,
                        "updateValue": {
                            "bets": [],
                            "player": userEmail,
                            "indsats": indsats,
                            "fullProb": returnOdds,
                            "last_date": last_date,
                            "type": "singler"
                        },
                        "index": localIndex
                    }
            
                    for (var m in odds) {
                        const match = odds[m].match;
                        const result = odds[m].odds_result;
                        const probability = odds[m].probability;
                        const type = odds[m].odds_type;
                        const visitorteamString = odds[m].visitorteam;
                        const hometeamString = odds[m].hometeam;
                        const bet_date = odds[m].odds_date;
            
                        betBody.updateValue.bets[m] = {
                            "game" : match,
                            "betType": type,
                            "result": result,
                            "probability": probability,
                            "hometeam": hometeamString,
                            "visitorteam": visitorteamString,
                            "bet_date": bet_date,
                            "indsats": 0
                        }
                    }
            
                    axios.patch(placeBetUrl, betBody, betConfig).then(response => {
                        document.getElementById("bet-modal").classList.add("display-not");
                        // document.getElementById("singler-modal").classList.add("display-not")
                        document.getElementById("placed-modal").classList.remove("display-not");
                        console.log("AWS - Oprettet:", betBody, response)
                        setCurrentMoney(currentMoney - indsats);
                    }).catch(error => {
                        console.log(error);
                        setNotiMessage("error", "Fejl ved oprettelse af væddemål", error);
                    })
                    emptyBets();
                    setNotiMessage("success", "Væddemål placeret", "Dit væddemål er nu placeret. Gå til 'Mine gruppespil' for at se dine væddemål.");
                    var placeBetBTN2 = document.getElementById("placeBetBTN");
                    placeBetBTN2.innerHTML = "Placér bet";
                }
                    }
            }
        }
        }
    }

    function emptyBets() {
        document.getElementById("kombination-content").classList.remove("display");
        document.getElementById("singler-content").classList.remove("display");

        document.getElementById("kombination-bottom").classList.add("display");
        document.getElementById("singler-bottom").classList.remove("display");
        setSingleIndsats(0);
        setSingleUdbetaling(0);
        setOdds([]);
        sessionStorage.setItem("odds", "");
        setReturnOdds(1);
        setIndsats(0);
        setUdbetaling(0);
        setKuponBtn("kupon-btn odd-notusable");

        setNotUsableBtn([]);
        sessionStorage.setItem("notUsableBtn", "");
        document.getElementById("indsatsInput").value = "";
        if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== undefined && sessionStorage.getItem("notUsableBtn") !== null) {
            for (var l in notUsableBtn) {
                var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[l].slice(11)
                const el = document.getElementById(removedPart);
                el.classList.remove("odd-off");
            }
        }
    }

    function apiCall() {
        var t0 = new Date().getTime();
        fetch("https://soccer.sportmonks.com/api/v2.0/"+leagueQuery+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=localTeam,visitorTeam,odds,league,league.country,league.round&bookmakers=2&tz=Europe/Copenhagen&per_page=150")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Fixtures:", result);
            console.log("Første fetch: " + (new Date().getTime() - t0) + " ms")
            var th0 = new Date().getTime();
            if (result.meta.pagination.total > result.meta.pagination.count) {
                fetch("https://soccer.sportmonks.com/api/v2.0/"+leagueQuery+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=localTeam,visitorTeam,odds,league,league.country&bookmakers=2&tz=Europe/Copenhagen&per_page=150&page=2")
                .then(response => response.json())
                .then(function (response) {
                    console.log("Sportmonks - Fixtures Page 2:", response);
                    console.log("Anden fetch: " + (new Date().getTime() - t0) + " ms - Call: " + (new Date().getTime() - th0) + " ms")

                    var pagesArray = [...result.data, ...response.data];
                    setItems(pagesArray);

                    if (leagueQuery.slice(17) === (new Date().getFullYear() + "-" + checkMonth + "-" + checkDay) + "/" + (new Date().getFullYear() + "-" + checkMonth + "-" + checkDay2)) {
                        var kommendeItemsArray = [];
                        var dupli = JSON.parse(JSON.stringify(pagesArray));
                        var favoritArr = [];
                        var favoritArrSes = JSON.parse(localStorage.getItem("favoritter"));
                        for (var y in dupli) {
                            if (dupli[y].odds.data.length > 0) {
                                if (dupli[y].time.status !== "FT" && dupli[y].odds.data[0].bookmaker.data[0].odds.data[0] && dupli[y].odds.data[0].bookmaker.data[0].odds.data[1] && dupli[y].odds.data[0].bookmaker.data[0].odds.data[2] && (parseInt(favoritArrSes.findIndex(obj => obj.id === dupli[y].localTeam.data.id)) >= 0 || parseInt(favoritArrSes.findIndex(obj => obj.id === dupli[y].visitorTeam.data.id)) >= 0)) {
                                    favoritArr.push(dupli[y]);
                                }
                                if (dupli[y].time.status !== "FT" && dupli[y].odds.data[0].bookmaker.data[0].odds.data[0] && dupli[y].odds.data[0].bookmaker.data[0].odds.data[1] && dupli[y].odds.data[0].bookmaker.data[0].odds.data[2]) {
                                    kommendeItemsArray.push(dupli[y]);
                                }
                            }
                        }
                        kommendeItemsArray.sort((a, b) => {
                            return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                        });
                        favoritArr.sort((a, b) => {
                            return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                        });
                        setFavoritItems(favoritArr);
                        setKommendeItems(kommendeItemsArray);
                    }
                    setLoadingText("");
                })
                .catch(error => console.log('error', error));
            } else {
                var kommendeItemsArray = [];
                var favoritArr = [];
                var favoritArrSes = JSON.parse(localStorage.getItem("favoritter"));
                setItems(result.data);
                for (var i in result.data) {
                    if (result.data[i].odds.data.length > 0) {
                        if (result.data[i].time.status !== "FT" && result.data[i].odds.data[0].bookmaker.data[0].odds.data[0] && result.data[i].odds.data[0].bookmaker.data[0].odds.data[1] && result.data[i].odds.data[0].bookmaker.data[0].odds.data[2] && (parseInt(favoritArrSes.findIndex(obj => obj.id === result.data[i].localTeam.data.id)) >= 0 || parseInt(favoritArrSes.findIndex(obj => obj.id === result.data[i].visitorTeam.data.id)) >= 0)) {
                            favoritArr.push(result.data[i]);
                        }
                        if (result.data[i].time.status !== "FT" && result.data[i].odds.data[0].bookmaker.data[0].odds.data[0] && result.data[i].odds.data[0].bookmaker.data[0].odds.data[1] && result.data[i].odds.data[0].bookmaker.data[0].odds.data[2]) {
                            kommendeItemsArray.push(result.data[i]);
                        }
                    }
                }
                if (leagueQuery.slice(17) === (new Date().getFullYear() + "-" + checkMonth + "-" + checkDay) + "/" + (new Date().getFullYear() + "-" + checkMonth + "-" + checkDay2)) {
                    kommendeItemsArray.sort((a, b) => {
                        return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                    });
                    favoritArr.sort((a, b) => {
                        return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                    });
                    console.log(favoritArr)
                    setFavoritItems(favoritArr);
                    setKommendeItems(kommendeItemsArray);
                }
                setLoadingText("");
            }
            })
            .catch(error => console.log('error', error));
    }

    function multiFetch(l,checkArray, calcUdbetaling, odd_ids, k, kupon, type) {
        if (type === "kombination") {
            var activeGame = localStorage.getItem("activeGame");
            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
            fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/multi/"+odd_ids+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=odds&bookmakers=2&tz=Europe/Copenhagen&per_page=150")
            .then(response => response.json())
            .then(function (result) {
                var doneGames = 0;
                for (var o in result.data) {
                    if (result.data[o].time.status === "FT") {
                        doneGames = doneGames + 1;
                    }
                }
                var winning = 0;
                var winsArray = [];
                if (doneGames === result.data.length) {
                    for (var u in result.data) {
                        for (var t in checkArray) {
                            if (checkArray[t].game === result.data[u].id) {
                                if (checkArray[t].type.slice(0,-3) === "Over/Under") {
                                    if (result.data[u].odds.data[result.data[u].odds.data.findIndex(obj => obj.name === checkArray[t].type.slice(0,-3))].bookmaker.data[0].odds.data[parseInt(checkArray[t].result)].winning === true) {
                                        winning = winning + 1;
                                        winsArray.push(checkArray[t]);
                                    }
                                } else {
                                    if (result.data[u].odds.data[result.data[u].odds.data.findIndex(obj => obj.name === checkArray[t].type)].bookmaker.data[0].odds.data[parseInt(checkArray[t].result)].winning === true) {
                                        winning = winning + 1;
                                        winsArray.push(checkArray[t]);
                                    }
                                }
                            }
                        }
                    }
                    if (winning === parseInt(checkArray.length)) {
                        const betCalcURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatewin";
    
                        const winBody = {
                            game: activeGame,
                            playerIndex: parseInt(k),
                            udbetaling: Number(Number(parseFloat(calcUdbetaling)).toFixed(2)),
                            odds: parseInt(l),
                            kupon: kupon,
                            wins: winsArray
                        }
                        axios.patch(betCalcURL, winBody, requestConfig).then(responseTem => {
                            console.log("AWS - Win:", responseTem, winBody);
                        }).catch(error => {
                            if (error.response.status === 401 || error.response.status === 403) {
                                setNotiMessage("error","Fejl i opdatering af udbetaling" , error.response.data.message);
                            } else {
                                setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                            }
                        })
                    } else {
                        const betCalcURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatelose";
    
                        const loseBody = {
                            game: activeGame,
                            playerIndex: parseInt(k),
                            odds: parseInt(l),
                            kupon: kupon,
                            wins: winsArray
                        }
                
                        axios.patch(betCalcURL2, loseBody, requestConfig).then(responseItem => {
                            console.log("AWS - Loss:", responseItem, loseBody);
                        }).catch(error => {
                            if (error.response.status === 401 || error.response.status === 403) {
                                setNotiMessage("error","Fejl i opdatering af calc" , error.response.data.message);
                            } else {
                                setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                            }
                        })
                    }
                }
                })
                .catch(error => console.log('error', error));
        } else {
            var activeGame = localStorage.getItem("activeGame");
        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }
        fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/multi/"+odd_ids+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=odds&bookmakers=2&tz=Europe/Copenhagen&per_page=150")
        .then(response => response.json())
        .then(function (result) {
            var doneGames = 0;
            for (var o in result.data) {
                if (result.data[o].time.status === "FT") {
                    doneGames = doneGames + 1;
                }
            }
            var winning = 0;
            var winsArray = [];
            if (doneGames === result.data.length) {
                for (var u in result.data) {
                    for (var t in checkArray) {
                        if (checkArray[t].game === result.data[u].id) {
                            if (result.data[u].odds.data[result.data[u].odds.data.findIndex(obj => obj.name === checkArray[t].type)].bookmaker.data[0].odds.data[parseInt(checkArray[t].result)].winning === true) {
                                winning = winning + 1;
                                winsArray.push(checkArray[t]);
                            }
                        }
                    }
                }
                if (winning > 0) {
                    var doneUdbetaling = 0;
                    for (var y in winsArray) {
                        for (var u in kupon.bets) {
                            if (kupon.bets[u].game === winsArray[y].game && kupon.bets[u].result === winsArray[y].result) {
                                doneUdbetaling = kupon.bets[u].indsats * parseFloat(kupon.bets[u].probability);
                            }
                        }
                    }
                    const betCalcURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatewin";

                    const winBody = {
                        game: activeGame,
                        playerIndex: parseInt(k),
                        udbetaling: doneUdbetaling,
                        odds: parseInt(l),
                        kupon: kupon,
                        wins: winsArray
                    }
                    axios.patch(betCalcURL, winBody, requestConfig).then(responseTem => {
                        console.log("AWS - Win:", responseTem, winBody);
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setNotiMessage("error","Fejl i opdatering af udbetaling" , error.response.data.message);
                        } else {
                            setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                        }
                    })
                } else {
                    const betCalcURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updatelose";

                    const loseBody = {
                        game: activeGame,
                        playerIndex: parseInt(k),
                        odds: parseInt(l),
                        kupon: kupon,
                        wins: winsArray
                    }
            
                    axios.patch(betCalcURL2, loseBody, requestConfig).then(responseItem => {
                        console.log("AWS - Loss:", responseItem, loseBody);
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setNotiMessage("error","Fejl i opdatering af calc" , error.response.data.message);
                        } else {
                            setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                        }
                    })
                }
            }
            })
            .catch(error => console.log('error', error));
        }
    }

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

    function getSpiller() {
        var email = localStorage.getItem("email");
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user?user=" + email;

        const requestConfigen = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        axios.get(URL, requestConfigen).then(response => {
            console.log("AWS - User:", response);
            var favorit = [];
            if (response.data.favoritter.length > 0) {
                for (var y in response.data.favoritter) {
                    favorit.push(response.data.favoritter[y]);
                }
            }
            setFavoritter(favorit);
            localStorage.setItem("favoritter", JSON.stringify(favorit));
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    function getIndskydelse(data) {
        var nowDate = new Date().getTime();
        var varighedDate = new Date(slutdato).getTime();
        if (nowDate < varighedDate) {
            var oprettelse_weeks = data.oprettelse / (1000*60*60*24*7);
            var weeks = data.indskydelse_int;
            var weekSince = (new Date().getTime() / (1000*60*60*24*7)) - oprettelse_weeks;
            if (weekSince - weeks >= 1) {
                var activeGame = localStorage.getItem("activeGame");
                const betCalcURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updateindskydelse";
        
                const winBody = {
                    game: activeGame + "",
                    amount: data.indskydelse_amount,
                    players: data.players,
                    since: Math.floor(weekSince)
                }
    
                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
                axios.patch(betCalcURL, winBody, requestConfig).then(responseTem => {
                    console.log("AWS - Indskydelse:", responseTem, winBody);
                    for (var i in responseTem.data.players) {
                        if (responseTem.data.players[i].player === localStorage.getItem("email")) {
                            setCurrentMoney(responseTem.data.players[i].info.money);
                        }
                    }
                }).catch(error => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setNotiMessage("error","Fejl i opdatering af indskydelse" , error.response.data.message);
                    } else {
                        setNotiMessage("error","Serverfejl" , "Serveren slog fejl. Dette skyldes ofte for meget trafik på hjemmesiden. Kontakt os for mere information.");
                    }
                })
            }
        }
    }

    function gameCall() {
        if (typeof window !== 'undefined') {
            var activeGame = localStorage.getItem("activeGame");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + activeGame;
    
            const requestConfigen = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            axios.get(URL, requestConfigen).then(response => {
                console.log("AWS - Gruppespil:", response)
                if (response.data.admin !== undefined && response.data.admin !== null) {
                    setActiveGameName(response.data.name);
                    setSelectedGame(response.data);
                    var slutStringDay = new Date(response.data.varighed).getDate();
                    var slutStringMonth = new Date(response.data.varighed).getMonth() + 1;
                    var slutStringYear = new Date(response.data.varighed).getFullYear();
                    setSlutdatoStr(slutStringDay + "/" + slutStringMonth + "/" + slutStringYear);
                    setSlutdato(response.data.varighed);
        
                    for (var k in response.data.players) {
                        if (response.data.players[k].player === localStorage.getItem("email")) {
                            localStorage.setItem("notifikationer", response.data.players[k].info.notifikationer.length);
                        }
                        for (var l in response.data.players[k].odds) {
                            var calcUdbetaling = parseFloat(response.data.players[k].odds[l].fullProb) * parseFloat(response.data.players[k].odds[l].indsats);
                            const newDate = new Date().getTime();
                            if (response.data.players[k].odds[l].calculated === "false" && response.data.players[k].odds[l].last_date <  parseInt((newDate.toString()).slice(0, -3))) {
                                var odd_ids = "";
                                var checkArray = [];
                                for (var y in response.data.players[k].odds[l].bets) {
                                    var oddId = response.data.players[k].odds[l].bets[y].game;
                                    var resultId = response.data.players[k].odds[l].bets[y].result;
                                    var type = response.data.players[k].odds[l].bets[y].betType;
                                    var bettype = response.data.players[k].odds[l].type;
                                    checkArray.push({
                                        "game": oddId,
                                        "result": resultId,
                                        "type": type
                                    })
                                    if (odd_ids === "") {
                                        odd_ids = oddId;
                                    } else {
                                        odd_ids = odd_ids + "," + oddId;
                                    }
                                }
                                var kupon = response.data.players[k].odds[l];
                                multiFetch(l,checkArray,calcUdbetaling,odd_ids,k,kupon,bettype);
                            }
                        }
                    }
    
                    getIndskydelse(response.data);
        
                    var n = response.data.players.length;
                    setPositionCount(n);
                    var topScorers = getTopN(response.data.players, n);
                    topScorers.forEach(function(gameItem, index) {
                        if (gameItem.player === localStorage.getItem("email")) {
                            setCurrentMoney(gameItem.info.money)
                            setPosition(index + 1);
                        }
                    });
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
        }
    }

    function setSingleIndsatser(indsats, id) {
        var tempIndsats = 0;
        var classArray = document.getElementsByClassName("single-kupon-input");
        for(var i = 0; i < classArray.length; i++){
            if (classArray[i].value !== "" && classArray[i].value !== null && classArray[i].value !== undefined) {
                tempIndsats = tempIndsats + parseInt(classArray[i].value);
            }
        }
        setSingleIndsats(tempIndsats);
    }

    function showLigaer() {
        if (ligaLoad === false) {
            fetch("https://soccer.sportmonks.com/api/v2.0/leagues?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=country&bookmakers=2&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (result) {
                console.log("Sportmonks - Leagues:", result);
                setCurrentLeagues(result.data);
                document.getElementById("stage-loader3").classList.remove("display");
            })
            .catch(error => console.log('error', error));
            setLigaLoad(true);
        }
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        document.getElementById("leagueModal").classList.remove("display-not");
    }

    function remLigaer() {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        document.getElementById("leagueModal").classList.add("display-not");
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

    function showSearch() {
        document.getElementById("mb-search").classList.remove("display-not")
        document.getElementById("nav-hits").classList.add("display");
        document.getElementById("hits-close").classList.add("display");
    }

    function showModal(type, modalType) {
        if (type === "bet") {
            if (modalType === "kombination") {
                var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || indsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                } else if (indsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            } else {
                if (currentMoney < indsats || indsats < selectedGame["min_amount"] || indsats > selectedGame["max_amount"]) {
                    if (currentMoney < indsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    } else if (indsats < selectedGame["min_amount"]) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    } else if (indsats > selectedGame["max_amount"]) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    }
                } else {

                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Gammel væddemål", "Et væddemål du prøver at oddse på er allerede startet.");
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }

                if (gammel !== true) {
                    document.getElementById("bet-modal").classList.remove("display-not")
                        document.getElementById("errorCon").classList.remove("display")
                }
                }
            }
            } else {
                var nowDate = new Date().getTime();
            var varighedDate = new Date(slutdato).getTime();
            if (!(odds.length > 0) || !(localStorage.getItem("activeGame")) || singleIndsats <= 0) {
                if (!(odds.length > 0)) {
                    setNotiMessage("error", "Ingen væddemål", "Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.");
                } else if (!(localStorage.getItem("activeGame"))) {
                    setNotiMessage("error", "Intet aktivt gruppespil", "For at placere et væddemål, skal du være tilmeldt et gruppespil, og sætte det som aktivt.");
                } else if (singleIndsats <= 0) {
                    setNotiMessage("error", "Positivt beløb", "Din indsats på dit væddemål skal være positiv.");
                }
            } else if (nowDate > varighedDate) {
                setNotiMessage("error", "Gruppespil slut", "Gruppespillet er desværre allerede færdiggjort.");
            } else {
                if (currentMoney < singleIndsats || singleIndsats < selectedGame["min_amount"] || singleIndsats > selectedGame["max_amount"]) {
                    if (currentMoney < singleIndsats) {
                        setNotiMessage("error", "Ikke nok penge", "Du har ikke nok penge, til at placere denne kupon. Prøv med et lavere beløb.");
                    } else if (singleIndsats < selectedGame["min_amount"]) {
                        setNotiMessage("error", "Minimumsbeløb", "Dette gruppespil spiller med et minimumsbeløb på " + selectedGame["min_amount"]);
                    } else if (singleIndsats > selectedGame["max_amount"]) {
                        setNotiMessage("error", "Maksimumsbeløb", "Dette gruppespil spiller med et maksimumsbeløb på " + selectedGame["max_amount"]);
                    }
                } else {
    
                var last_date = 0;
                var gammel = false;
                var currentDate = new Date().getTime();
                for (var p in odds) {
                    const bet_dato = parseInt(odds[p].odds_date);
                    if (bet_dato*1000 < currentDate) {
                        setNotiMessage("error", "Aktiv kamp", "En kamp du prøver at oddse på, er allerede sat igang.");
                        gammel = true;
                    } else {
                        if (bet_dato > last_date) {
                            last_date = bet_dato;
                        }
                    }
                }
    
                if (gammel !== true) {
                    document.getElementById("singler-modal").classList.remove("display-not")
                        document.getElementById("errorCon").classList.remove("display")
                }
                }
            }
            }
        }
    }

    function getCurrentLeagues() {
        return (
            <div className="league-modal display-not" id="leagueModal">
                <div className="league-wrapper">
                    <div className="leagues-top-right">
                        <svg xmlns="http://www.w3.org/2000/svg" className="exp-icon" viewBox="0 0 16 16" onClick={() => remLigaer()}>
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </div>
                    <p className="league-modal-h1">Tilgængelige ligaer</p>
                    <div className="match-loader display" id="stage-loader3"></div>
                    <ul className="league-modal-table">
                        <li key="dk" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/dk.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Danmark</p>
                            </div>
                            <p className="league-modal-p">#320</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Denmark") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk2" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/eu.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">International</p>
                            </div>
                            <p className="league-modal-p">#41</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Europe") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk3" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/gb.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">England</p>
                            </div>
                            <p className="league-modal-p">#462</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "England") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk4" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/de.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Tyskland</p>
                            </div>
                            <p className="league-modal-p">#11</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Germany") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px"src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk5" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/fr.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Frankrig</p>
                            </div>
                            <p className="league-modal-p">#17</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "France") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk6" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/it.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Italien</p>
                            </div>
                            <p className="league-modal-p">#251</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Italy") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk7" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/es.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Spanien</p>
                            </div>
                            <p className="league-modal-p">#32</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name === "Spain") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                        <li key="dk8" className="league-modal-country-element">
                            <div className="league-modal-element-left">
                                <div className="league-modal-div">
                                    <Image width="20px" height="20px" src="https://cdn.sportmonks.com/images/countries/png/short/eu.png" alt="" className="league-modal-el-img" />
                                </div>
                                <p className="league-modal-p">Resten af verden</p>
                            </div>
                            <p className="league-modal-p">#</p>
                        </li>
                        {currentLeagues.map(item => {
                            if (item.country.data.name !== "Germany" && item.country.data.name !== "England" && item.country.data.name !== "Denmark" && item.country.data.name !== "Spain" && item.country.data.name !== "Europe" && item.country.data.name !== "Italy" && item.country.data.name !== "France") {
                                return (
                                    <li key={item.id} className="league-modal-element">
                                        <div className="league-modal-element-left">
                                            <div className="league-modal-div">
                                                <Image width="20px" height="20px" src={item.logo_path} alt="" className="league-modal-el-img" />
                                            </div>
                                            <p className="league-modal-p">{item.name}</p>
                                        </div>
                                        <p className="league-modal-p">#{item.id}</p>
                                    </li>
                                );
                            } else {
                                return;
                            }
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    const [kuponState, setKuponState] = useState("closed");

    function switchKupon() {
        if (kuponState === "closed") {
            document.getElementById("kupon").classList.remove("kupon-min");
            document.getElementById("kuponRev").classList.remove("deg180");
            setKuponState("open");
            document.getElementById("kupon-title").innerHTML = kuponType;
        } else if (kuponState === "open") {
            document.getElementById("kupon").classList.add("kupon-min");
            document.getElementById("kuponRev").classList.add("deg180");
            setKuponState("closed");
            document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
        }
    }

    function getMatches(type) {
        var leagues = [];
        var favorites = [];
        var favorit3 = [];
        var newItems = items;
        if (type === "kommende") {
            newItems = kommendeItems;
        }
        if (type === "favoritter") {
            newItems = favoritItems;
        }
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("favoritter")) {
                favorit3 = JSON.parse(localStorage.getItem("favoritter"));
            }
        }
        if (newItems.length > 0) {
            for (var g in newItems) {
                var id3 = leagues.findIndex(obj => obj.id === newItems[g].league.data.id);
                if (id3 < 0) {
                    if (newItems[g].league.data.round !== undefined) {
                        leagues.push({
                            id: newItems[g].league.data.id,
                            name: newItems[g].league.data.name,
                            season: newItems[g].league.data.current_season_id,
                            round: newItems[g].league.data.round.data.name,
                            img: newItems[g].league.data.country.data.image_path
                        });
                    } else {
                        leagues.push({
                            id: newItems[g].league.data.id,
                            name: newItems[g].league.data.name,
                            season: newItems[g].league.data.current_season_id,
                            img: newItems[g].league.data.country.data.image_path
                        });
                    }
                    for (var q in favorit3) {
                        if (favorit3[q].id === newItems[g].league.data.current_season_id) {
                            favorites.push(newItems[g].league.data.current_season_id);
                        }
                    }
                    
                }
            }
        }
        leagues.sort((a, b) => {
            return a.id - b.id;
        });
        var prefLeagues = [8, 271, 274, 2, 564, 82, 301, 384];
        prefLeagues.reverse();
        for (var o in prefLeagues) {
            if (leagues.length > 0) {
                for (var p in leagues) {
                    var dupli = {};
                    if (prefLeagues[o] === leagues[p].id) {
                        dupli = leagues[p];
                        var id = parseInt(p);
                        leagues.splice(id, 1);
                        leagues.unshift(dupli);
                    }
                }
            }
        }
        for (var u in favorites) {
            if (leagues.length > 0) {
                var id = leagues.findIndex(obj => obj.season === favorites[u]);
                var dupli = {};
                if (id >= 0) {
                    dupli = leagues[id];
                    leagues.splice(id, 1);
                    leagues.unshift(dupli);
                }
            }
        }
        return leagues.map(league => {
            var leagueParse = league.id;
            var dateParse = selectedDate;
            var favDiv = <svg xmlns="http://www.w3.org/2000/svg" className="leagueImg-none" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
          </svg>;
            for (var q in favorit3) {
                if (favorit3[q].id === league.season) {
                    favDiv = <svg xmlns="http://www.w3.org/2000/svg" className="leagueImg" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>;
                }
            }
            var getType = items;
            if (type === "kommende") {
                getType = kommendeItems;
            }
            if (type === "favoritter") {
                getType = favoritItems;
            }
            return (
                <>
                    <li key={league.season + league.name} className="stage-kampe-section">
                        <div className="stage-kampe-head" onClick={() => {window.open("/stage/league?id=" + league.season, "_SELF")}}>
                            <p className="stage-league"><Image width="18px" height="18px" className="inline-img" src={league.img} alt="" />{league.name}{league.round !== undefined && <> | Runde {league.round}</>}</p>
                        </div>
                        <div className="stage-kampe">
                            {loadingText}
                            <ul>
                            {getType.map(item => {
                                var timeClass = "stage-kampe-minut";
                                var starting_at_year = new Date(item.time.starting_at.timestamp * 1000).getDate();
                                var yearClass = "display-not";
                                if (starting_at_year === (new Date().getDate() + 1)) {
                                    yearClass = "team-kampe-minut";
                                }
                                var liveView = "FT";
                                var scoreLocal = "stage-stilling-p";
                                var scoreVisitor = "stage-stilling-p";
                                var teamNameLocal = "stage-kampe-p";
                                var teamNameVisitor = "stage-kampe-p";
                                var getTime = <div className="time-con">
                                    <p className="stage-kampe-minut">{liveView}</p>
                                    <p className={yearClass}>I morgen</p>
                                </div>;
                                if (item.time.status === "LIVE") {
                                    liveView = item.time.minute;
                                    getTime = <div className="live-con">
                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                        <p className="stage-blink">&apos;</p>
                                    </div>;
                                } else if (item.time.status === "NS") {
                                    scoreLocal = "stage-stilling-p-none";
                                    scoreVisitor = "stage-stilling-p-none";
                                    var calcTime = item.time.starting_at.time;
                                    calcTime = calcTime.slice(0,-3);
                                    liveView = calcTime;
                                    getTime = <div className="time-con">
                                    <p className="stage-kampe-minut">{liveView}</p>
                                    <p className={yearClass}>I morgen</p>
                                </div>;
                                } else if (item.time.status === "FT") {
                                    if (item.winner_team_id === item.localteam_id) {
                                        scoreLocal = "stage-stilling-p-fat";
                                        teamNameLocal = "stage-kampe-p-fat";
                                    } else if (item.winner_team_id === item.visitorteam_id) {
                                        scoreVisitor = "stage-stilling-p-fat";
                                        teamNameVisitor = "stage-kampe-p-fat";
                                    }
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "CANCL") {
                                    liveView = "AFLYST";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "HT") {
                                    liveView = "Pause";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "ET") {
                                    liveView = "EX. TID";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "PEN_LIVE") {
                                    liveView = "STR.";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "BREAK") {
                                    liveView = "Pause";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "POSTP") {
                                    liveView = "Udskudt";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "INT") {
                                    liveView = "Afbrudt";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "ABAN") {
                                    liveView = "Forladt";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "ABAN") {
                                    liveView = "Forladt";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "SUSP") {
                                    liveView = "SUSP.";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "TBA") {
                                    liveView = "TBA";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "DELAYED") {
                                    liveView = "Forsinket";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "WO") {
                                    liveView = "WO";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "AU") {
                                    liveView = "Afventer";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                } else if (item.time.status === "Deleted") {
                                    liveView = "Slettet";
                                    getTime = <div className="time-con">
                                        <p className="stage-kampe-minut">{liveView}</p>
                                        <p className={yearClass}>I morgen</p>
                                    </div>;
                                }

                                if (type === "kommende") {
                                    if ((leagueParse !== 0 && item.league_id === leagueParse && item.odds.data.length > 0) || (leagueParse === 0 && item.league_id !== 2 && item.league_id !== 271 && item.league_id !== 8 && item.league_id !== 564 && item.league_id !== 301 && item.league_id !== 82 && item.league_id !== 573 && item.odds.data.length > 0) && (item.odds.data[0].bookmaker.data[0].odds.data[0] && item.odds.data[0].bookmaker.data[0].odds.data[1] && item.odds.data[0].bookmaker.data[0].odds.data[2])) {
                                        var betButton1;
                                        var betButton2;
                                        var betButton3;
                                        if (item.time.status === "NS") {
                                        betButton1 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "0"} onClick={() => place3wayBet(item.id + "-" + "0", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value, "0", item.time.starting_at.timestamp)}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</p></button>;
                                        betButton2 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "1"} onClick={() => place3wayBet(item.id + "-" + "1", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value, "1", item.time.starting_at.timestamp)}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</p></button>;
                                        betButton3 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "2"} onClick={() => place3wayBet(item.id + "-" + "2", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value, "2", item.time.starting_at.timestamp)}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</p></button>;
                                    } else {
                                        betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</button>;
                                        betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</button>;
                                        betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</button>;
                                        }
                    
                                        if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== null && sessionStorage.getItem("notUsableBtn") !== undefined) {
                                            for (var p in JSON.parse(sessionStorage.getItem("notUsableBtn"))) {
                                                var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[p].slice(11)
                                                if (removedPart === item.id + "-" + "0") {
                                                    betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</p></button>;
                                                }
                                                if (removedPart === item.id + "-" + "1") {
                                                    betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</p></button>;
                                                }
                                                if (removedPart === item.id + "-" + "2") {
                                                    betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</p></button>;
                                                }
                                            }
                                        }
                                        const gameURL = "/stage/match?game=" + item.id;
                                        return (
                                            <li key={item.id}>
                                                <div className="stage-match">
                                                    <div className="stage-kampe-top">
                                                        {item.time.status === "LIVE" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                        {item.time.status === "HT" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                    </div>
                                                    <div className="stage-indhold-down">
                                                    <Link href={gameURL}>
                                                        <div className="stage-kampe-hold">
                                                            {item.time.status === "LIVE" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                        <p className="stage-blink">&apos;</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "HT" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "FT" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">FT</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "AET" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">EFS</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "FT_PEN" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">Str.</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "POSTP" &&
                                                                <>
                                                                    {item.scores.visitorteam_score &&
                                                                        <div className="stage-time">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                            </div>
                                                                            <div className="stage-time-scores">
                                                                                <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                                <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {!item.scores.visitorteam_score &&
                                                                        <div className="stage-time-small">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                                <p className={yearClass}>I morgen</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                            }
                                                            {item.time.status === "NS" &&
                                                                <div className="stage-time-small">
                                                                    <div className="stage-time-con">
                                                                        <p className="stage-kampe-minut">{liveView}</p>
                                                                        <p className={yearClass}>I morgen</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="stage-kampe-hold-div">
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                </div>
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </Link>
                                                        {item.time.status === "NS" &&
                                                            <div className="stage-kampe-odds">
                                                                {betButton1}
                                                                {betButton2}
                                                                {betButton3}
                                                            </div>
                                                        }
                                                        {item.time.status !== "NS" &&
                                                            <div className="stage-kampe-odds-fix">

                                                            </div>
                                                        }
                                                        </div>
                                                    </div>
                                            </li>);
                                    } else return;
                                } else if (type === "favoritter") {
                                    if ((leagueParse !== 0 && item.league_id === leagueParse && item.odds.data.length > 0) || (leagueParse === 0 && item.league_id !== 2 && item.league_id !== 271 && item.league_id !== 8 && item.league_id !== 564 && item.league_id !== 301 && item.league_id !== 82 && item.league_id !== 573 && item.odds.data.length > 0) && (item.odds.data[0].bookmaker.data[0].odds.data[0] && item.odds.data[0].bookmaker.data[0].odds.data[1] && item.odds.data[0].bookmaker.data[0].odds.data[2])) {
                                        var betButton1;
                                        var betButton2;
                                        var betButton3;
                                        if (item.time.status === "NS") {
                                        betButton1 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "0"} onClick={() => place3wayBet(item.id + "-" + "0", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value, "0", item.time.starting_at.timestamp)}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</p></button>;
                                        betButton2 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "1"} onClick={() => place3wayBet(item.id + "-" + "1", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value, "1", item.time.starting_at.timestamp)}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</p></button>;
                                        betButton3 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "2"} onClick={() => place3wayBet(item.id + "-" + "2", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value, "2", item.time.starting_at.timestamp)}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</p></button>;
                                    } else {
                                        betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</button>;
                                        betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</button>;
                                        betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</button>;
                                        }
                    
                                        if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== null && sessionStorage.getItem("notUsableBtn") !== undefined) {
                                            for (var p in JSON.parse(sessionStorage.getItem("notUsableBtn"))) {
                                                var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[p].slice(11)
                                                if (removedPart === item.id + "-" + "0") {
                                                    betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</p></button>;
                                                }
                                                if (removedPart === item.id + "-" + "1") {
                                                    betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</p></button>;
                                                }
                                                if (removedPart === item.id + "-" + "2") {
                                                    betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</p></button>;
                                                }
                                            }
                                        }
                                        const gameURL = "/stage/match?game=" + item.id;
                                        return (
                                            <li key={item.id}>
                                                <div className="stage-match">
                                                    <div className="stage-kampe-top">
                                                        {item.time.status === "LIVE" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                        {item.time.status === "HT" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                    </div>
                                                    <div className="stage-indhold-down">
                                                    <Link href={gameURL}>
                                                        <div className="stage-kampe-hold">
                                                            {item.time.status === "LIVE" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                        <p className="stage-blink">&apos;</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "HT" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "FT" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">FT</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "AET" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">EFS</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "FT_PEN" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">Str.</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "POSTP" &&
                                                                <>
                                                                    {item.scores.visitorteam_score &&
                                                                        <div className="stage-time">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                            </div>
                                                                            <div className="stage-time-scores">
                                                                                <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                                <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {!item.scores.visitorteam_score &&
                                                                        <div className="stage-time-small">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                                <p className={yearClass}>I morgen</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                            }
                                                            {item.time.status === "NS" &&
                                                                <div className="stage-time-small">
                                                                    <div className="stage-time-con">
                                                                        <p className="stage-kampe-minut">{liveView}</p>
                                                                        <p className={yearClass}>I morgen</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            <div className="stage-kampe-hold-div">
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                </div>
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </Link>
                                                        {item.time.status === "NS" &&
                                                            <div className="stage-kampe-odds">
                                                                {betButton1}
                                                                {betButton2}
                                                                {betButton3}
                                                            </div>
                                                        }
                                                        {item.time.status !== "NS" &&
                                                            <div className="stage-kampe-odds-fix">

                                                            </div>
                                                        }
                                                        </div>
                                                    </div>
                                            </li>);
                                    } else return;
                                } else {
                                    if ((leagueParse !== 0 && item.league_id === leagueParse && item.time.starting_at.date === dateParse && item.odds.data.length > 0) || (leagueParse === 0 && item.league_id !== 2 && item.league_id !== 271 && item.league_id !== 8 && item.league_id !== 564 && item.league_id !== 301 && item.league_id !== 82 && item.league_id !== 573 && item.time.starting_at.date === dateParse && item.odds.data.length > 0) && (item.odds.data[0].bookmaker.data[0].odds.data[0].value && item.odds.data[0].bookmaker.data[0].odds.data[1].value && item.odds.data[0].bookmaker.data[0].odds.data[2].value)) {
                                        var betButton1;
                                        var betButton2;
                                        var betButton3;
                                        if (item.time.status === "NS") {
                                            betButton1 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "0"} onClick={() => place3wayBet(item.id + "-" + "0", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value, "0", item.time.starting_at.timestamp)}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</p></button>;
                                            betButton2 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "1"} onClick={() => place3wayBet(item.id + "-" + "1", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value, "1", item.time.starting_at.timestamp)}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</p></button>;
                                            betButton3 = <button className="stage-kampe-odds-btn" id={item.id + "-" + "2"} onClick={() => place3wayBet(item.id + "-" + "2", item.id, item.localTeam.data.name, item.visitorTeam.data.name, item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value, "2", item.time.starting_at.timestamp)}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</p></button>;
                                        } else {
                                            betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[0].value}</button>;
                                            betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[1].value}</button>;
                                            betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}>{item.odds.data[item.odds.data.findIndex(obj => obj.name === "3Way Result")].bookmaker.data[0].odds.data[2].value}</button>;
                                        }
                
                                    if (sessionStorage.getItem("notUsableBtn") !== "" && sessionStorage.getItem("notUsableBtn") !== null && sessionStorage.getItem("notUsableBtn") !== undefined) {
                                        for (var p in JSON.parse(sessionStorage.getItem("notUsableBtn"))) {
                                            var removedPart = JSON.parse(sessionStorage.getItem("notUsableBtn"))[p].slice(11)
                                            if (removedPart === item.id + "-" + "0") {
                                                betButton1 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "0")}><p className="odd-data-p">1</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[0].value}</p></button>;
                                            }
                                            if (removedPart === item.id + "-" + "1") {
                                                betButton2 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "1")}><p className="odd-data-p">X</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[1].value}</p></button>;
                                            }
                                            if (removedPart === item.id + "-" + "2") {
                                                betButton3 = <button className="stage-kampe-odds-btn odd-off" onClick={() => rem3wayBet(item.id, "3Way Result", "2")}><p className="odd-data-p">2</p><p className="odd-data-h1">{item.odds.data[0].bookmaker.data[0].odds.data[2].value}</p></button>;
                                            }
                                        }
                                    }
                                    const gameURL = "/stage/match?game=" + item.id;
                                    var starting_at_year = new Date(item.time.starting_at.timestamp * 1000).getDate();
                                    var yearClass = "display-not";
                                    if (starting_at_year === (new Date().getDate() + 1)) {
                                        yearClass = "team-kampe-minut";
                                    }
                                    return (
                                        <li key={item.id}>
                                            <div className="stage-match">
                                                <div className="stage-kampe-top">
                                                {item.time.status === "LIVE" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                        {item.time.status === "HT" &&
                                                            <div className="stage-live-pulse"></div>
                                                        }
                                                </div>
                                                <div className="stage-indhold-down">
                                                <Link href={gameURL}>
                                                <div className="stage-kampe-hold">
                                                            {item.time.status === "LIVE" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                        <p className="stage-blink">&apos;</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "HT" &&
                                                                <div className="stage-live">
                                                                    <div className="stage-live-con">
                                                                        <p className="stage-kampe-minut stage-kampe-minut-active">{liveView}</p>
                                                                    </div>
                                                                    <div className="stage-live-scores">
                                                                        <p className="stage-stilling-p">{item.scores.localteam_score}</p>
                                                                        <p className="stage-stilling-p">{item.scores.visitorteam_score}</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "NS" &&
                                                                <div className="stage-time-small">
                                                                    <div className="stage-time-con">
                                                                        <p className="stage-kampe-minut">{liveView}</p>
                                                                        <p className={yearClass}>I morgen</p>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {item.time.status === "FT" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">FT</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "AET" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">EFS</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "FT_PEN" &&
                                                                <>
                                                                    <div className="stage-time-small">
                                                                        <div className="stage-time-con">
                                                                            <p className="stage-kampe-minut">Str.</p>
                                                                        </div>
                                                                        <div className="stage-time-scores">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            }
                                                            {item.time.status === "POSTP" &&
                                                                <>
                                                                    {item.scores.visitorteam_score &&
                                                                        <div className="stage-time-small">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                            </div>
                                                                            <div className="stage-time-scores">
                                                                                <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                                <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    {!item.scores.visitorteam_score &&
                                                                        <div className="stage-time-small">
                                                                            <div className="stage-time-con">
                                                                                <p className="stage-kampe-minut">{liveView}</p>
                                                                                <p className={yearClass}>I morgen</p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                            }
                                                            <div className="stage-kampe-hold-div">
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                </div>
                                                                <div className="stage-kampe-team">
                                                                    <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                    <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </Link>
                                                        {item.time.status === "NS" &&
                                                            <div className="stage-kampe-odds">
                                                                {betButton1}
                                                                {betButton2}
                                                                {betButton3}
                                                            </div>
                                                        }
                                                        {item.time.status !== "NS" &&
                                                            <div className="stage-kampe-odds-fix">

                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                        </li>);
                                } else return;
                                }
                            })}
                            </ul>
                        </div>
                    </li>
                </>
            );
        })
    }

    function minField(type) {
        if (type === "kommende") {
            document.getElementById("stage-main1").classList.toggle("field-min");
            document.getElementById("fieldChevkommende").classList.toggle("deg90");
        } else if (type === "favoritter") {
            document.getElementById("stage-main0").classList.toggle("field-min");
            document.getElementById("fieldChevfavoritter").classList.toggle("deg90");
        }
    }
    
    function setDateActive(date) {
        const dates = ["date-bw-6", "date-bw-5", "date-bw-4", "date-bw-3", "date-bw-2", "date-bw-1", "date-0", "date-fw-1", "date-fw-2", "date-fw-3", "date-fw-4", "date-fw-5", "date-fw-6"]
        for (var q in dates) {
            document.getElementById(dates[q]).classList.remove("md-active");
        }
        document.getElementById(date).classList.add("md-active");
    }

    function getDates() {
        const today = new Date().getTime();
        var kommendeDates = [];
        var earlyDates = [];
        for(var i = 1; i < 7; i++){
            var dato = new Date(new Date(today).getTime() + (3600 * 1000 * 24 * i)).getDate() + "";
            if (dato.length === 1) {
                dato = "0" + dato;
            }
            var month = (new Date(new Date(today).getTime() + (3600 * 1000 * 24 * i)).getMonth() + 1) + "";
            if (month.length === 1) {
                month = "0" + month;
            }
            if (new Date(new Date(today).getTime() + (3600 * 1000 * 24 * i)).getDate() === new Date(new Date(today).getTime() + (3600 * 1000 * 24 * 1)).getDate() && (new Date(new Date(today).getTime() + (3600 * 1000 * 24 * i)).getMonth() + 1) === (new Date(new Date(today).getTime() + (3600 * 1000 * 24 * 1)).getMonth() + 1)) {
                kommendeDates.push({
                    date: "I morgen",
                    days: i
                });
            } else {
                kommendeDates.push({
                    date: dato + "." + month,
                    days: i
                });
            }
        }
        for(var i = 1; i < 7; i++){
            var dato = new Date(new Date(today).getTime() - (3600 * 1000 * 24 * i)).getDate() + "";
            if (dato.length === 1) {
                dato = "0" + dato;
            }
            var month = (new Date(new Date(today).getTime() - (3600 * 1000 * 24 * i)).getMonth() + 1) + "";
            if (month.length === 1) {
                month = "0" + month;
            }
            if (new Date(new Date(today).getTime() - (3600 * 1000 * 24 * i)).getDate() === new Date(new Date(today).getTime() - (3600 * 1000 * 24 * 1)).getDate() && (new Date(new Date(today).getTime() - (3600 * 1000 * 24 * i)).getMonth() + 1) === (new Date(new Date(today).getTime() - (3600 * 1000 * 24 * 1)).getMonth() + 1)) {
                earlyDates.push({
                    date: "I går",
                    days: i
                });
            } else {
                earlyDates.push({
                    date: dato + "." + month,
                    days: i
                });
            }
        }
        return (
            <ul className="md-wrapper" id="md-wrapper">
                {earlyDates.reverse().map((date) => {
                    return (
                        <li key={"date-bw-" + date.days} className="md-element" id={"date-bw-" + date.days} onClick={() => {setSelected(new Date(new Date(today).getTime() - (3600 * 1000 * 24 * date.days)));setDateActive("date-bw-" + date.days)}}>
                            <p className="md-p">{date.date}</p>
                        </li>
                    )
                })}
                <li key={"date-0"} className="md-element md-active" id="date-0" onClick={() => {setSelected(new Date(new Date(today).getTime()));setDateActive("date-0")}}>
                    <p className="md-p">I dag</p>
                </li>
                {kommendeDates.map((date) => {
                    return (
                        <li key={"date-fw-" + date.days} className="md-element" id={"date-fw-" + date.days} onClick={() => {setSelected(new Date(new Date(today).getTime() + (3600 * 1000 * 24 * date.days)));setDateActive("date-fw-" + date.days)}}>
                            <p className="md-p">{date.date}</p>
                        </li>
                    )
                })}
            </ul>
        );
    }

    return (
        <>
        <Head>
            <title>Betting - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
        <Height />
        {getCurrentLeagues()}
        <div className="md-container" id="md-container">
            {getDates()}
        </div>
        <div className="modal-test display-not" id="bet-modal">
            <div className="modal-con">
                <p className="con-modal-p">Er du sikker på, at du vil placere din kupon, med en indsats på {indsats},00 kr? Dette beløb er ikke refunderbart.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" id="placeBetBTN1" onClick={() => {var placeBetBTN = document.getElementById("placeBetBTN");
                        placeBetBTN.innerHTML = "<div className='loader'></div>";
                        placeBet("kombination");}}>Placér kupon</button>
                    <button className="con-modal-afbryd" onClick={() => {document.getElementById("bet-modal").classList.add("display-not")}}>Afbryd</button>
                </div>
            </div>
        </div>
        <div className="modal-test display-not" id="singler-modal">
            <div className="modal-con">
                <p className="con-modal-p">Er du sikker på, at du vil placere din kupon, med en indsats på {singleIndsats},00 kr? Dette beløb er ikke refunderbart.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" id="placeBetBTN1" onClick={() => {var placeBetBTN1 = document.getElementById("placeBetBTN1");
                        placeBetBTN1.innerHTML = "<div className='loader'></div>";
                        placeBet("singler");}}>Placér kupon</button>
                    <button className="con-modal-afbryd" onClick={() => {document.getElementById("singler-modal").classList.add("display-not")}}>Afbryd</button>
                </div>
            </div>
        </div>
        <div className="modal-test display-not" id="placed-modal" style={{textAlign: "center"}}>
            <div className="modal-con">
                <div className="con-modal-img-con">
                    <Image width="180px" height="180px" src={Congrats} alt="" className="con-modal-img" />
                </div>
                <p className="con-modal-h1">Din kupon er placeret!</p>
                <p className="con-modal-p">Tag et kig under dit aktive gruppespil, for at se din kupon.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" onClick={() => {document.getElementById("placed-modal").classList.add("display-not")}}>Modtaget</button>
                </div>
            </div>
        </div>
        <div className="stage-main-container">
            <div className={messageType} id="errorCon">
                <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div className="error-text">
                    <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                    <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                </div>
            </div>
            <div className="stage-main">
                {activeGame && <div className="info-section">
                    <p className="info-h1">Velkommen, {auth !== "" && <>{JSON.parse(auth).username}</>}</p>
                    <p className="info-p">Valgte spil: <span className="info-p-span">{activeGameName}
                        <Link href="/stage/aktive-spil">
                            <button className="gruppespil2-btn" style={{marginTop: "0px"}}>Skift</button>
                        </Link>
                    </span></p><br />
                    <p className="info-p">Kapital: <span className="info-p-span">{currentMoney},00 kr.</span></p><br />
                    <p className="info-p">Placering: <span className="info-p-span">{position}</span> af <span className="info-p-span">{positionCount}</span></p><br />
                    <p className="info-p">Slutdato: <span className="info-p-span">{slutdatostr}</span></p>
                    <div className="info-figure">
                        <div className="info-figure1"></div>
                        <div className="info-figure2"></div>
                    </div>
                </div>}
                {!activeGame && <div className="info-section">
                    <p className="info-h1">Velkommen, {auth !== "" && <>{JSON.parse(auth).username}</>}</p>
                    <p className="info-p">Du har ikke noget valgt spil.</p>
                    <Link href="/stage/aktive-spil">
                        <button className="gruppespil-btn">Vælg spil</button>
                    </Link>
                    <div className="info-figure">
                        <div className="info-figure1"></div>
                        <div className="info-figure2"></div>
                    </div>
                </div>}
                <div className="stage-main-kampe-section">
                    <div className="stage-main-matches">
                        <div className="stage-main-matches-section">
                            <div className="stage-section-indhold" id="stage-main0">
                                <div className="stage-section-top" onClick={() => {minField("favoritter")}}>
                                    <p className="stage-kampe-h1">Hold du følger</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="fieldChevfavoritter" className="kupon-minimize" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <div className="match-loader display" id="stage-loader1"></div>
                                <ul>
                                    {getMatches("favoritter")}
                                </ul>
                            </div>
                        </div>
                        <div className="stage-main-matches-section">
                            <div className="stage-section-indhold" id="stage-main1">
                                <div className="stage-section-top" onClick={() => {minField("kommende")}}>
                                    <p className="stage-kampe-h1">Kommende kampe</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="fieldChevkommende" className="kupon-minimize" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                                <ul>
                                    {getMatches("kommende")}
                                </ul>
                            </div>
                        </div>
                        <div className="stage-section-indhold" id="stage-main2">
                        <div className="stage-section-top" style={{paddingTop: "0px", cursor: "default"}}>
                            {/* <div className="stage-cal">
                                <div className="stage-cal-val">
                                    <div className="cal-element" onClick={() => {setSelected(new Date(new Date(selected).getTime() - (3600 * 1000 * 24)))}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="cal-sicon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                        </svg>
                                    </div>
                                    <div className="cal-element" onClick={() => {setSelected(new Date(new Date(selected).getTime() + (3600 * 1000 * 24)))}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="cal-sicon" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="chosen-cal-con" onClick={() => {document.getElementById("cal").classList.toggle("display-flex");}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="cal-icon" viewBox="0 0 16 16">
                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                    </svg>
                                    <p className="stage-chosen-cal">{chosenDate}</p>
                                </div>
                                <div className="stage-daypicker" id="cal">
                                    <DayPicker
                                        mode="single"
                                        selected={selected}
                                        onSelect={setSelected}
                                        locale={da}
                                        styles={{
                                            caption: { color: 'var(--softBlack)' }
                                        }}
                                    />
                                    <div className="stage-day-confirm">
                                        <p className="daypicker-p" onClick={() => {document.getElementById("cal").classList.toggle("display-flex");}}>Luk</p>
                                    </div>
                                </div>
                            </div> */}
                             <p className="stage-kampe-h1">Kampe idag</p>
                        </div>
                        <p className="nogames" id="nogames">Der kunne ikke findes nogen kampe d. {new Date(selected).getDate()}/{new Date(selected).getMonth() + 1}/{new Date(selected).getFullYear()}...</p>
                        <ul>
                            {getMatches("dagens")}
                        </ul>
                        </div>
                    </div>
                    <div className="stage-main-small-section-con">
                        <div className="stage-main-small-section">
                            <div className="match-loader display" id="stage-loader2"></div>
                                <div className="stage-section-indhold" id="stage-main2">
                                    <div className="stage-kampe-top" style={{paddingTop: "10px"}}>
                                        <p className="stage-kampe-h1">Favoritter</p>
                                    </div>
                                    <ul>
                                        {favoritter.length > 0 && favoritter.map((item) => {
                                            return (
                                                <li key={item.name + item.image} className="display" style={{width: "100%"}}>
                                                    <div className="stage-team">
                                                        <Link href={"/stage/team?team=" + item.id}>
                                                            <div className="stage-kampe-team2">
                                                                <div className="stage-kampe-teams-div">
                                                                    <div className="stage-kampe-team">
                                                                        <Image width="22px" height="22px" alt="." src={item.image} className="stage-img" />
                                                                        <div className="stage-teams-element">
                                                                            <p className="stage-teams-h1">{item.name}</p>
                                                                            <p className="stage-teams-h2">{item.liga}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                        {favoritter.length <= 0 && <div className="stage-team" style={{backgroundColor: "var(--surface)", marginBottom: "15px"}} onClick={() => {showSearch()}}>
                    <div className="stage-kampe-team2">
                        <div className="stage-kampe-teams-div">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stage-teams-img" style={{opacity: "0.2"}} viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                            <div className="stage-teams-element">
                                <p className="stage-teams-h2">Klik for at tilføje dit første hold som favorit</p>
                            </div>
                        </div>
                    </div>
                </div>}
                                    </ul>
                                </div>
                                <div className="stage-section-indhold" id="stage-main3">
                                    <div className="stage-kampe-top" style={{paddingTop: "10px"}}>
                                        <p className="stage-kampe-h1">Populære hold</p>
                                    </div>
                                    {popular.map((team) => {
                                        return (
                                            <li key={popular.team} className="stage-team">
                                                <Link href={"/stage/team?team=" + team.id}>
                                                    <div className="stage-kampe-team2">
                                                        <div className="stage-kampe-teams-div">
                                                            <div className="stage-kampe-team">
                                                                <Image width="22px" height="22px" alt="." src={team.img} className="stage-img" />
                                                                <div className="stage-teams-element">
                                                                    <p className="stage-teams-h1">{team.name}</p>
                                                                    <p className="stage-teams-h2">{team.liga}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </div>
                        </div>
                        {/* <div className="stage-main-small-section">
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7071523482288616"
                                crossOrigin="anonymous"></script>
                            <ins className="adsbygoogle"
                                style={{display: "block"}}
                                data-ad-format="autorelaxed"
                                data-ad-client="ca-pub-7071523482288616"
                                data-ad-slot="1204681862"></ins>
                            <script>
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                            <p className="test"></p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="stage-kupon" id="kupon">
                <div className="kupon-top-match">
                    <svg xmlns="http://www.w3.org/2000/svg" id="kuponRev" onClick={() => {switchKupon()}} className="kupon-minimize deg180" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <p className="kupon-header-p" id="kupon-title" onClick={() => {switchKupon()}}>{kuponType}</p>
                    <p className="kupon-blue-match-p" onClick={() => emptyBets()}>Ryd alle</p>
                </div>
                <div className="kupon-type" id="kuponType">
                    <div className="kupon-type-element" id="singler" onClick={() => {setKuponType("Singler")}}>Singler</div>
                    <div className="kupon-type-element kupon-type-element-active" id="kombination" onClick={() => {setKuponType("Kombination")}}>Kombination</div>
                    <div className="kupon-type-element" id="system" onClick={() => {setKuponType("System")}}>System</div>
                </div>
                <ul className="stage-ul" id="kombination-content">
                    {odds.map(bet => {
                        return (
                            <li key={bet.id}>
                                <div className="kupon-container">
                                    <div className="kupon-divider-first"></div>
                                    <p className="kupon-top-p">Dit væddemål</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="kupon-icon2" onClick={() => {delBet(bet.id, bet.match);}} viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    <div className="kupon-divider"></div>
                                    <div className="kupon-content">
                                        <div className="kupon-info">
                                            <p className="kupon-h1">{bet.hometeam} - {bet.visitorteam}</p>
                                            <p className="kupon-p">{getKupon(bet.odds_type,bet.hometeam,bet.visitorteam)}: <span className="weight600">{getString(bet.odds_type,bet.odds_result,bet.hometeam,bet.visitorteam)}</span></p>
                                        </div>
                                        <div className="kupon-odds">
                                            <p className="kupon-h2">{bet.probability}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <ul className="stage-ul" id="singler-content">
                    {odds.map(bet => {
                        return (
                            <li key={bet.id}>
                                <div className="kupon-container">
                                    <div className="kupon-divider-first"></div>
                                    <p className="kupon-top-p">Dit væddemål</p>
                                    <div className="kupon-divider"></div>
                                    <div className="kupon-content">
                                        <div className="kupon-info">
                                            <p className="kupon-h1">{bet.hometeam} - {bet.visitorteam}</p>
                                            <p className="kupon-p">{getKupon(bet.odds_type,bet.hometeam,bet.visitorteam)}: <span className="weight600">{getString(bet.odds_type,bet.odds_result,bet.hometeam,bet.visitorteam)}</span></p>
                                        </div>
                                        <div className="kupon-odds">
                                            <p className="kupon-h2">{bet.probability}</p>
                                            <input type="number" className="single-kupon-input" autoComplete="off" id={"singleindsats"+bet.match+"-"+bet.odds_result} placeholder="Indsats" onChange={event => {setSingleIndsatser(parseInt(event.target.value), bet.id); updateUdbetaling("singler", bet.probability, parseInt(event.target.value))}} />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="kupon-bottom display" id="kombination-bottom">
                    <div className="kupon-bottom-info">
                        <div className="kupon-indsats">
                            <input type="number" className="kupon-input" autoComplete="off" id="indsatsInput" placeholder="Indsats" onChange={event => {setIndsats(parseInt(event.target.value)); updateUdbetaling("kombination", "", 0)}} />
                        </div>
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total indsats</p>
                            <p className="kupon-bottom-info-p-right">{indsats},00 kr.</p>
                        </div>
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total odds</p>
                            <p className="kupon-bottom-info-p-right">{returnOdds.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="kupon-confirm">
                        <div className="kupon-confirm-div">
                            <p className="kupon-confirm-p">Udbetaling:</p>
                            <p className="kupon-confirm-h1">{udbetaling.toFixed(2)} kr.</p>
                        </div>
                        <button className={kuponBtn} id="placeBetBTN" onClick={() => {showModal("bet", "kombination")}}>Placér bet</button>
                    </div>
                </div>
                <div className="kupon-bottom" id="singler-bottom">
                    <div className="kupon-bottom-info">
                        <div className="kupon-info-div">
                            <p className="kupon-bottom-info-p">Total indsats</p>
                            <p className="kupon-bottom-info-p-right">{singleIndsats},00 kr.</p>
                        </div>
                    </div>
                    <div className="kupon-confirm">
                        <div className="kupon-confirm-div">
                            <p className="kupon-confirm-p">Udbetaling:</p>
                            <p className="kupon-confirm-h1">{singleUdbetaling.toFixed(2)} kr.</p>
                        </div>
                        <button className={kuponBtn} id="placeBetBTN" onClick={() => {showModal("bet", "singler")}}>Placér bet</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
 
export default StageForside;