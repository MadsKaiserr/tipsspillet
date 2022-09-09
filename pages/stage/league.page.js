import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
 
function StageLeague () {
    const router = useRouter();

    const [loadingText, setLoadingText] = useState("Indlæser...");
    const [nav, setNav] = useState("popular");

    const [favorit, setFavorit] = useState(false);

    useEffect(() => {
        if (favorit === true) {
            document.getElementById("favorit").classList.add("favorit-active");
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
        }
    }, [favorit])

    // useEffect(() => {
    //     if (loadingText !== "Indlæser...") {
    //         document.getElementById("stage-loader1").classList.remove("display");
    //         document.getElementById("stage-loader2").classList.remove("display");
    //     }
    // }, [loadingText])


    const [dataLoad, setDataLoad] = useState(false);

    const [league_name, setLeague_name] = useState("Indlæser...");
    const [season_year, setSeason_year] = useState("...");
    const [logo, setLogo] = useState("");

    if (!dataLoad) {
        setTimeout(function (){
            getGame();
        }, 500);
        setDataLoad(true);
    }

    const [tabelType, setTableType] = useState("");
    const [tabelO, setTabelO] = useState([]);
    const [senesteKampe, setSenesteKampe] = useState([]);
    const [kommendeKampe, setKommendeKampe] = useState([]);
    const [mostgoals, setMostGoals] = useState([]);
    const [mostcards, setMostCards] = useState([]);
    const [tabelOUsed, setTabelOUsed] = useState(false);

    function getGame() {
        if (typeof window !== 'undefined') {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            var leagueId = parseInt(urlParams.get("id"));
            fetch("https://soccer.sportmonks.com/api/v2.0/seasons/" + leagueId + "?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=cardscorers,cardscorers.player,cardscorers.team,assistscorers,goalscorers,goalscorers.team,goalscorers.player,league,stages,groups,results,fixtures.localTeam,fixtures.visitorTeam,fixtures:order(starting_at|desc)&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (result) {
                console.log(result);
                setLoadingText("");
                setLeague_name(result.data.league.data.name);
                setSeason_year(result.data.name);
                setLogo(result.data.league.data.logo_path);

                var favorit2 = [];
                if (localStorage.getItem("favoritter")) {
                    favorit2 = JSON.parse(localStorage.getItem("favoritter"));
                } else {
                    favorit2 = [];
                }
                for (var q in favorit2) {
                    if (favorit2[q].id === leagueId) {
                        setFavorit(true);
                    }
                }

                var topscorerArray = result.data.goalscorers.data;
                var assistArray = result.data.assistscorers.data;
                var cardArray = result.data.cardscorers.data;
                var mostgoalsArray = [];
                var mostAssistsArray = [];
                var mostCardsArray = [];
                for (var e in topscorerArray) {
                    if (topscorerArray[e].type === "goals") {
                        var mostGoalsIndex = mostgoalsArray.findIndex(obj => obj.player.data.fullname === topscorerArray[e].player.data.fullname);
                        if (mostGoalsIndex === -1) {
                            mostgoalsArray.push(topscorerArray[e]);
                        } else {
                            mostgoalsArray[mostGoalsIndex].goals = mostgoalsArray[mostGoalsIndex].goals + topscorerArray[e].goals;
                            mostgoalsArray[mostGoalsIndex].penalty_goals = mostgoalsArray[mostGoalsIndex].penalty_goals + topscorerArray[e].penalty_goals;
                        }
                    }
                }
                mostgoalsArray.sort((a, b) => {
                    return b.goals - a.goals;
                });
                for (var e in cardArray) {
                    if (cardArray[e].type === "cards") {
                        var mostCardsIndex = mostCardsArray.findIndex(obj => obj.player.data.fullname === cardArray[e].player.data.fullname);
                        if (mostCardsIndex === -1) {
                            mostCardsArray.push(cardArray[e]);
                        } else {
                            mostCardsArray[mostCardsIndex].yellowcards = mostCardsArray[mostCardsIndex].yellowcards + cardArray[e].yellowcards;
                            mostCardsArray[mostCardsIndex].redcards = mostCardsArray[mostCardsIndex].redcards + cardArray[e].redcards;
                        }
                    }
                }
                mostCardsArray.sort((a, b) => {
                    return b.yellowcards - a.yellowcards;
                });
                for (var q in assistArray) {
                    var mostAssistsIndex = mostAssistsArray.findIndex(obj => obj.player_id === assistArray[q].player_id);
                    if (mostAssistsIndex === -1) {
                        mostAssistsArray.push(assistArray[q]);
                    } else {
                        mostAssistsArray[mostAssistsIndex].assists = mostAssistsArray[mostAssistsIndex].assists + assistArray[q].assists;
                    }
                }
                for (var t in mostAssistsArray) {
                    var mostArrayIndex = mostgoalsArray.findIndex(obj => obj.player_id === mostAssistsArray[t].player_id);
                    if (mostArrayIndex !== -1) {
                        if (mostAssistsArray[t].assists === undefined) {
                            mostgoalsArray[mostArrayIndex].assists = 0;
                        } else {
                            mostgoalsArray[mostArrayIndex].assists = mostAssistsArray[t].assists;
                        }
                    }
                }
                setMostGoals(mostgoalsArray);
                setMostCards(mostCardsArray);

                var matchArray = result.data.fixtures.data;
                var matches = "";
                for (var u in matchArray) {
                    if (matches === "") {
                        matches = matchArray[u].id;
                    } else {
                        matches = matches + "," + matchArray[u].id;
                    }
                }

                var timePar = (new Date().getTime()) / 1000;
                var senesteArray = [];
                var kommendeArray = [];
                for (var x in result.data.fixtures.data) {
                    if (result.data.fixtures.data[x].time.starting_at.timestamp < timePar) {
                        senesteArray.push(result.data.fixtures.data[x]);
                    } else {
                        kommendeArray.push(result.data.fixtures.data[x]);
                    }
                }
                senesteArray.sort((a, b) => {
                    return b.time.starting_at.timestamp - a.time.starting_at.timestamp;
                });
                setSenesteKampe(senesteArray);
                kommendeArray.sort((a, b) => {
                    return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                });
                setKommendeKampe(kommendeArray);
            }) .catch(error => 
                console.log('error', error
            ));
        }
    }

    function getTabel() {
        setTabelOUsed(true);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var leagueId = parseInt(urlParams.get("id"));
        fetch("https://soccer.sportmonks.com/api/v2.0/standings/season/"+leagueId+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=standings.league,standings.team,")
        .then(response => response.json())
        .then(function (result) {
            console.log(result);
            // for (var t in result.data) {
            //     if (result.data[t].stage_id === stageId) {
            //         setTabelO(result.data[t].standings.data);
            //         if (result.data[t].name === "Regular Season") {
            //             setTabelOLeague(result.data[t].standings.data[0].league.data.name);
            //         }
            //         console.log("Table result", result.data[t].standings.data)
            //     }
            // }
            setTabelO(result.data);
            setTableType("1");
        })
        .catch(error => console.log('error', error));
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

    useEffect(() => {
        if (nav === "popular") {
            document.getElementById("popular").classList.add("display");
            document.getElementById("kort").classList.remove("display");
            document.getElementById("corner").classList.remove("display");
            document.getElementById("goal").classList.remove("display");
            document.getElementById("spillere").classList.remove("display");

            document.getElementById("popularN").className = "oddsspil-element-active";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
        } else if (nav === "kort") {
            document.getElementById("popular").classList.remove("display");
            document.getElementById("kort").classList.add("display");
            document.getElementById("corner").classList.remove("display");
            document.getElementById("goal").classList.remove("display");
            document.getElementById("spillere").classList.remove("display");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element-active";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";
        } else if (nav === "corner") {
            document.getElementById("popular").classList.remove("display");
            document.getElementById("kort").classList.remove("display");
            document.getElementById("corner").classList.add("display");
            document.getElementById("goal").classList.remove("display");
            document.getElementById("spillere").classList.remove("display");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element-active";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element";

            if (tabelOUsed === false) {
                getTabel();
            }
        } else if (nav === "goal") {
            document.getElementById("popular").classList.remove("display");
            document.getElementById("kort").classList.remove("display");
            document.getElementById("corner").classList.remove("display");
            document.getElementById("goal").classList.add("display");
            document.getElementById("spillere").classList.remove("display");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element-active";
            document.getElementById("spillereN").className = "oddsspil-element";
        } else if (nav === "spillere") {
            document.getElementById("popular").classList.remove("display");
            document.getElementById("kort").classList.remove("display");
            document.getElementById("corner").classList.remove("display");
            document.getElementById("goal").classList.remove("display");
            document.getElementById("spillere").classList.add("display");

            document.getElementById("popularN").className = "oddsspil-element";
            document.getElementById("kortN").className = "oddsspil-element";
            document.getElementById("cornerN").className = "oddsspil-element";
            document.getElementById("goalN").className = "oddsspil-element";
            document.getElementById("spillereN").className = "oddsspil-element-active";
        }
    }, [nav])

    function getGroups() {
        if (tabelType !== "") {
            return tabelO.map((item) => {
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
            })
        }
    }

    function setFavoritter() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var leagueId = parseInt(urlParams.get("id"));
        if (favorit === false && document.getElementById("favorit")) {
            document.getElementById("favorit").classList.add("favorit-active");
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
            if (localStorage.getItem("favoritter")) {
                var storage = JSON.parse(localStorage.getItem("favoritter"));
                const elementPush = {
                    "id": leagueId,
                    "image": logo,
                    "name": league_name,
                    "liga": league_name
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
                    "id": leagueId,
                    "image": logo,
                    "name": league_name,
                    "liga": league_name
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
                    if (storage[u].id + "" === leagueId + "") {
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
    }

    function favoritHover() {
        document.getElementById("favorit-o").classList.remove("display");
        document.getElementById("favorit").classList.add("display");
    }

    function favoritUnHover() {
        if (favorit === false) {
            document.getElementById("favorit-o").classList.add("display");
            document.getElementById("favorit").classList.remove("display");
        }
    }

    return (
        <>
            <Head>
                <title>Liga - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="stage-main-article-container">
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
                <div className="match-info">
                    <div className="favorit-container" onClick={() => setFavoritter()} onMouseOver={() => favoritHover()} onMouseLeave={() => favoritUnHover()}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="favorit display" id="favorit-o" viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="favorit" id="favorit" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </div>
                    <div className="team-team">
                        <div className="match-title-text">
                            <h1 className="match-h1">{league_name}</h1>
                            <p className="match-p team-p">{season_year}</p>
                            <div className="match-img-con">
                                {logo && <Image layout="fill" objectFit="cover" src={logo} alt="" className="match-img" />}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="match-info" id="team_match">
                    <div className="match-odds-nav" style={{padding: "0px", paddingBottom: "15px", paddingTop: "10px", overflow: "visible"}}>
                        <button className="oddsspil-element-active" onClick={() => {setNav("popular")}} id="popularN">Oversigt</button>
                        <button className="oddsspil-element" onClick={() => {setNav("kort")}} id="kortN">Resultater</button>
                        <button className="oddsspil-element" onClick={() => {setNav("spillere")}} id="spillereN">Kommende</button>
                        <button className="oddsspil-element" onClick={() => {setNav("corner")}} id="cornerN">Tabel</button>
                        <button className="oddsspil-element" onClick={() => {setNav("goal")}} id="goalN">Statistikker</button>
                    </div>
                    <ul className="match-odds-contain display" id="popular">
                        <div className="team-indhold-side">
                            <div className="team-kampe-section" id="seneste">
                                <p className="team-kampe-h1">Resultater</p>
                                <div className="stage-kampe" id="latest">
                                    <ul>
                                        {senesteKampe.slice(0,5).map((item) => {
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
                                            const gameURL = "/stage/match?game=" + item.id;

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
                                            return (
                                                <li key={item.id}>
                                                    <div className="team-match">
                                                        <div className="stage-indhold-down">
                                                            <Link href={gameURL}>
                                                                <div className="team-kampe-hold">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <div className="stage-kampe-hold-div">
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                        </div>
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                    <div className="stage-indhold-down">
                                        <div className="team-kampe-hold">
                                            <p className="team-kampe-p">Se alle resultater</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="team-kampe-section" id="seneste">
                                <p className="team-kampe-h1">Kommende</p>
                                <div className="stage-kampe" id="latest">
                                    <ul>
                                        {kommendeKampe.slice(0,5).map((item) => {
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
                                            const gameURL = "/stage/match?game=" + item.id;

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
                                            return (
                                                <li key={item.id}>
                                                    <div className="team-match">
                                                        <div className="stage-indhold-down">
                                                            <Link href={gameURL}>
                                                                <div className="team-kampe-hold">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <div className="stage-kampe-hold-div">
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                            <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                        </div>
                                                                        <div className="stage-kampe-team">
                                                                            <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                            <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                            <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                    <div className="stage-indhold-down">
                                        <div className="team-kampe-hold">
                                            <p className="team-kampe-p">Se alle kommende</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ul className="match-odds-contain" id="kort">
                        <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Resultater</p>
                            <div className="stage-kampe" id="latest">
                                <ul>
                                    {senesteKampe.map((item) => {
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
                                        const gameURL = "/stage/match?game=" + item.id;

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
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                <div className="stage-kampe-hold-div">
                                                                    <div className="stage-kampe-team">
                                                                        <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                        <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                        <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                    </div>
                                                                    <div className="stage-kampe-team">
                                                                        <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                        <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            );
                                        }
                                    )}
                                </ul>
                                <div className="stage-indhold-down">
                                    <div className="team-kampe-hold">
                                        <p className="team-kampe-p">Se alle resultater</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ul className="match-odds-contain" id="spillere">
                        <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Kommende</p>
                            <div className="stage-kampe" id="latest">
                                <ul>
                                    {kommendeKampe.map((item) => {
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
                                        const gameURL = "/stage/match?game=" + item.id;

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
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                <div className="stage-kampe-hold-div">
                                                                    <div className="stage-kampe-team">
                                                                        <p className={scoreLocal}>{item.scores.localteam_score}</p>
                                                                        <Image width="18px" height="18px" alt="." src={item.localTeam.data.logo_path} className="stage-img" />
                                                                        <p className={teamNameLocal}>{item.localTeam.data.name}</p>
                                                                    </div>
                                                                    <div className="stage-kampe-team">
                                                                        <p className={scoreVisitor}>{item.scores.visitorteam_score}</p>
                                                                        <Image width="18px" height="18px" alt="." src={item.visitorTeam.data.logo_path} className="stage-img" />
                                                                        <p className={teamNameVisitor}>{item.visitorTeam.data.name}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>
                                            );
                                        }
                                    )}
                                </ul>
                                <div className="stage-indhold-down">
                                    <div className="team-kampe-hold">
                                        <p className="team-kampe-p">Se alle resultater</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ul className="match-odds-contain" id="corner">
                        <div className="team-kampe-section" id="seneste">
                            {getGroups()}
                        </div>
                    </ul>
                    <ul className="match-odds-contain" id="goal">
                        <div className="league-stats">
                            <div className="team-kampe-section" id="startopstilling-div">
                                <div className="tabel-top" style={{padding: "10px 25px"}}>
                                    <p className="stat-p-h1">Topscorere</p>
                                    <div className="stat-ends">
                                        <p className="stat-p-p">M</p>
                                        <p className="stat-p-p">S</p>
                                        <p className="stat-p-p">A</p>
                                    </div>
                                </div>
                                <div className="stage-kampe" id="latest">
                                    <ul>
                                    {mostgoals.slice(0,20).map((item, index) => {
                                        var assists = item.assists;
                                        if (assists === undefined) {
                                            assists = 0;
                                        }
                                        return (
                                            <li key={item.player.data.player_id + item.player.data.fullname}>
                                                <Link href={"/stage/spiller?id=" + item.player.data.player_id}>
                                                    <div className="stat-player-element">
                                                        <div className="stat-player">
                                                            <p className="stat-player-h1">{index + 1}.</p>
                                                            <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                            <Image width="18px" height="18px" src={item.team.data.logo_path} alt="" className="top-img-logo" />
                                                            <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                <p className="bench-h1">{item.player.data.display_name}</p>
                                                                <p className="bench-h2">{item.player.data.nationality}</p>
                                                            </div>
                                                        </div>
                                                        <div className="stat-int">
                                                            <div className="stat-text">
                                                                <p className="stat-player-p">{item.goals}</p>
                                                                <p className="stat-player-p">{"(" + item.penalty_goals + ")"}</p>
                                                                <p className="stat-player-p">{assists}</p>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                </div>
                            </div>
                            <div className="team-kampe-section" id="startopstilling-div">
                                <div className="tabel-top" style={{padding: "10px 25px"}}>
                                    <p className="stat-p-h1">Uddelte kort</p>
                                    <div className="stat-ends">
                                        <p className="stat-p-p">G</p>
                                        <p className="stat-p-p">R</p>
                                    </div>
                                </div>
                                <div className="stage-kampe" id="latest">
                                    <ul>
                                    {mostcards.slice(0,20).map((item, index) => {
                                        return (
                                            <li key={item.player.data.player_id + item.player.data.fullname}>
                                                <Link href={"/stage/spiller?id=" + item.player.data.player_id}>
                                                    <div className="stat-player-element">
                                                        <div className="stat-player">
                                                            <p className="stat-player-h1">{index + 1}.</p>
                                                            <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                            <Image width="18px" height="18px" src={item.team.data.logo_path} alt="" className="top-img-logo" />
                                                            <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                <p className="bench-h1">{item.player.data.display_name}</p>
                                                                <p className="bench-h2">{item.player.data.nationality}</p>
                                                            </div>
                                                        </div>
                                                        <div className="stat-int">
                                                            <div className="stat-text">
                                                                <p className="stat-player-p">{item.yellowcards}</p>
                                                                <p className="stat-player-p">{item.redcards}</p>
                                                            </div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="team-icon" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                                </div>
                            </div>
                        </div>
                    </ul>
                    <ul className="match-odds-contain" id="spillere"></ul>
                </div>
            </div>
        </>
    )
}
 
export default StageLeague;