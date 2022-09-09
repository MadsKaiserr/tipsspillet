import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import { Router, useRouter } from 'next/router'

import lineupPitch from '../img/lineup.png';
import goal from '../img/football.png';
import Congrats from '../img/congrats.svg';
import StageHeader from '../layout/stageheader';

function StageMatcharticle () {

    useEffect(() => {
        gameCall();
        getGame();
        if (window.innerWidth < 1020) {
            if (document.getElementById("match-kupon")) {
                document.getElementById("match-kupon").classList.add("kupon-min");
                document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
            }
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
                for (var p in JSON.parse(sessionStorage.getItem("notUsableBtn"))) {
                    var buttonOffValue = document.getElementById(JSON.parse(sessionStorage.getItem("notUsableBtn"))[p]);
                    if (buttonOffValue !== undefined && buttonOffValue !== null) {
                        buttonOffValue.classList.add("odd-off");
                    }
                }
                setKuponBtn("kupon-btn");
            }
        }
        window.addEventListener("resize", function(){
            if (window.innerWidth < 1020) {
                if (document.getElementById("match-kupon")) {
                    document.getElementById("match-kupon").classList.add("kupon-min");
                    document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
                }
            } else {
                if (document.getElementById("match-kupon")) {
                    document.getElementById("match-kupon").classList.remove("kupon-min");
                    document.getElementById("kupon-title").innerHTML = kuponType;
                }
            }
        })
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const matchIDGet = urlParams.get("game");
        setMatchID(matchIDGet);
    }, [])

    const [goals, setGoals] = useState("4");
    const [goalsOdds, setGoalsOdds] = useState("3.20");
    const [goalOddArray, setGoalOddArray] = useState([]);

    useEffect(() => {
        if (goalOddArray.length > 0) {
            setGoalsOdds(goalOddArray[goals].value);
        }
    }, [goals, goalOddArray])

    const [favorit, setFavorit] = useState(false);
    const [favorit2, setFavorit2] = useState(false);

    const [tabelType, setTableType] = useState("");

    const [matchResult, setMatchResult] = useState();
    const [league, setLeague] = useState("");

    const [matchAllowed, setMatchAllowed] = useState(true);
    const [oversigtAllowed, setOversigtAllowed] = useState(false);
    const [items, setItems] = useState([]);

    const [slutdato, setSlutdato] = useState("0");

    const [h2hUsed, seth2hUsed] = useState(false);

    const [start, setStart] = useState("...");
    const [localCoach, setLocalCoach] = useState("...");
    const [visitorCoach, setVisitorCoach] = useState("...");
    const [stadium, setStadium] = useState("...");
    const [dommer, setDommer] = useState("...");
    const [turnering, setTurnering] = useState("...");
    
    const [odds, setOdds] = useState([]);
    const [indsats, setIndsats] = useState(0);
    const [udbetaling, setUdbetaling] = useState(0);
    const [currentMoney, setCurrentMoney] = useState(0);
    const [kuponBtn, setKuponBtn] = useState("kupon-btn odd-notusable");
    const [returnOdds, setReturnOdds] = useState(1);

    const [notUsableBtn, setNotUsableBtn] = useState([]);
    const [selectedGame, setSelectedGame] = useState([]);

    const [availPopular, setAvailPopular] = useState([]);
    const [availCorner, setAvailCorner] = useState([]);
    const [availGoal, setAvailGoal] = useState([]);
    const [availKort, setAvailKort] = useState([]);
    const [availMinutter, setAvailMinutter] = useState([]);
    const [availSpecials, setAvailSpecials] = useState([]);
    const [availSpillere, setAvailSpillere] = useState([]);

    useEffect(() => {
        if (favorit === true) {
            document.getElementById("favorit").classList.add("favorit-active");
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
        }
    }, [favorit])

    useEffect(() => {
        if (favorit2 === true) {
            document.getElementById("favorit2").classList.add("favorit-active");
            document.getElementById("favorit-o2").classList.remove("display");
            document.getElementById("favorit2").classList.add("display");
        }
    }, [favorit2])

    const [homeTeamId, sethomeTeamId] = useState(0);
    const [visitorTeamId, setvisitorTeamId] = useState(0);

    const [homeTeam, sethomeTeam] = useState("Indlæser...");
    const [visitorTeam, setvisitorTeam] = useState("Indlæser...");
    const [homelogo, sethomelogo] = useState("");
    const [visitorlogo, setvisitorlogo] = useState("");
    const [time, settime] = useState("");
    const [live, setlive] = useState("match-stilling-p1");
    const [matchdate, setmatchdate] = useState(0);
    const [matchID, setMatchID] = useState(0);

    const [restTime, setRestTime] = useState("");

    const [udskiftningerHome, setUdskiftningerHome] = useState([]);
    const [udskiftningerVisitor, setUdskiftningerVisitor] = useState([]);

    const [positions, setPositions] = useState([]);
    const [events, setEvents] = useState([]);
    const [statsL, setStatsL] = useState([]);
    const [statsV, setStatsV] = useState([]);

    const [hg1, setHG1] = useState(0);
    const [ag1, setAG1] = useState(0);
    const [hg2, setHG2] = useState(0);
    const [ag2, setAG2] = useState(0);

    const [seasonId, setSeasonId] = useState(0);
    const [stageId, setStageId] = useState(0);

    const [statText, setStatText] = useState("Statistikker bliver opgivet som kampen spilles...");

    const [singleIndsats, setSingleIndsats] = useState(0);
    const [singleUdbetaling, setSingleUdbetaling] = useState(0);

    const [subs, setSubs] = useState([]);

    const [kuponType, setKuponType] = useState("Single");

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

    function getGame() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const matchIDGet2 = urlParams.get("game");
        fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/"+matchIDGet2+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=odds,goals,referee,league.country,aggregate,stats,substitutions,bench,bench.player,lineup,lineup.player,localTeam,league,visitorTeam,localCoach,visitorCoach,venue,events,group,round&bookmakers=2&tz=Europe/Copenhagen")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Fixtures:", result);
            setLeague(result.data.league.data.name);
            setMatchResult(result.data);
            setSubs(result.data.substitutions.data);
            var favoritd = [];
            if (localStorage.getItem("favoritter")) {
                favoritd = JSON.parse(localStorage.getItem("favoritter"));
            } else {
                favoritd = [];
            }
            for (var q in favoritd) {
                if (favoritd[q].id === result.data.localteam_id) {
                    setFavorit(true);
                } else if (favoritd[q].id === result.data.visitorteam_id) {
                    setFavorit2(true);
                }
            }

            setSeasonId(result.data.season_id);
            setStageId(result.data.stage_id);
            if (result.data.stats.data.length > 0) {
                if (result.data.stats.data[0].team_id === result.data.localteam_id) {
                    setStatsL(result.data.stats.data[0]);
                } else {
                    setStatsL(result.data.stats.data[1]);
                }
                if (result.data.stats.data[1].team_id === result.data.visitorteam_id) {
                    setStatsV(result.data.stats.data[1]);
                } else {
                    setStatsV(result.data.stats.data[0]);
                }
                setStatText("");
            }
            var homegoal1 = 0;
            var awaygoal1 = 0;
            var homegoal2 = 0;
            var awaygoal2 = 0;
            for (var i in result.data.events.data) {
                if (result.data.events.data[i].minute <= 45) {
                    if (result.data.events.data[i].type === "goal" && parseInt(result.data.events.data[i].team_id) === result.data.localteam_id) {
                        homegoal1 = homegoal1 + 1;
                    } else if (result.data.events.data[i].type === "goal" && parseInt(result.data.events.data[i].team_id) === result.data.visitorteam_id) {
                        awaygoal1 = awaygoal1 + 1;
                    }
                } else {
                    if (result.data.events.data[i].type === "goal" && parseInt(result.data.events.data[i].team_id) === result.data.localteam_id) {
                        homegoal2 = homegoal2 + 1;
                    } else if (result.data.events.data[i].type === "goal" && parseInt(result.data.events.data[i].team_id) === result.data.visitorteam_id) {
                        awaygoal2 = awaygoal2 + 1;
                    }
                }
            }
            setHG1(homegoal1);
            setAG1(awaygoal1);
            setHG2(homegoal2 + homegoal1);
            setAG2(awaygoal2 + awaygoal1);
            setEvents(result.data.events.data);
            if (result.data.lineup.data.length > 0) {
                document.getElementById("startopstilling-error").classList.remove("display");
                setPositions([result.data.lineup.data]);
            } else {
                document.getElementById("startopstilling2").classList.add("display-not");
            }
            sethomeTeamId(result.data.localteam_id);
            setvisitorTeamId(result.data.visitorteam_id);
            if (result.data.bench) {
                const homeArray = [];
                for (var t in result.data.bench.data) {
                    if (result.data.bench.data[t].team_id === result.data.localteam_id) {
                        homeArray.push(result.data.bench.data[t]);
                    }
                }
                const visitorArray = [];
                for (var t in result.data.bench.data) {
                    if (result.data.bench.data[t].team_id === result.data.visitorteam_id) {
                        visitorArray.push(result.data.bench.data[t]);
                    }
                }
                setUdskiftningerHome(homeArray);
                setUdskiftningerVisitor(visitorArray);
            }
            if (result.data.referee !== undefined) {
                setDommer(result.data.referee.data.fullname);
            } else {
                setDommer("Ukendt");
            }
            if (result.data.venue) {
                setStadium(result.data.venue.data.name);
            } else {
                setStadium("Ukendt");
            }
            if (result.data.time.starting_at.date_time) {
                setStart(result.data.time.starting_at.date_time);
                var nowTime = new Date().getTime();
                var nowStart = new Date(result.data.time.starting_at.date_time).getTime();
                if (nowStart > nowTime) {
                    document.getElementById("navOversigt").className = "match-odds-nav-element-off";
                    setOversigtAllowed(false);
                    setNav("kampinfo")
                } else {
                    setOversigtAllowed(true);
                    setNav("oversigt")
                }
            } else {
                setStart("Ukendt");
            }
            if (result.data.visitorCoach) {
                setVisitorCoach(result.data.visitorCoach.data.fullname);
            } else {
                setVisitorCoach("Ukendt");
            }
            if (result.data.localCoach) {
                setLocalCoach(result.data.localCoach.data.fullname);
            } else {
                setLocalCoach("Ukendt");
            }
            var wherearewe = "";
            if (result.data.league_id === 271) {
                wherearewe = "Danmark / Super Liga"
            } else if (result.data.league_id === 2) {
                wherearewe = "Verden / Champions League"
            } else if (result.data.league_id === 5) {
                wherearewe = "Europa / Europa League"
            } else if (result.data.league_id === 8) {
                wherearewe = "England / Premier League"
            } else if (result.data.league_id === 82) {
                wherearewe = "Tyskland / Bundesliga"
            } else if (result.data.league_id === 301) {
                wherearewe = "Frankrig / Ligue 1"
            } else if (result.data.league_id === 384) {
                wherearewe = "Italien / Serie A"
            } else if (result.data.league_id === 564) {
                wherearewe = "Spanien / La Liga"
            } else if (result.data.league_id === 720) {
                wherearewe = "Europa / VM Kvalifikation Europa"
            } else if (result.data.league_id === 1325) {
                wherearewe = "Europa / EM Kvalifikation"
            } else if (result.data.league_id === 1326) {
                wherearewe = "Europa / EM"
            } else if (result.data.league_id === 2286) {
                wherearewe = "Europa / Conference League"
            } else if (result.data.league_id === 732) {
                wherearewe = "Verden / VM"
            } else if (result.data.league_id === 1082) {
                wherearewe = "Verden / Venskabskamp"
            } else if (result.data.league_id === 1125) {
                wherearewe = "Verden / OL"
            } else if (result.data.league_id === 1398) {
                wherearewe = "Verden / Audi Cup"
            } else if (result.data.league_id === 1538) {
                wherearewe = "Europa / UEFA Nations League"
            } else {
                wherearewe = "Mindre liga"
            }
            setTurnering(wherearewe);
            var timestamp = result.data.time.starting_at.timestamp*1000;

            var isStarted = false;
            if (result.data.time.status === "LIVE" || result.data.time.status === "HT") {
                isStarted = true;
            }
            if (result.data.time.status === "NS") {
                var countDownDate = new Date((result.data.time.starting_at.timestamp*1000)).getTime();
                var x1 = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = countDownDate - now;

                    var days = "" + Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = "" + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = "" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = "" + Math.floor((distance % (1000 * 60)) / 1000);

                    if (days.length === 1) {
                        days = "0" + days;
                    }
                    if (hours.length === 1) {
                        hours = "0" + hours;
                    }
                    if (minutes.length === 1) {
                        minutes = "0" + minutes;
                    }
                    if (seconds.length === 1) {
                        seconds = "0" + seconds;
                    }

                    setRestTime(days + ":" + hours + ":" + minutes + ":" + seconds);

                    if (distance < 0 && isStarted === false) {
                        setRestTime("Starter nu...");
                        checkExpired(timestamp);
                    }
                }, 1000);
            } else if (result.data.time.status === "CANCL") {
                setRestTime("AFLYST");
            } else if (result.data.time.status === "POSTP") {
                setRestTime("UDSKUDT");
            } else if (result.data.time.status === "SUSP") {
                setRestTime("SUSPENDERET");
            } else if (result.data.time.status === "DELAYED") {
                setRestTime("FORSINKET");
            } else if (result.data.time.status === "WO") {
                setRestTime("WO");
            } else if (result.data.time.status === "AU") {
                setRestTime("AFVENTER");
            } else if (result.data.time.status === "Deleted") {
                setRestTime("Slettet");
            }


            setItems(result.data);
            checkExpired(result.data.time.starting_at.timestamp);

            const wants = ["3Way Result", "Over/Under", "Exact Goals Number", "Team To Score First", "Double Chance", "Highest Scoring Half", "Both Teams To Score", "Time Of First Corner", "Corner Match Bet", "A Red Card in the Match", "First Match Corner", "Both Teams To Receive 2+ Cards", "Last Match Corner", "Both Teams To Receive A Card", "Clean Sheet - Home", "Clean Sheet - Away", "2-Way Corners", "First Card Received", "Time Of First Card", "3Way Result 1st Half", "Team To Score Last", "3Way Result 2nd Half", "Double Chance - 1st Half", "Double Chance - 2nd Half", "Odd/Even", "Own Goal", "Time Of First Corner"];
            const availOddsReplica = [];
            for (var r in wants) {
                if (result.data.odds.data.length === 0) {
                    document.getElementById("matchOddsUpdated").classList.add("display-flex");
                } else {
                    document.getElementById("matchOddsUpdated").classList.remove("display-flex");
                    for (var m in result.data.odds.data) {
                        if (result.data.odds.data[m].name === wants[r]) {
                            var n0 = result.data.odds.data[m].bookmaker.data[0].odds.data[0].value;
                            var n1 = result.data.odds.data[m].bookmaker.data[0].odds.data[1].value;
                            if (result.data.odds.data[m].bookmaker.data[0].odds.data[2] !== undefined) {
                                if (result.data.odds.data[m].name === "Over/Under" || result.data.odds.data[m].name === "Goals Over/Under 1st Half" || result.data.odds.data[m].name === "Over/Under 2nd Half") {
                                    var overArray = [];
                                    for (var t in result.data.odds.data[m].bookmaker.data[0].odds.data) {
                                        if (result.data.odds.data[m].bookmaker.data[0].odds.data[t].label === "Over") {
                                            overArray.push(result.data.odds.data[m].bookmaker.data[0].odds.data[t]);
                                        }
                                    }
                                    for (var o in overArray) {
                                        var yourIndex = result.data.odds.data[m].bookmaker.data[0].odds.data.findIndex(obj => obj.total === overArray[o].total && obj.label === "Under");
                                        if (yourIndex >= 0) {
                                            const dataBody = {
                                                "type": result.data.odds.data[m].name + "" + overArray[o].total,
                                                "type_length": 2,
                                                "first": overArray[o].value,
                                                "second": result.data.odds.data[m].bookmaker.data[0].odds.data[yourIndex].value,
                                                "total": overArray[o].total,
                                                "result0": o,
                                                "result1": yourIndex.toString()
                                            }
                                            availOddsReplica.push(dataBody);
                                        }
                                    }
                                } else if (result.data.odds.data[m].name === "Exact Goals Number") {
                                    const dataBody = {
                                        "type": "Exact Goals Number",
                                        "extended": result.data.odds.data[m].bookmaker.data[0].odds.data,
                                        "type_length": 7
                                    }
                                    setGoalOddArray(result.data.odds.data[m].bookmaker.data[0].odds.data);
                                    availOddsReplica.push(dataBody);
                                } else {
                                    var n2 = result.data.odds.data[m].bookmaker.data[0].odds.data[2].value;
                                    const dataBody = {
                                        "type": result.data.odds.data[m].name,
                                        "type_length": 3,
                                        "first": n0,
                                        "second": n1,
                                        "third": n2,
                                        "result0": "0",
                                        "result1": "1",
                                        "result2": "2"
                                    }
                                    availOddsReplica.push(dataBody);
                                }
                            } else {
                                if (result.data.odds.data[m].name === "Over/Under" || result.data.odds.data[m].name === "Goals Over/Under 1st Half" || result.data.odds.data[m].name === "Over/Under 2nd Half") {
                                    var overArray = [];
                                    for (var t in result.data.odds.data[m].bookmaker.data[0].odds.data) {
                                        if (result.data.odds.data[m].bookmaker.data[0].odds.data[t].label === "Over") {
                                            overArray.push(result.data.odds.data[m].bookmaker.data[0].odds.data[t]);
                                        }
                                    }
                                    for (var o in overArray) {
                                        var yourIndex = result.data.odds.data[m].bookmaker.data[0].odds.data.findIndex(obj => obj.total === overArray[0].total && obj.label === "Under");
                                        if (yourIndex >= 0) {
                                            const dataBody = {
                                                "type": result.data.odds.data[m].name + "" + overArray[o].total,
                                                "type_length": 2,
                                                "first": overArray[o].value,
                                                "second": result.data.odds.data[m].bookmaker.data[0].odds.data[yourIndex].value,
                                                "total": overArray[o].total,
                                                "result0": o,
                                                "result1": yourIndex.toString()
                                            }
                                            availOddsReplica.push(dataBody);
                                        }
                                    }
                                } else {
                                    const dataBody = {
                                        "type": result.data.odds.data[m].name,
                                        "type_length": 2,
                                        "first": n0,
                                        "second": n1,
                                        "result0": "0",
                                        "result1": "1"
                                    }
                                    availOddsReplica.push(dataBody);
                                }
                            }
                        }
                    }
                }
            }
            const availPopular2 = [];
            const availKort2 = [];
            const availCorner2 = [];
            const availGoal2 = [];
            const availSpillere2 = [];
            const availSpecials2 = [];
            const availMinutter2 = [];
            for (var y in availOddsReplica) {
                if (availOddsReplica[y].type === "3Way Result" || availOddsReplica[y].type === "Exact Goals Number" || availOddsReplica[y].type === "Double Chance" || availOddsReplica[y].type === "Team To Score First" || availOddsReplica[y].type === "Over/Under2.5" || availOddsReplica[y].type === "Over/Under2.25" || availOddsReplica[y].type === "Over/Under2.75") {
                    availPopular2.push(availOddsReplica[y]);
                }
                if (availOddsReplica[y].type === "3Way Result 1st Half" || availOddsReplica[y].type === "Goals Over/Under 1st Half0.5" || availOddsReplica[y].type === "Goals Over/Under 1st Half1.5" || availOddsReplica[y].type === "Goals Over/Under 1st Half2.5" || availOddsReplica[y].type === "Goals Over/Under 1st Half3.5" || availOddsReplica[y].type === "Over/Under 2nd Half0.5" || availOddsReplica[y].type === "Over/Under 2nd Half1.5" || availOddsReplica[y].type === "Over/Under 2nd Half2.5" || availOddsReplica[y].type === "Over/Under 2nd Half3.5" || availOddsReplica[y].type === "Highest Scoring Half" || availOddsReplica[y].type === "3Way Result 2nd Half" || availOddsReplica[y].type === "Double Chance - 1st Half" || availOddsReplica[y].type === "Double Chance - 2nd Half") {
                    availMinutter2.push(availOddsReplica[y]);
                }
                if (availOddsReplica[y].type === "First Card Received" || availOddsReplica[y].type === "A Red Card in the Match" || availOddsReplica[y].type === "Both Teams To Receive 2+ Cards" || availOddsReplica[y].type === "Both Teams To Receive A Card") {
                    availKort2.push(availOddsReplica[y]);
                }
                if (availOddsReplica[y].type === "First Match Corner" || availOddsReplica[y].type === "Last Match Corner" || availOddsReplica[y].type === "Corner Match Bet") {
                    availCorner2.push(availOddsReplica[y]);
                }
                if (availOddsReplica[y].type === "Clean Sheet - Home" || availOddsReplica[y].type === "Clean Sheet - Away") {
                    availSpecials2.push(availOddsReplica[y]);
                }
                if (availOddsReplica[y].type === "Team To Score Last" || availOddsReplica[y].type === "Both Teams To Score" || availOddsReplica[y].type === "Highest Scoring Half" || availOddsReplica[y].type === "Own Goal" || availOddsReplica[y].type === "Odd/Even") {
                    availGoal2.push(availOddsReplica[y]);
                }
            }
            setAvailPopular(availPopular2);
            setAvailKort(availKort2);
            setAvailCorner(availCorner2);
            setAvailGoal(availGoal2);
            setAvailSpillere(availSpillere2);
            setAvailSpecials(availSpecials2);
            setAvailMinutter(availMinutter2);

            sethomeTeam(result.data.localTeam.data.name);
            setvisitorTeam(result.data.visitorTeam.data.name);
            sethomelogo(result.data.localTeam.data.logo_path);
            setvisitorlogo(result.data.visitorTeam.data.logo_path);

            setmatchdate(result.data.time.starting_at.timestamp);

            if (result.data.time.status === "LIVE" || result.data.time.status === "HT") {
                setlive("match-stilling-p1-live");
                setRestTime("-");
                setlivedisplay("match-time123");
            }
            if (result.data.time.status === "LIVE" || result.data.time.status === "FT" || result.data.time.status === "HT") {
                setlivestilling("match-stilling-p");
                setRestTime("-");
            }

            if (result.data.time.minute !== null && result.data.time.status === "LIVE") {
                if (result.data.time.minute <= 45) {
                    settime("1. HALVLEG - " + result.data.time.minute);
                } else if (result.data.time.minute >= 45){
                    settime("2. HALVLEG - " + result.data.time.minute);
                }
            } else if (result.data.time.status === "FT"){
                settime("SLUT");
            } else if (result.data.time.status === "HT") {
                settime("HALVLEG");
            } else {
                var startDate = new Date(timestamp);

                var returnMonth = "" + (startDate.getMonth() + 1);
                if ((returnMonth.toString()).length < 2) {
                    returnMonth = "0" + returnMonth;
                }

                var returnMinutes = "" + startDate.getMinutes();
                if ((returnMinutes.toString()).length < 2) {
                    returnMinutes = "0" + returnMinutes;
                }

                var returnHours = "" + startDate.getHours();
                if ((returnHours.toString()).length < 2) {
                    returnHours = "0" + returnHours;
                }

                var returnDay = "" + startDate.getDate();
                if ((returnDay.toString()).length < 2) {
                    returnDay = "0" + returnDay;
                }

                if (startDate.getDate() === new Date().getDate()) {
                    settime("I dag " + returnHours + ":" + returnMinutes);
                } else {
                    settime(returnDay + "/" + returnMonth + "/" + startDate.getFullYear() + " " + returnHours + ":" + returnMinutes);
                }
            }
        })
            .catch(error => console.log('error', error));
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

    function delBet(betId, matchId) {
        var returnOddsNew = 1;
        var udbetalingNew = 0;
        for (var y in odds) {
            if (odds[y].id === betId) {
                const betIdIndex = odds[y].odds_type+matchId+"-"+odds[y].odds_result;
                const el = document.getElementById(betIdIndex);
                if (document.getElementById(betIdIndex)) {
                    el.classList.remove("odd-off");
                }

                var index = notUsableBtn.indexOf(betIdIndex);
                notUsableBtn.splice(index, 1);

                var storageReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                var indexRep = storageReplica.indexOf(betIdIndex);
                storageReplica.splice(indexRep, 1)
                sessionStorage.setItem("notUsableBtn", JSON.stringify(storageReplica));

                notUsableBtn.splice(index, 1);

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

    function gameCall() {
        var activeGame = localStorage.getItem("activeGame");
        const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + activeGame;

        const requestConfigen = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }
        axios.get(URL, requestConfigen).then(response => {
            console.log("AWS - Active game:", response);
            setSelectedGame(response.data);
            setSlutdato(response.data.varighed);
            for (var x in response.data.players) {
                if (response.data.players[x].player === localStorage.getItem("email")) {
                    setCurrentMoney(response.data.players[x].info.money);
                }
            }
            for (var u in response.data.players) {
                if (response.data.players[u].player === localStorage.getItem("email")) {
                    if (response.data.players[u].player === localStorage.getItem("email")) {
                        localStorage.setItem("notifikationer", response.data.players[u].info.notifikationer.length);
                    }
                }
            }
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
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
                            console.log("AWS - Oprettelse:", betBody, response)
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
        }
    }

    function emptyBets() {
        if (matchAllowed === true) {
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
    
            for (var l in notUsableBtn) {
                const el = document.getElementById(notUsableBtn[l]);
                if (el !== undefined && el !== null) {
                    el.classList.remove("odd-off");
                }
            }
    
            setNotUsableBtn([]);
            sessionStorage.setItem("notUsableBtn", "");
            document.getElementById("indsatsInput").value = "";
        }
    }

    function chooseOdd(btnId, type, row, result) {
        if (!notUsableBtn.includes(btnId) && matchAllowed !== false && odds.length < 5) {
            document.getElementById(btnId).classList.add("odd-off");
            setNotUsableBtn([...notUsableBtn, btnId]);
            sessionStorage.setItem("notUsableBtn", JSON.stringify([...notUsableBtn, btnId]));
    
            var mstime = new Date().getTime();
            var randomNumber = Math.floor(Math.random() * 512);
            var randomId = mstime+"-"+randomNumber;
            const jsonNote = {
                "id": randomId,
                "match": parseInt(matchID),
                "hometeam": homeTeam,
                "visitorteam": visitorTeam,
                "probability": result,
                "odds_type": type,
                "odds_result": row,
                "odds_date": Number(matchdate)
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
        } else if (odds.length > 5) {
            setNotiMessage("error", "For mange væddemål", "Du har allerede 6 ud af 6 mulige væddemål pr. kupon.")
        } else if (notUsableBtn.includes(btnId)) {
            rem3wayBet(parseInt(matchID), type, row);
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
                const betIdIndex = type+matchId+"-"+oddsSession[y].odds_result;

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
        console.log("5", returnOddsNew)
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

    function checkExpired(timestamp) {
        var nowDate = new Date().getTime();
        var nowMiliDate = (nowDate.toString()).slice(0, -3);
        if (parseInt(nowMiliDate) > timestamp) {
            setMatchAllowed(false);
            var buttonshere3 = document.querySelectorAll(".match-odds-offer-element-3");
            var buttonshere2 = document.querySelectorAll(".match-odds-offer-element-2");
            if (notUsableBtn.length > 0) {
                var notUsableArray = notUsableBtn;
                for (var q = 0; q < buttonshere3.length; q++) {
                    if (buttonshere3[q] !== undefined) {
                        notUsableArray.push(buttonshere3[q].id);
                        buttonshere3[q].classList.add("odd-off");
                    }
                }
                for (var y = 0; y < buttonshere2.length; y++) {
                    if (buttonshere2[y] !== undefined) {
                        notUsableArray.push(buttonshere2[y].id);
                        buttonshere2[y].classList.add("odd-off");
                    }
                }
                setNotUsableBtn(notUsableArray);
                sessionStorage.setItem("notUsableBtn", JSON.stringify(notUsableArray));
            }
        }
    }

    const [nav, setNav] = useState("oversigt");

    useEffect(() => {
        if (nav === "oversigt") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element-active";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element";
            document.getElementById("navH2H").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.add("display-flex");
            document.getElementById("kampinfo").classList.remove("display-flex");
            document.getElementById("startopstilling").classList.remove("display-flex");
            document.getElementById("H2H").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "kampinfo") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element-active";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element";
            document.getElementById("navH2H").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("kampinfo").classList.add("display-flex");
            document.getElementById("startopstilling").classList.remove("display-flex");
            document.getElementById("H2H").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "startopstilling") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element-active";
            document.getElementById("navH2H").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("kampinfo").classList.remove("display-flex");
            document.getElementById("startopstilling").classList.add("display-flex");
            document.getElementById("H2H").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "H2H") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element";
            document.getElementById("navH2H").className = "match-odds-nav-element-active";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("kampinfo").classList.remove("display-flex");
            document.getElementById("startopstilling").classList.remove("display-flex");
            document.getElementById("H2H").classList.add("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");

            if (h2hUsed === false) {
                getHead();
            }
        } else if (nav === "statistikker") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element";
            document.getElementById("navH2H").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element-active";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("kampinfo").classList.remove("display-flex");
            document.getElementById("startopstilling").classList.remove("display-flex");
            document.getElementById("H2H").classList.remove("display-flex");
            document.getElementById("statistikker").classList.add("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");

            if (h2hUsed === false) {
                getHead();
            }
        } else if (nav === "tabel") {
            if (oversigtAllowed) {
                document.getElementById("navOversigt").className = "match-odds-nav-element";
            }
            document.getElementById("navKampinfo").className = "match-odds-nav-element";
            document.getElementById("navStartopstilling").className = "match-odds-nav-element";
            document.getElementById("navH2H").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element-active";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("kampinfo").classList.remove("display-flex");
            document.getElementById("startopstilling").classList.remove("display-flex");
            document.getElementById("H2H").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.add("display-flex");

            if (tabelOUsed === false) {
                getTabel();
            }
        }
    }, [nav])

    const [h2h, seth2h] = useState([]);

    function getHead() {
        seth2hUsed(true);
        fetch("https://soccer.sportmonks.com/api/v2.0/head2head/"+homeTeamId+"/"+visitorTeamId+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=localTeam,visitorTeam")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - H2H:", result);
            seth2h(result.data);
        })
        .catch(error => console.log('error', error));
    }

    const [tabelO, setTabelO] = useState([]);
    const [tabelOUsed, setTabelOUsed] = useState(false);

    function getTabel() {
        setTabelOUsed(true);
        fetch("https://soccer.sportmonks.com/api/v2.0/standings/season/"+seasonId+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=standings.league,standings.team,")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Season:", result);
            setTabelO(result.data);
            setTableType("1");
        })
        .catch(error => console.log('error', error));
    }

    function getGroups() {
        if (tabelType !== "") {
            if (document.getElementById("stage-loader1")) {
                document.getElementById("stage-loader1").classList.remove("display");
            }
            return tabelO.map((item) => {
                if (item.season_id === seasonId && item.stage_id === stageId) {
                    if (item.name === "League A" || item.name === "League B" || item.name === "League C" || item.name === "League D") {
                        var mstime = new Date().getTime();
                        var randomNumber = Math.floor(Math.random() * 512);
                        var randomId = mstime+"-"+randomNumber;
                        return (
                            <li key={item.name + "first"}>
                                <li key={item.name} className="tabel-item">{item.name}</li>
                                {item.standings.data.map((res) => {
                                    return (
                                        <li key={item.season_id + "-" + randomId + item.name + res.name}>
                                            <Link href={"/stage/league?id=" + item.season_id}>
                                                <div className="tabel-top">
                                                    <p className="tabel-top-h1">{res.name}</p>
                                                    <div className="tabel-top-right">
                                                        <div className="tabel-ends">
                                                            <p className="tabel-3 tabel-h1">KS</p>
                                                            <p className="tabel-4 tabel-h1">MF</p>
                                                            <p className="tabel-3 tabel-h1">P</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="tabel-container">
                                                <ul>
                                                    {res.standings.data.map((thirdRes) => {
                                                        var thoseClass = "";
                                                        if (thirdRes.team_id === homeTeamId || thirdRes.team_id === visitorTeamId) {
                                                            thoseClass = "tabel-correct";
                                                        }
                                                        var goalD = thirdRes.total.goal_difference;
                                                        if (parseInt(goalD) > 0) {
                                                            goalD = "+" + goalD;
                                                        }
                                                        var form1 = thirdRes.recent_form.slice(0,1);
                                                        var form2 = thirdRes.recent_form.slice(1,2);
                                                        var form3 = thirdRes.recent_form.slice(2,3);
                                                        var formStyle1 = "form-1";
                                                        var formStyle2 = "form-1";
                                                        var formStyle3 = "form-1";
                                                        if (form1 === "L") {
                                                            formStyle1 = "form-lost";
                                                        } else if (form1 === "W") {
                                                            formStyle1 = "form-win";
                                                        } else if (form1 === "D") {
                                                            formStyle1 = "form-draw";
                                                        }
                                                        if (form2 === "L") {
                                                            formStyle2 = "form-lost";
                                                        } else if (form2 === "W") {
                                                            formStyle2 = "form-win";
                                                        } else if (form2 === "D") {
                                                            formStyle2 = "form-draw";
                                                        }
                                                        if (form3 === "L") {
                                                            formStyle3 = "form-lost";
                                                        } else if (form3 === "W") {
                                                            formStyle3 = "form-win";
                                                        } else if (form3 === "D") {
                                                            formStyle3 = "form-draw";
                                                        }
                                                        return (
                                                            <li key={thirdRes.round_id + "-" + thirdRes.team_name + thirdRes.position}>
                                                                <Link href={"/stage/team?team=" + thirdRes.team_id}>
                                                                    <div className={"tabel-element " + thoseClass} style={{borderLeft: "4px solid var(--primary)", paddingLeft: "11px"}}>
                                                                        <div className="tabel-ends">
                                                                            <p className="tabel-1 tabel-p">{thirdRes.position}</p>
                                                                            <p className="tabel-2 tabel-h1">{thirdRes.team_name}</p>
                                                                        </div>
                                                                        <div className="tabel-top-right">
                                                                            <div className="tabel-ends">
                                                                                <p className="tabel-3 tabel-p">{thirdRes.overall.games_played}</p>
                                                                                <p className="tabel-4 tabel-p">{goalD}</p>
                                                                                <p className="tabel-3 tabel-h1">{thirdRes.points}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>  
                                        </li>
                                        );
                                    }
                                )}
                            </li>
                            );
                    } else {
                        var liga = "";
                        if (item.name === "Regular Season") {
                            liga = item.standings.data[0].league.data.name;
                        } else {
                            liga = item.standings.data[0].league.data.name + " - " + item.name;
                        }
                        return (
                            <li key={item.season_id}>
                                <Link href={"/stage/league?id=" + item.season_id}>
                                    <div className="tabel-top">
                                        <p className="tabel-top-h1">{liga}</p>
                                        <div className="tabel-top-right">
                                            <div className="tabel-ends">
                                                <p className="tabel-3 tabel-h1">KS</p>
                                                <p className="tabel-3 tabel-h1">D</p>
                                                <p className="tabel-3 tabel-h1">P</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="tabel-container">
                                    <ul>
                                        {item.standings.data.map((fres) => {
                                            var thoseClass = "";
                                            if (fres.team.data.id === homeTeamId || fres.team.data.id === visitorTeamId) {
                                                thoseClass = "tabel-correct";
                                            }
                                            var goalD = fres.total.goal_difference;
                                            if (parseInt(goalD) > 0) {
                                                goalD = "+" + goalD;
                                            }
                                            var form1 = fres.recent_form.slice(0,1);
                                            var form2 = fres.recent_form.slice(1,2);
                                            var form3 = fres.recent_form.slice(2,3);
                                            var formStyle1 = "form-1";
                                            var formStyle2 = "form-1";
                                            var formStyle3 = "form-1";
                                            if (form1 === "L") {
                                                formStyle1 = "form-lost";
                                            } else if (form1 === "W") {
                                                formStyle1 = "form-win";
                                            } else if (form1 === "D") {
                                                formStyle1 = "form-draw";
                                            }
                                            if (form2 === "L") {
                                                formStyle2 = "form-lost";
                                            } else if (form2 === "W") {
                                                formStyle2 = "form-win";
                                            } else if (form2 === "D") {
                                                formStyle2 = "form-draw";
                                            }
                                            if (form3 === "L") {
                                                formStyle3 = "form-lost";
                                            } else if (form3 === "W") {
                                                formStyle3 = "form-win";
                                            } else if (form3 === "D") {
                                                formStyle3 = "form-draw";
                                            }
                                            return (
                                                <li key={fres.round_id + "-" + fres.team_name}>
                                                    <Link href={"/stage/team?team=" + fres.team.data.id}>
                                                        <div className={"tabel-element " + thoseClass} style={{borderLeft: "4px solid var(--primary)", paddingLeft: "11px"}}>
                                                            <div className="tabel-ends">
                                                                <p className="tabel-1 tabel-p">{fres.position}</p>
                                                                <Image height="18px" width="18px" src={fres.team.data.logo_path} alt="" className="tabel-img" />
                                                                <p className="tabel-2 tabel-h1" style={{paddingLeft: "10px"}}>{fres.team_name}</p>
                                                            </div>
                                                            <div className="tabel-top-right">
                                                                <div className="tabel-ends">
                                                                    <p className="tabel-3 tabel-p">{fres.overall.games_played}</p>
                                                                    <p className="tabel-3 tabel-p">{goalD}</p>
                                                                    <p className="tabel-3 tabel-h1">{fres.points}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </li>
                            );
                    }
                } else {
                    return;
                }
            })
        }
    }

    function getStats() {
        var statistics = ["possessiontime","shotstotal","shotsongoal","attacksattacks","attacksdangerous_attacks","saves", "corners","free_kick","offsides","yellowcards","redcards","throw_in"];
        var localStatArray = statsL;
        var visitorStatArray = statsV;
        return (
            <div className="stats-container">
                {statistics.map(item => {
                    var itemName = "Ukendt";
                    if (item === "possessiontime") {
                        itemName = "Boldbesiddelse";
                    } else if (item === "shotstotal") {
                        itemName = "Skud";
                    } else if (item === "shotsongoal") {
                        itemName = "Skud på mål";
                    } else if (item === "attacksattacks") {
                        itemName = "Angreb";
                    } else if (item === "attacksdangerous_attacks") {
                        itemName = "Farlige angreb";
                    } else if (item === "saves") {
                        itemName = "Redninger";
                    } else if (item === "corners") {
                        itemName = "Hjørnespark";
                    } else if (item === "free_kick") {
                        itemName = "Frispark";
                    } else if (item === "offsides") {
                        itemName = "Offsides";
                    } else if (item === "yellowcards") {
                        itemName = "Gule kort";
                    } else if (item === "redcards") {
                        itemName = "Røde kort";
                    } else if (item === "throw_in") {
                        itemName = "Indkast";
                    }
                    if (item.slice(0,5) === "shots") {
                        if (localStatArray["shots"] && visitorStatArray["shots"]) {
                            return (
                                <li key={item} className="stats-element">
                                    <div className="stats-top">
                                        <p className="stats-p">{localStatArray["shots"][item.substring(5)]}</p>
                                        <p className="stats-h1">{itemName}</p>
                                        <p className="stats-p">{visitorStatArray["shots"][item.substring(5)]}</p>
                                    </div>
                                    <div className="stats-stat">
                                        <div className="stats-left" style={{width: ((localStatArray["shots"][item.substring(5)] / (localStatArray["shots"][item.substring(5)] + visitorStatArray["shots"][item.substring(5)])) * 100) + "%"}}>
                                        </div>
                                        <div className="stats-right" style={{width: ((visitorStatArray["shots"][item.substring(5)] / (localStatArray["shots"][item.substring(5)] + visitorStatArray["shots"][item.substring(5)])) * 100) + "%"}}>
                                        </div>
                                    </div>
                                </li>
                            );
                        } else return;
                    } else if (item.slice(0,7) === "attacks") {
                        if (localStatArray["attacks"] && visitorStatArray["attacks"]) {
                            return (
                                <li key={item} className="stats-element">
                                    <div className="stats-top">
                                        <p className="stats-p">{localStatArray["attacks"][item.substring(7)]}</p>
                                        <p className="stats-h1">{itemName}</p>
                                        <p className="stats-p">{visitorStatArray["attacks"][item.substring(7)]}</p>
                                    </div>
                                    <div className="stats-stat">
                                        <div className="stats-left" style={{width: ((localStatArray["attacks"][item.substring(7)] / (localStatArray["attacks"][item.substring(7)] + visitorStatArray["attacks"][item.substring(7)])) * 100) + "%"}}>
                                        </div>
                                        <div className="stats-right" style={{width: ((visitorStatArray["attacks"][item.substring(7)] / (localStatArray["attacks"][item.substring(7)] + visitorStatArray["attacks"][item.substring(7)])) * 100) + "%"}}>
                                        </div>
                                    </div>
                                </li>
                            );
                        } else return;
                    } else {
                        if (localStatArray[item]) {
                            return (
                                <li key={item} className="stats-element">
                                    <div className="stats-top">
                                        <p className="stats-p">{localStatArray[item]}</p>
                                        <p className="stats-h1">{itemName}</p>
                                        <p className="stats-p">{visitorStatArray[item]}</p>
                                    </div>
                                    <div className="stats-stat">
                                        <div className="stats-left" style={{width: ((localStatArray[item] / (localStatArray[item] + visitorStatArray[item])) * 100) + "%"}}>
                                        </div>
                                        <div className="stats-right" style={{width: ((visitorStatArray[item] / (localStatArray[item] + visitorStatArray[item])) * 100) + "%"}}>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    }
                })}
            </div>
        );
    }

    function setOddNav(oddNav) {
        if (oddNav === "popular") {
            document.getElementById("popular").classList.add("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element-active";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "kort") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.add("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element-active";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "corner") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.add("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element-active";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "goal") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.add("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element-active";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "spillere") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.add("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element-active";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "specials") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.add("show-nav");
            document.getElementById("minutter").classList.remove("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element-active";
            document.getElementById("minutterN").className = "oddsspil-element";
        } else if (oddNav === "minutter") {
            document.getElementById("popular").classList.remove("show-nav");
            document.getElementById("kort").classList.remove("show-nav");
            document.getElementById("corner").classList.remove("show-nav");
            document.getElementById("goal").classList.remove("show-nav");
            document.getElementById("spillere").classList.remove("show-nav");
            document.getElementById("specials").classList.remove("show-nav");
            document.getElementById("minutter").classList.add("show-nav");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
            document.getElementById("specialsN").className = "oddsspil-element";
            document.getElementById("minutterN").className = "oddsspil-element-active";
        }
    }

    function favoritHover(n) {
        if (n === 1) {
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
        } else {
            document.getElementById("favorit-o2").classList.remove("display");
            document.getElementById("favorit2").classList.add("display");
        }
    }

    function favoritUnHover(n) {
        if (n === 1) {
            if (favorit === false) {
                document.getElementById("favorit-o").classList.add("display");
                document.getElementById("favorit").classList.remove("display");
            }
        } else {
            if (favorit2 === false) {
                document.getElementById("favorit-o2").classList.add("display");
                document.getElementById("favorit2").classList.remove("display");
            }
        }
    }

    function setFavoritter(n) {
        if (n === 1) {
            if (favorit === false && document.getElementById("favorit")) {
                document.getElementById("favorit").classList.add("favorit-active");
                document.getElementById("favorit-o").classList.remove("display");
                document.getElementById("favorit").classList.add("display");
                if (localStorage.getItem("favoritter")) {
                    var storage = JSON.parse(localStorage.getItem("favoritter"));
                    const elementPush = {
                        "id": homeTeamId,
                        "image": homelogo,
                        "name": homeTeam,
                        "liga": league
                    };
                    storage.push(elementPush);
                    localStorage.setItem("favoritter", JSON.stringify(storage));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storage,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    var storageDiv = [];
                    const elementPush = {
                        "id": homeTeamId,
                        "image": homelogo,
                        "name": homeTeam,
                        "liga": league
                    };
                    storageDiv.push(elementPush);
                    localStorage.setItem("favoritter", JSON.stringify(storageDiv));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storageDiv,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                setFavorit(true);
            } else if (document.getElementById("favorit")) {
                if (localStorage.getItem("favoritter")) {
                    var storage = JSON.parse(localStorage.getItem("favoritter"));
                    for (var u in storage) {
                        if (storage[u].id === homeTeamId) {
                            storage.splice(u);
                        }
                    }
                    localStorage.setItem("favoritter", JSON.stringify(storage));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storage,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                document.getElementById("favorit").classList.remove("favorit-active");
                document.getElementById("favorit-o").classList.add("display");
                document.getElementById("favorit").classList.remove("display");
                setFavorit(false);
            }
        } else {
            if (favorit2 === false && document.getElementById("favorit2")) {
                document.getElementById("favorit2").classList.add("favorit-active");
                document.getElementById("favorit-o2").classList.remove("display");
                document.getElementById("favorit2").classList.add("display");
                if (localStorage.getItem("favoritter")) {
                    var storage = JSON.parse(localStorage.getItem("favoritter"));
                    const elementPush = {
                        "id": visitorTeamId,
                        "image": visitorlogo,
                        "name": visitorTeam,
                        "liga": league
                    };
                    storage.push(elementPush);
                    localStorage.setItem("favoritter", JSON.stringify(storage));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storage,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    var storageDiv = [];
                    const elementPush = {
                        "id": visitorTeamId,
                        "image": visitorlogo,
                        "name": visitorTeam,
                        "liga": league
                    };
                    storageDiv.push(elementPush);
                    localStorage.setItem("favoritter", JSON.stringify(storageDiv));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storageDiv,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                setFavorit2(true);
            } else if (document.getElementById("favorit2")) {
                if (localStorage.getItem("favoritter")) {
                    var storage = JSON.parse(localStorage.getItem("favoritter"));
                    for (var u in storage) {
                        if (storage[u].id === visitorTeamId) {
                            storage.splice(u);
                        }
                    }
                    localStorage.setItem("favoritter", JSON.stringify(storage));

                    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                    const requestConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }

                    const requestBody = {
                        "data": storage,
                        "email": localStorage.getItem("email")
                    }
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Favoritter:", response);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                document.getElementById("favorit2").classList.remove("favorit-active");
                document.getElementById("favorit-o2").classList.add("display");
                document.getElementById("favorit2").classList.remove("display");
                setFavorit2(false);
            }
        }
    }

    function getLineup() {
        if (positions.length > 0 && positions[0][0].number !== undefined && homeTeamId !== 0) {
            return positions.map(item => {
                var indexes = [1,2,3,4,5,6,7,8,9,10,11];
                var positions = ["G","D","M","A"];
                return (
                    <>
                        <ul className="sq-wrapper">
                            {positions.map(res => {
                                return (
                                    <li key={res + homeTeamId} className="sq-section">
                                        {indexes.map(res2 => {
                                            if (item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === homeTeamId}))].position === res) {
                                                return (
                                                    <li key={res2 + homeTeamId} className="sq-player">
                                                        <Image height="18px" width="18px" src={item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === homeTeamId}))].player.data.image_path} alt="" className="sq-img" />
                                                        <p className="sq-p"><span className="st-p-fat">{item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === homeTeamId}))].number}. </span>{item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === homeTeamId}))].player.data.common_name}</p>
                                                    </li>
                                                );
                                            }
                                        })}
                                    </li>
                                );
                            })}
                        </ul>
                        <ul className="sq-wrapper" style={{top: "inherit", bottom: "0px"}}>
                            {positions.reverse().map(res => {
                                return (
                                    <li key={res + homeTeamId} className="sq-section">
                                        {indexes.map(res2 => {
                                            var test2 = item.findIndex(object => {return object.formation_position === res2 && object.team_id === visitorTeamId});
                                            if (test2 >= 0) {
                                                if (item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === visitorTeamId}))].position === res) {
                                                    return (
                                                        <li key={res2 + homeTeamId} className="sq-player">
                                                            <Image height="18px" width="18px" src={item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === visitorTeamId}))].player.data.image_path} alt="" className="sq-img" />
                                                            <p className="sq-p"><span className="st-p-fat">{item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === visitorTeamId}))].number}. </span>{item[(item.findIndex(object => {return object.formation_position === res2 && object.team_id === visitorTeamId}))].player.data.common_name}</p>
                                                        </li>
                                                    );
                                                }
                                            }
                                        })}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                );
            });
        } else return;
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
                    } else if (indsats > parseInt(selectedGame["max_amount"])) {
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

    function getLabel(item, n) {
        var label0 = "Label - 0";
        var label1 = "Label - 1";
        var label2 = "Label - 2";
        var overskrift = "Overskrift";
        if (item.type === "3Way Result") {
            label0 = "Vinder " + homeTeam;
            label1 = "Uafgjort";
            label2 = "Vinder " + visitorTeam;
            overskrift = "Fuldtid - Resultat";
        } else if (item.type === "Double Chance") {
            label0 = homeTeam + " eller uafgjort";
            label1 = "Uafgjort eller " + visitorTeam;
            label2 = homeTeam + " eller " + visitorTeam;
            overskrift = "Dobbeltchance";
        } else if (item.type === "Team To Score First") {
            label0 = homeTeam;
            label1 = "Ingen mål";
            label2 = visitorTeam;
            overskrift = "Første hold til at score";
        } else if (item.type === "Highest Scoring Half") {
            label0 = "1. halvleg";
            label1 = "2. halvleg";
            label2 = "Uafgjort";
            overskrift = "Flest mål i halvleg";
        } else if (item.type === "Both Teams To Score") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Begge hold scorer";
        } else if (item.type === "Clean Sheet - Home") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Clean Sheet - " + homeTeam;
        } else if (item.type === "Clean Sheet - Away") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Clean Sheet - " + visitorTeam;
        } else if (item.type === "Corner Match Bet") {
            label0 = homeTeam;
            label1 = "Ingen hjørnespark";
            label2 = visitorTeam;
            overskrift = "Flest hjørnespark";
        } else if (item.type === "Highest Scoring Half") {
            label0 = "1. halvleg";
            label1 = "2. halvleg";
            label2 = "Ingen mål";
            overskrift = "Flest mål i halvleg";
        } else if (item.type === "Both Teams To Score") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Begge hold scorer";
        } else if (item.total !== undefined) {
            if ((item.type.slice(17)).slice(0,-3) === "1st Half") {
                overskrift = "Over/Under " + item.total + " mål - 1. Halvleg";
            } else if ((item.type.slice(11)).slice(0,-3) === "2nd Half") {
                overskrift = "Over/Under " + item.total + " mål - 2. Halvleg";
            } else {
                overskrift = "Over/Under " + item.total + " mål";
            }
            label0 = "Over";
            label1 = "Under"
        } else if (item.type === "Exact Goals Number") {
            overskrift = "Antal mål i kampen";
        } else if (item.type === "Time Of First Card") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Kort givet inden 33:00";
        } else if (item.type === "First Card Received") {
            label0 = homeTeam;
            label1 = "Ingen kort";
            label2 = visitorTeam;
            overskrift = "Første kort";
        } else if (item.type === "A Red Card in the Match") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Rødt kort i kampen";
        } else if (item.type === "Both Teams To Receive 2+ Cards") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Begge hold modtager 2+ kort";
        } else if (item.type === "Both Teams To Receive A Card") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Begge hold modtager et kort";
        } else if (item.type === "Time Of First Corner") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Hjørnespark inden 7:00";
        } else if (item.type === "2-Way Corners") {
            label0 = "Over";
            label1 = "Under";
            overskrift = "9.5 hjørnespark";
        } else if (item.type === "First Match Corner") {
            label0 = homeTeam;
            label1 = visitorTeam;
            overskrift = "Første hjørnespark";
        } else if (item.type === "Last Match Corner") {
            label0 = homeTeam;
            label1 = visitorTeam;
            overskrift = "Sidste hjørnespark";
        } else if (item.type === "Team To Score Last") {
            label0 = homeTeam;
            label1 = "Ingen mål";
            label2 = visitorTeam;
            overskrift = "Sidste målscorer";
        } else if (item.type === "Odd/Even") {
            label0 = "Lige";
            label1 = "Ulige";
            overskrift = "Lige eller ulige sum af mål";
        } else if (item.type === "Own Goal") {
            label0 = "Ja";
            label1 = "Nej";
            overskrift = "Selvmål";
        } else if (item.type === "3Way Result 2nd Half") {
            label0 = homeTeam;
            label1 = "Uafgjort";
            label2 = visitorTeam;
            overskrift = "Kampresultat - 2. Halvleg";
        } else if (item.type === "3Way Result 1st Half") {
            label0 = homeTeam;
            label1 = "Uafgjort";
            label2 = visitorTeam;
            overskrift = "Kampresultat - 1. Halvleg";
        } else if (item.type === "Double Chance - 1st Half") {
            label0 = homeTeam + " eller uafgjort";
            label1 = "Uafgjort eller " + visitorTeam;
            label2 = homeTeam + " eller " + visitorTeam;
            overskrift = "Dobbeltchance - 1. Halvleg";
        } else if (item.type === "Double Chance - 2nd Half") {
            label0 = homeTeam + " eller uafgjort";
            label1 = "Uafgjort eller " + visitorTeam;
            label2 = homeTeam + " eller " + visitorTeam;
            overskrift = "Dobbeltchance - 2. Halvleg";
        }

        if (n === 0) {
            return label0;
        } else if (n === 1) {
            return label1;
        } else if (n === 2) {
            return label2;
        } else if (n === 3) {
            return overskrift;
        } else {
            return;
        }
    }

    const router = useRouter();

    function getMatchInfo() {
        var result = matchResult ? matchResult: {};
        if (result !== undefined && result !== null && Object.keys(result).length !== 0) {
            return (
                <div className="match-info" style={{padding: "0px"}}>
                    <Link href={"/stage/league?id=" + result["league"].data.current_season_id}>
                        <div className="match-league">
                            <Image height="18px" width="18px" src={result["league"].data.country.data.image_path && result["league"].data.country.data.image_path} alt="" className="match-league-i" />
                            <p className="match-league-p"><span className="match-league-light">{result["league"].data.country.data.name && result["league"].data.country.data.name} - </span>{result["league"].data.name && result["league"].data.name}{result["round"] !== undefined && <> | Runde {result["round"].data.name}</>}</p>
                        </div>
                    </Link>
                    <div className="match-title" style={{padding: "30px"}}>
                        <div className="match-team-cont">
                            <div className="favorit-container-match" onClick={() => setFavoritter(1)} onMouseOver={() => favoritHover(1)} onMouseLeave={() => favoritUnHover(1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="favorit display" id="favorit-o" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="favorit" id="favorit" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            </div>
                            <Link href={"/stage/team?team=" + result["localTeam"].data.id}>
                                <div className="match-team">
                                    <div className="match-title-text">
                                        <h1 className="match-h1">{result["localTeam"].data.name && result["localTeam"].data.name}</h1>
                                        <p className="match-p">{result["standings"].localteam_position && <>{result["standings"].localteam_position}. PLADS</>}</p>
                                    </div>
                                    <div className="match-img-con">
                                        <Image layout="fill" objectFit="cover" src={result["localTeam"].data.logo_path && result["localTeam"].data.logo_path} alt="" className="match-img" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="match-stilling">
                            <div className="match-2nd-info">
                                <div className="live-match-con">
                                    {result["time"].status === "FT" && <p className={live}>FT</p>}
                                    {result["time"].status === "AET" && <p className={live}>EFS</p>}
                                    {result["time"].status === "HT" && <p className={live}>Pause</p>}
                                    {result["time"].status === "FT_PEN" && <p className={live}>FT Str.</p>}
                                    {result["time"].status === "NS" && <p className="match-stilling-p1">{restTime}</p>}
                                    {result["time"].status === "LIVE" && <p className={live}>{time}</p>}
                                    {result["time"].status === "LIVE" && <p className="stage-blink">&apos;</p>}
                                </div>
                                {result["time"].status === "AET" && <p className="match-stilling-p" style={{letterSpacing: "30px", marginRight: "-30px"}}>{result["scores"].ft_score && <>{result["scores"].ft_score}</>}</p>}
                                {result["time"].status === "FT" && <p className="match-stilling-p" style={{letterSpacing: "30px", marginRight: "-30px"}}>{result["scores"].ft_score && <>{result["scores"].ft_score}</>}</p>}
                                {result["time"].status === "LIVE" && <p className="match-stilling-p" style={{letterSpacing: "30px", marginRight: "-30px"}}>{result["scores"].localteam_score}-{result["scores"].visitorteam_score}</p>}
                                {result["time"].status === "HT" && <p className="match-stilling-p" style={{letterSpacing: "30px", marginRight: "-30px"}}>{result["scores"].localteam_score}-{result["scores"].visitorteam_score}</p>}
                                {result["time"].status === "FT_PEN" && <p className="match-stilling-p" style={{letterSpacing: "30px", marginRight: "-30px"}}>{result["scores"].ft_score && <>{result["scores"].ft_score}</>}</p>}
                                {result["time"].status === "POSTP" && <p className="match-stilling-p">Udskudt</p>}
                                {result["time"].status === "NS" && <p className="match-stilling-p">{(result["time"].starting_at.time.slice(0,-3)).replace(":",".")}</p>}
                                {result["time"].status === "AET" && <p className="match-stilling-box">Efter forlænget spilletid: ({result["scores"].et_score})</p>}
                                {result["time"].status === "FT_PEN" && <p className="match-stilling-box">Efter straffespark: ({result["scores"].ps_score})</p>}
                                {result["aggregate"] && <p className="match-stilling-box">Resultat af første kamp ({result["aggregate"].data.result})</p>}
                                {!result["aggregate"] && <>{result["weather_report"] && <p className="match-stilling-box">Temperatur - {result["weather_report"].temperature_celcius.temp}°</p>}</>}
                                {!result["aggregate"] && <>{!result["weather_report"] && <>{result["round"].data.name && <p className="match-stilling-box">Runde {result["round"].data.name}</p>}</>}</>}
                                <div className="match-live-oversigt">
                                    <div className="oversigt-section">
                                        <ul>
                                        {events.map(item => {
                                            var mstime = new Date().getTime();
                                            var randomNumber = Math.floor(Math.random() * 512);
                                            var randomId = mstime+"-"+randomNumber;
                                                if (parseInt(item.team_id) === homeTeamId) {
                                                    if (item.type === "goal") {
                                                        return (
                                                            <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                                <div className="oversigt-element">
                                                                    <div className="oversigt-el-box-l">
                                                                        <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                        <Link href={"/stage/spiller?id=" + item.related_player_id} className="oversigt-h3"><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                    </div>
                                                                    <div className="oversigt-el-icon">
                                                                        <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                    </div>
                                                                    <div className="oversigt-el-box-r">
                                                                        <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    } else return;
                                                } else {
                                                    if (item.type === "goal") {
                                                        return (
                                                            <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                                <div className="oversigt-element">
                                                                    <div className="oversigt-el-box-l">
                                                                        <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                    </div>
                                                                    <div className="oversigt-el-icon">
                                                                        <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                    </div>
                                                                    <div className="oversigt-el-box-r">
                                                                        <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                        <Link href={"/stage/spiller?id=" + item.related_player_id} className="oversigt-h3"><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        );
                                                    } else return;
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="match-team-cont">
                            <Link href={"/stage/team?team=" + result["visitorTeam"].data.id}>
                                <div className="match-team">
                                    <div className="match-title-text">
                                        <h1 className="match-h1">{result["visitorTeam"].data.name && result["visitorTeam"].data.name}</h1>
                                        <p className="match-p">{result["standings"].visitorteam_position && <>{result["standings"].visitorteam_position}. PLADS</>}</p>
                                    </div>
                                    <div className="match-img-con">
                                        <Image layout="fill" objectFit="cover" src={result["visitorTeam"].data.logo_path && result["visitorTeam"].data.logo_path} alt="" className="match-img" />
                                    </div>
                                </div>
                            </Link>
                            <div className="favorit-container-match" onClick={() => setFavoritter(2)} onMouseOver={() => favoritHover(2)} onMouseLeave={() => favoritUnHover(2)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="favorit display" id="favorit-o2" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="favorit" id="favorit2" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="match-yder">
                        <div className="match-yder-desktop">
                            {result["time"].starting_at.date_time && <div className="match-yder-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-yder-icon" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <p className="match-yder-p">{result["time"].starting_at.date_time}</p>
                            </div>}
                            {result["venue"].data.name && <div className="match-yder-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-yder-icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                                    <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                                </svg>
                                <p className="match-yder-p">{result["venue"].data.name}</p>
                            </div>}
                            {result["referee"].data.fullname && <div className="match-yder-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-yder-icon" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                <p className="match-yder-p">{result["referee"].data.fullname}</p>
                            </div>}
                        </div>
                    </div>
                </div>
            )
        }
    }

    const [kuponState, setKuponState] = useState("closed");

    function switchKupon() {
        if (kuponState === "closed") {
            document.getElementById("match-kupon").classList.remove("kupon-min");
            document.getElementById("kuponRev").classList.remove("deg180");
            setKuponState("open");
            document.getElementById("kupon-title").innerHTML = kuponType;
        } else if (kuponState === "open") {
            document.getElementById("match-kupon").classList.add("kupon-min");
            document.getElementById("kuponRev").classList.add("deg180");
            setKuponState("closed");
            document.getElementById("kupon-title").innerHTML = "Tryk for at åbne kupon";
        }
    }

    return (
        <>
        <Head>
            <title>Kamp - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
        <div className="match-figure">
            <div className="info-figure1"></div>
            <div className="info-figure2"></div>
        </div>
        <div className="modal-test display-not" id="bet-modal">
            <div className="modal-con">
                <p className="con-modal-p">Er du sikker på, at du vil placere din kupon, med en indsats på {indsats},00 kr? Dette beløb er ikke refunderbart.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" onClick={() => {var placeBetBTN = document.getElementById("placeBetBTN");
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
                    <button className="con-modal-btn" onClick={() => {var placeBetBTN = document.getElementById("placeBetBTN");
                        placeBetBTN.innerHTML = "<div className='loader'></div>";
                        placeBet("singler");}}>Placér kupon</button>
                    <button className="con-modal-afbryd" onClick={() => {document.getElementById("singler-modal").classList.add("display-not")}}>Afbryd</button>
                </div>
            </div>
        </div>
        <div className="modal-test display-not" id="placed-modal" style={{textAlign: "center"}}>
            <div className="modal-con">
                <div className="con-modal-img-con">
                    <Image height="100px" width="100px" src={Congrats} alt="" className="con-modal-img" />
                </div>
                <p className="con-modal-h1">Din kupon er placeret!</p>
                <p className="con-modal-p">Tag et kig under dit aktive gruppespil, for at se din kupon.</p>
                <div className="modal-wrapper">
                    <button className="con-modal-btn" onClick={() => {document.getElementById("placed-modal").classList.add("display-not")}}>Modtaget</button>
                </div>
            </div>
        </div>
        <div className="match-kupon" id="match-kupon">
            <div className="kupon-top-match">
                    <svg xmlns="http://www.w3.org/2000/svg" id="kuponRev" onClick={() => {switchKupon()}} className="kupon-minimize deg180" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <p className="kupon-header-p" id="kupon-title" onClick={() => {switchKupon()}}>{kuponType}</p>
                    <p className="kupon-blue-match-p" onClick={() => emptyBets()}>Ryd alle</p>
            </div>
            <div className="kupon-type" id="kuponType">
                <div className="kupon-type-element kupon-type-element-active" id="kombination" onClick={() => {setKuponType("Kombination")}}>Kombination</div>
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
                                        <input type="number" className="single-kupon-input" autoComplete="off" id={"singleindsats"+bet.match+"-"+bet.odds_result} placeholder="Indsats" onChange={event => {setSingleIndsatser(parseInt(event.target.value), bet.id); updateUdbetaling("singler", bet.probability, parseInt(event.target.value))}}/>
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
                        <input type="number" className="kupon-input" autoComplete="off" id="indsatsInput" placeholder="Indsats" onChange={event => {setIndsats(parseInt(event.target.value)); updateUdbetaling("kombination", "", 0)}}/>
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
        <div className="stage-main-article-container">
            {!matchResult && <div className="main-loader"><div className="main-site-loader"></div></div>}
            <div className={messageType} id="errorCon">
                <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <div className="error-text">
                    <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                    <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                </div>
            </div>
            <button className="back-btn" onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="match-back" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </button>
            {getMatchInfo()}
            <div className="match-info-con">
                <div className="match-info-half nopadding">
                    <div className="match-odds-con">
                        <div className="match-odds-nav-fix">
                            <div className="match-odds-nav" style={{paddingTop: "10px"}}>
                                <button className="oddsspil-element-active" onClick={() => {setOddNav("popular")}} id="popularN">Populære</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("minutter")}} id="minutterN">Halvleg</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("kort")}} id="kortN">Kort</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("corner")}} id="cornerN">Hjørnespark</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("goal")}} id="goalN">Mål</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("spillere")}} id="spillereN">Spillere</button>
                                <button className="oddsspil-element" onClick={() => {setOddNav("specials")}} id="specialsN">Specials</button>
                            </div>
                        </div>
                        <div className="match-odds-show">
                        <div className="match-odds-container">
                            <div className="match-odds-section">
                                <p className="match-odds-error" id="matchOddsUpdated">Odds ikke opdateret</p>
                                <ul className="match-odds-cont show-nav" id="popular">
                                    {availPopular.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var oddofforon10 = "match-odds-offer-element-1";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else if (item.type_length === 2) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else if (item.type_length === 7) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + goals);
                                                if (repliceIndex >= 0) {
                                                    oddofforon10 = "match-odds-offer-element-1 odd-off";
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}: {goals}</p>
                                                        </div>
                                                        <input type="range" className="match-odds-slider" min="0" max="7" defaultValue={goals} onChange={event => setGoals(event.target.value)}  step="1"/>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon10} id={item.type + matchID + "-" + goals} onClick={() => chooseOdd(item.type + matchID + "-" + goals, item.type, goals, goalsOdds)}>
                                                                <p className="match-odds-offer-h1">Tilføj til væddemål</p>
                                                                <p className="match-odds-offer-h2">{goalsOdds}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="kort">
                                    {availKort.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o in btnReplica) {
                                                    if (btnReplica[o] === item.type + matchID + "-" + item.result0) {
                                                        oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                    } else if (btnReplica[o] === item.type + matchID + "-" + item.result1) {
                                                        oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="corner">
                                    {availCorner.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="goal">
                                    {availGoal.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="spillere">
                                    {availSpillere.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="specials">
                                    {availSpecials.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                                <ul className="match-odds-cont" id="minutter">
                                    {availMinutter.map((item) => {
                                        var label0 = getLabel(item, 0);
                                        var label1 = getLabel(item, 1);
                                        var label2 = getLabel(item, 2);
                                        var overskrift = getLabel(item, 3);

                                        var oddofforon0 = "match-odds-offer-element-3";
                                        var oddofforon1 = "match-odds-offer-element-3";
                                        var oddofforon2 = "match-odds-offer-element-3";

                                        var oddofforon20 = "match-odds-offer-element-2";
                                        var oddofforon21 = "match-odds-offer-element-2";

                                        var nowDate = new Date().getTime();
                                        var thistime = (nowDate.toString()).slice(0, -3);
                                        if (items["time"].starting_at.timestamp < thistime) {
                                            if (item.type_length === 3) {
                                                oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                return (
                                                    <li key={item.type + matchID}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                                <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                    <p className="match-odds-offer-h1">{label2}</p>
                                                                    <p className="match-odds-offer-h2">{item.third}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            } else if (item.type_length === 2) {
                                                oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                return (
                                                    <li key={item.type}>
                                                        <div className="match-bet">
                                                            <div className="match-bet-top">
                                                                <p className="match-odds-h1">{overskrift}</p>
                                                            </div>
                                                            <div className="match-odds-offer">
                                                                <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                    <p className="match-odds-offer-h1">{label0}</p>
                                                                    <p className="match-odds-offer-h2">{item.first}</p>
                                                                </div>
                                                                <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                    <p className="match-odds-offer-h1">{label1}</p>
                                                                    <p className="match-odds-offer-h2">{item.second}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </li>
                                                );
                                            }
                                        } else {

                                        if (item.type_length === 3) {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var i = 0; i < 3; i++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + i);
                                                    if (repliceIndex >= 0) {
                                                        if (i === 0) {
                                                            oddofforon0 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 1) {
                                                            oddofforon1 = "match-odds-offer-element-3 odd-off";
                                                        } else if (i === 2) {
                                                            oddofforon2 = "match-odds-offer-element-3 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return (
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon0} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon1} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                            <div className={oddofforon2} id={item.type + matchID + "-" + item.result2} onClick={() => chooseOdd(item.type + matchID + "-" + item.result2, item.type, item.result2, item.third)}>
                                                                <p className="match-odds-offer-h1">{label2}</p>
                                                                <p className="match-odds-offer-h2">{item.third}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        } else {
                                            if (sessionStorage.getItem("notUsableBtn")) {
                                                const btnReplica = JSON.parse(sessionStorage.getItem("notUsableBtn"));
                                                for (var o = 0; o < 2; o++) {
                                                    const repliceIndex = btnReplica.indexOf(item.type + matchID + "-" + o);
                                                    if (repliceIndex >= 0) {
                                                        if (o === 0) {
                                                            oddofforon20 = "match-odds-offer-element-2 odd-off";
                                                        } else if (o === 1) {
                                                            oddofforon21 = "match-odds-offer-element-2 odd-off";
                                                        }
                                                    }
                                                }
                                            }
                                            return(
                                                <li key={item.type}>
                                                    <div className="match-bet">
                                                        <div className="match-bet-top">
                                                            <p className="match-odds-h1">{overskrift}</p>
                                                        </div>
                                                        <div className="match-odds-offer">
                                                            <div className={oddofforon20} id={item.type + matchID + "-" + item.result0} onClick={() => chooseOdd(item.type + matchID + "-" + item.result0, item.type, item.result0, item.first)}>
                                                                <p className="match-odds-offer-h1">{label0}</p>
                                                                <p className="match-odds-offer-h2">{item.first}</p>
                                                            </div>
                                                            <div className={oddofforon21} id={item.type + matchID + "-" + item.result1} onClick={() => chooseOdd(item.type + matchID + "-" + item.result1, item.type, item.result1, item.second)}>
                                                                <p className="match-odds-offer-h1">{label1}</p>
                                                                <p className="match-odds-offer-h2">{item.second}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        }
                                        }
                                        }
                                    )}
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="match-info-sections">
                    {/* <div className="match-info-half-3">
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7071523482288616"
                            crossOrigin="anonymous"></script>
                        <ins className="adsbygoogle"
                            style={{display: "block", textAlign: "center"}}
                            data-ad-layout="in-article"
                            data-ad-format="fluid"
                            data-ad-client="ca-pub-7071523482288616"
                            data-ad-slot="3392695655"></ins>
                        <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div> */}
                    <div className="match-info-half-2">
                        <div className="match-odds-nav-fix">
                            <div className="match-odds-nav" style={{marginBottom: "15px", padding: "0px", paddingBottom: "20px", marginTop: "-15px"}}>
                                <button className="match-odds-nav-element-active" id="navOversigt" onClick={() => {setNav("oversigt")}}>Oversigt</button>
                                <button className="match-odds-nav-element" id="navKampinfo" onClick={() => {setNav("kampinfo")}}>Kampinfo</button>
                                <button className="match-odds-nav-element" id="navStartopstilling" onClick={() => {setNav("startopstilling")}}>Startopstilling</button>
                                <button className="match-odds-nav-element" id="navH2H" onClick={() => {setNav("H2H")}}>H2H</button>
                                <button className="match-odds-nav-element" id="navStatistikker" onClick={() => {setNav("statistikker")}}>Statistikker</button>
                                <button className="match-odds-nav-element" id="navTabel" onClick={() => {setNav("tabel")}}>Tabeloversigt</button>
                            </div>
                        </div>
                        <div className="match-indhold" id="oversigt">
                            <div className="oversigt-section">
                                <div className="oversigt-top">
                                    <p className="oversigt-h1">1. HALVLEG</p>
                                    <p className="oversigt-p">{hg1}-{ag1}</p>
                                </div>
                                <ul>
                                {events.map(item => {
                                    var mstime = new Date().getTime();
                                    var randomNumber = Math.floor(Math.random() * 512);
                                    var randomId = mstime+"-"+randomNumber;
                                        if (item.minute <= 45) {
                                            if (parseInt(item.team_id) === homeTeamId) {
                                                if (item.type === "goal") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.related_player_id} className="oversigt-h3"><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-gul2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "redcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-rod1"></div>
                                                                        <div className="oversigt-rod2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowred") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-rod1"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "substitution") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ind">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.related_player_id}><a className="oversigt-h2-ud">{item.related_player_name}</a></Link>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="sub">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return;
                                                }
                                            } else {
                                                if (item.type === "goal") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.related_player_id}><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-gul2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{visitorTeam}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "redcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-rod1"></div>
                                                                        <div className="oversigt-rod2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{visitorTeam}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowred") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-rod1"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "substitution") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="sub">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ind">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h2-ud">{item.related_player_name}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return;
                                                }
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="oversigt-section">
                                <div className="oversigt-top">
                                    <p className="oversigt-h1">2. HALVLEG</p>
                                    <p className="oversigt-p">{hg2}-{ag2}</p>
                                </div>
                                <ul>
                                {events.map(item => {
                                    var mstime = new Date().getTime();
                                    var randomNumber = Math.floor(Math.random() * 512);
                                    var randomId = mstime+"-"+randomNumber;
                                        if (item.minute > 45) {
                                            if (parseInt(item.team_id) === homeTeamId) {
                                                if (item.type === "goal") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.related_player_id}><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-gul2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "redcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-rod1"></div>
                                                                        <div className="oversigt-rod2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowred") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-rod1"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "substitution") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ind">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ud">{item.related_player_name}</a></Link>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="sub">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return;
                                                }
                                            } else {
                                                if (item.type === "goal") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <Image height="18px" width="18px" src={goal} alt="" className="oversigt-img" />
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.related_player_id}><a className="oversigt-h3">{item.related_player_name}</a></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-gul2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{visitorTeam}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "redcard") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-rod1"></div>
                                                                        <div className="oversigt-rod2"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{visitorTeam}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "yellowred") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2">{item.player_name}</a></Link>
                                                                    <p className="oversigt-h3">{homeTeam}</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="oversigt-card">
                                                                        <div className="oversigt-gul1"></div>
                                                                        <div className="oversigt-rod1"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else if (item.type === "substitution") {
                                                    return (
                                                        <li key={randomId + item.team_id + item.player_name + item.minute}>
                                                            <div className="oversigt-element">
                                                                <div className="oversigt-el-box-l">
                                                                <p className="oversigt-h4">{item.minute}&apos;</p>
                                                                </div>
                                                                <div className="oversigt-el-icon">
                                                                    <div className="sub">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="oversigt-el-box-r">
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ind">{item.player_name}</a></Link>
                                                                    <Link href={"/stage/spiller?id=" + item.player_id}><a className="oversigt-h2-ud">{item.related_player_name}</a></Link>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return;
                                                }
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="match-indhold" id="kampinfo">
                            <div className="match-info-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-info-element-icon" viewBox="0 0 16 16">
                                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                <p className="match-info-p">Start</p>
                                <p className="match-info-h1">{start}</p>
                            </div>
                            <div className="match-info-element-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-info-element-icon" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                                </svg>
                                <p className="match-info-p">Turnering</p>
                                <p className="match-info-h1">{turnering}</p>
                            </div>
                            <div className="match-info-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-info-element-icon" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                <p className="match-info-p">Dommer</p>
                                <p className="match-info-h1">{dommer}</p>
                            </div>
                            <div className="match-info-element-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-info-element-icon" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                                    <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                                </svg>
                                <p className="match-info-p">Stadion</p>
                                <p className="match-info-h1">{stadium}</p>
                            </div>
                            <div className="match-info-element">
                                <svg xmlns="http://www.w3.org/2000/svg" className="match-info-element-icon" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                </svg>
                                <p className="match-info-p">Trænere</p>
                                <div className="match-info-double">
                                    <p className="match-info-h2">{localCoach}</p>
                                    <p className="match-info-h3">{visitorCoach}</p>
                                </div>
                            </div>
                        </div>
                        <div className="match-indhold" id="startopstilling">
                            <p className="nogames display" id="startopstilling-error">Startopstillingen er endnu ikke blevet opgivet.</p>
                            <div id="startopstilling2">
                            <div className="startopstilling-pitch">
                                <div className="startopstilling-element">
                                    {getLineup()}
                                    <Image height="180px" width="180px" src={lineupPitch} alt="" className="pitch-img" />
                                </div>
                            </div>
                            <div className="startopstilling">
                                <div className="team-kampe-section" id="startopstilling-div">
                                    <div className="bench-top-inline">
                                        {homelogo && <Image height="18px" width="18px" src={homelogo} alt="" className="team-bench-img" />}
                                        <p className="team-kampe-h1">Udskiftninger {homeTeam}</p>
                                    </div>
                                    <div className="stage-kampe" id="latest">
                                        <ul>
                                        {udskiftningerHome.map(item => {
                                            var mstime = new Date().getTime();
                                            var randomNumber = Math.floor(Math.random() * 512);
                                            var randomId = mstime+"-"+randomNumber;
                                            var position = "";
                                            if (item.position === "G") {
                                                position = "Målmand";
                                            } else if (item.position === "D") {
                                                position = "Forsvarsspiller";
                                            } else if (item.position === "A") {
                                                position = "Angrebsspiller";
                                            } else if (item.position === "M") {
                                                position = "Midtbanespiller";
                                            }
                                            var substitutions = subs;
                                            return (
                                                <li key={randomId + item.player_name + item.number + position}>
                                                    <Link href={"/stage/spiller?id=" + item.player_id}>
                                                        <div className="bench-element">
                                                            <div className="bench-left">
                                                                <Image height="18px" width="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                <div className="bench-info">
                                                                    <p className="bench-h1">{item.number}. {item.player_name}</p>
                                                                    <p className="bench-h2">{position}</p>
                                                                </div>
                                                            </div>
                                                            {substitutions && <>{substitutions.findIndex(obj => obj.player_in_id === item.player_id) > 0 &&  <div className="ud-sub">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                </svg></div>}</>}
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    </div>
                                </div>
                                <div className="team-kampe-section" id="startopstilling-div">
                                    <div className="bench-top-inline">
                                        {visitorlogo && <Image height="18px" width="18px" src={visitorlogo} alt="" className="team-bench-img" />}
                                        <p className="team-kampe-h1">Udskiftninger {visitorTeam}</p>
                                    </div>
                                    <div className="stage-kampe" id="latest">
                                        <ul>
                                        {udskiftningerVisitor.map(item => {
                                            var mstime = new Date().getTime();
                                            var randomNumber = Math.floor(Math.random() * 512);
                                            var randomId = mstime+"-"+randomNumber;
                                            var position = "";
                                            if (item.position === "G") {
                                                position = "Målmand";
                                            } else if (item.position === "D") {
                                                position = "Forsvarsspiller";
                                            } else if (item.position === "A") {
                                                position = "Angrebsspiller";
                                            } else if (item.position === "M") {
                                                position = "Midtbanespiller";
                                            }
                                            var substitutions = subs;
                                            return (
                                                <li key={randomId + item.player_name + position}>
                                                    <Link href={"/stage/spiller?id=" + item.player_id}>
                                                        <div className="bench-element">
                                                            <div className="bench-left">
                                                                <Image height="18px" width="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                <div className="bench-info">
                                                                    <p className="bench-h1">{item.number}. {item.player_name}</p>
                                                                    <p className="bench-h2">{position}</p>
                                                                </div>
                                                            </div>
                                                            {substitutions && <>{substitutions.findIndex(obj => obj.player_in_id === item.player_id) > 0 &&  <div className="ud-sub">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="sub1" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                </svg>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="sub2" viewBox="0 0 16 16">
                                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                                </svg></div>}</>}
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="match-indhold" id="H2H">
                            <div className="team-kampe-section" id="seneste">
                                <p className="team-kampe-h1">Head2Head</p>
                                <div className="stage-kampe" id="latest">
                                    <ul>
                                        {h2h.slice(0,5).map((item) => {
                                            var timeClass = "team-kampe-minut";
                                            var liveView = "FT";
                                            var scoreLocal = "stage-stilling-p";
                                            var scoreVisitor = "stage-stilling-p";
                                            var teamNameLocal = "stage-kampe-p";
                                            var teamNameVisitor = "stage-kampe-p";
                                            if (item.time.status === "LIVE") {
                                                timeClass = "team-kampe-minut team-kampe-minut-active";
                                                liveView = item.time.minute+" MIN";
                                            } else if (item.time.status === "NS") {
                                                scoreLocal = "stage-stilling-p-none";
                                                scoreVisitor = "stage-stilling-p-none";
                                                var calcTime = item.time.starting_at.time;
                                                calcTime = calcTime.slice(0,-3);
                                                liveView = calcTime;
                                            } else if (item.time.status === "FT") {
                                                if (item.winner_team_id === item.localteam_id) {
                                                    scoreLocal = "stage-stilling-p-fat";
                                                    teamNameLocal = "stage-kampe-p-fat";
                                                } else if (item.winner_team_id === item.visitorteam_id) {
                                                    scoreVisitor = "stage-stilling-p-fat";
                                                    teamNameVisitor = "stage-kampe-p-fat";
                                                }
                                            }
                                            const gameURL = "/stage/match?game=" + item.id + "";

                                            var starting_at = item.time.starting_at.timestamp * 1000;
                                            var starting_at_date = new Date(starting_at).getDate();
                                            var starting_at_date_str = starting_at_date.toString();
                                            var starting_at_month = new Date(starting_at).getMonth() + 1;
                                            var starting_at_month_str = starting_at_month.toString();
                                            if ((starting_at_month.toString()).length === 1) {
                                                starting_at_month_str = "0" + starting_at_month;
                                            }
                                            if ((starting_at_date.toString()).length === 1) {
                                                starting_at_date_str = "0" + starting_at_date;
                                            }

                                            var starting_at_year = new Date(starting_at).getFullYear();
                                            var yearClass = "display-not";
                                            if (starting_at_year !== new Date().getFullYear()) {
                                                yearClass = "team-kampe-minut";
                                            }
                                            return (
                                                <li key={item.id}>
                                                    <div className="team-match">
                                                        <div className="stage-indhold-down">
                                                            <div onClick={() => {window.open(gameURL, "_self")}} className="team-kampe-hold-h2h">
                                                                <div className="stage-h2h">
                                                                    <div className="time-con">
                                                                        <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                        <p className={yearClass}>{starting_at_year}</p>
                                                                    </div>
                                                                    <div className="stage-kampe-hold-div">
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <Image height="18px" width="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                        </div>
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            <Image height="18px" width="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="match-indhold" id="statistikker">
                            <p className="nogames display">{statText}</p>
                            {getStats()}
                        </div>
                        <div className="match-indhold" id="tabel">
                            <div className="team-kampe-section" id="seneste">
                                <div className="match-loader display" id="stage-loader1"></div>
                                {getGroups()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
 
export default StageMatcharticle; 