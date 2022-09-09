import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import StageHeader from '../layout/stageheader';
 
function StageTeam () {
    const router = useRouter();

    useEffect(() => {
        getGame();
    }, [])

    const [loadingText, setLoadingText] = useState("Indlæser...");

    useEffect(() => {
        if (loadingText !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
            document.getElementById("stage-loader2").classList.remove("display");
        }
    }, [loadingText])

    const [tabelOUsed, setTabelOUsed] = useState(false);
    const [tabelType, setTableType] = useState("");
    const [tabelO, setTabelO] = useState([]);

    const [team_name, setTeam_name] = useState("...");
    const [logo, setLogo] = useState("");
    const [nat_team, setNat_team] = useState("Indlæser...");
    const [squad, setSquad] = useState([])
    const [season, setSeason] = useState([])

    const [senesteFive, setSenesteFive] = useState([]);
    const [kommendeFive, setKommendeFive] = useState([]);

    const [favorit, setFavorit] = useState(false);

    useEffect(() => {
        if (favorit === true) {
            document.getElementById("favorit").classList.add("favorit-active");
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
        }
    }, [favorit])

    const [mostgoals, setMostGoals] = useState([]);

    function getGame() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const matchID = urlParams.get("team");
        fetch("https://soccer.sportmonks.com/api/v2.0/teams/"+matchID+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=goalscorers.player,goalscorers.team,assistscorers.player,assistscorers.team,league,latest,squad,upcoming,transfers,stats,fifaranking,uefaranking,goalscorers,assistscorers,trophies,rivals,activeSeasons&tz=Europe/Copenhagen")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Teams:", result);
            getTabel(result.data.league.data.current_season_id);

            var topscorerArray = result.data.goalscorers.data;
            var assistArray = result.data.assistscorers.data;
            var mostgoalsArray = [];
            var mostAssistsArray = [];
            for (var e in topscorerArray) {
                if (topscorerArray[e].type === "goals" && topscorerArray[e].player.data.team_id === parseInt(matchID)) {
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

            var favorit2 = [];
            if (localStorage.getItem("favoritter")) {
                favorit2 = JSON.parse(localStorage.getItem("favoritter"));
            } else {
                favorit2 = [];
            }
            for (var q in favorit2) {
                if (favorit2[q].id + "" === matchID) {
                    setFavorit(true);
                }
            }
            var latestArray = result.data.latest.data;
            var matches = "";
            for (var u in latestArray) {
                if (matches === "") {
                    matches = latestArray[u].id;
                } else {
                    matches = matches + "," + latestArray[u].id;
                }
            }

            var kommendeArray = result.data.upcoming.data;
            for (var u in kommendeArray) {
                if (matches === "") {
                    matches = kommendeArray[u].id;
                } else {
                    matches = matches + "," + kommendeArray[u].id;
                }
            }

            fetch("https://soccer.sportmonks.com/api/v2.0/fixtures/multi/"+matches+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=localTeam,visitorTeam&tz=Europe/Copenhagen")
            .then(response => response.json())
            .then(function (response) {
                console.log("Sportmonks - Multi fixtures:", response);
                var kommendeSlash = [];
                var senesteSlash = [];
                for (var q in response.data) {
                    for (var y in kommendeArray) {
                        if (kommendeArray[y].id === response.data[q].id) {
                            kommendeSlash.push(response.data[q]);
                        }
                    }
                    for (var y in latestArray) {
                        if (latestArray[y].id === response.data[q].id) {
                            senesteSlash.push(response.data[q]);
                        }
                    }
                }
                senesteSlash.sort((a, b) => {
                    return b.time.starting_at.timestamp - a.time.starting_at.timestamp;
                });
                setSenesteFive(senesteSlash);
                kommendeSlash.sort((a, b) => {
                    return a.time.starting_at.timestamp - b.time.starting_at.timestamp;
                });
                setKommendeFive(kommendeSlash);
            }) .catch(error => 
                console.log('error', error
            ));
            setLogo(result.data.logo_path);
            setSeason(result.data.league.data.current_season_id);
            setTeam_name(result.data.name);
            if (result.data.national_team === true) {
                setNat_team("Landshold");
            } else {
                setNat_team(result.data.league.data.name);
            }
            setLoadingText("");
            setSquad(result.data.squad.data);
        }) .catch(error => 
            console.log('error', error
        ));
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

    const [nav, setNav] = useState("oversigt");

    useEffect(() => {
        if (nav === "oversigt") {
            document.getElementById("navOversigt").className = "match-odds-nav-element-active";
            document.getElementById("navResultater").className = "match-odds-nav-element";
            document.getElementById("navKommende").className = "match-odds-nav-element";
            document.getElementById("navTrup").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.add("display-flex");
            document.getElementById("resultater").classList.remove("display-flex");
            document.getElementById("kommende").classList.remove("display-flex");
            document.getElementById("trup").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "resultater") {
            document.getElementById("navOversigt").className = "match-odds-nav-element";
            document.getElementById("navResultater").className = "match-odds-nav-element-active";
            document.getElementById("navKommende").className = "match-odds-nav-element";
            document.getElementById("navTrup").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("resultater").classList.add("display-flex");
            document.getElementById("kommende").classList.remove("display-flex");
            document.getElementById("trup").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "kommende") {
            document.getElementById("navOversigt").className = "match-odds-nav-element";
            document.getElementById("navResultater").className = "match-odds-nav-element";
            document.getElementById("navKommende").className = "match-odds-nav-element-active";
            document.getElementById("navTrup").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("resultater").classList.remove("display-flex");
            document.getElementById("kommende").classList.add("display-flex");
            document.getElementById("trup").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "trup") {
            document.getElementById("navOversigt").className = "match-odds-nav-element";
            document.getElementById("navResultater").className = "match-odds-nav-element";
            document.getElementById("navKommende").className = "match-odds-nav-element";
            document.getElementById("navTrup").className = "match-odds-nav-element-active";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("resultater").classList.remove("display-flex");
            document.getElementById("kommende").classList.remove("display-flex");
            document.getElementById("trup").classList.add("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
            if (squadUsed === false) {
                getSquad();
            }
        } else if (nav === "statistikker") {
            document.getElementById("navOversigt").className = "match-odds-nav-element";
            document.getElementById("navResultater").className = "match-odds-nav-element";
            document.getElementById("navKommende").className = "match-odds-nav-element";
            document.getElementById("navTrup").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element-active";
            document.getElementById("navTabel").className = "match-odds-nav-element";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("resultater").classList.remove("display-flex");
            document.getElementById("kommende").classList.remove("display-flex");
            document.getElementById("trup").classList.remove("display-flex");
            document.getElementById("statistikker").classList.add("display-flex");
            document.getElementById("tabel").classList.remove("display-flex");
        } else if (nav === "tabel") {
            document.getElementById("navOversigt").className = "match-odds-nav-element";
            document.getElementById("navResultater").className = "match-odds-nav-element";
            document.getElementById("navKommende").className = "match-odds-nav-element";
            document.getElementById("navTrup").className = "match-odds-nav-element";
            document.getElementById("navStatistikker").className = "match-odds-nav-element";
            document.getElementById("navTabel").className = "match-odds-nav-element-active";

            document.getElementById("oversigt").classList.remove("display-flex");
            document.getElementById("resultater").classList.remove("display-flex");
            document.getElementById("kommende").classList.remove("display-flex");
            document.getElementById("trup").classList.remove("display-flex");
            document.getElementById("statistikker").classList.remove("display-flex");
            document.getElementById("tabel").classList.add("display-flex");
        }
      }, [nav])

    const [squadO, setSquadO] = useState([]);
    const [squadUsed, setSquadUsed] = useState(false);

    function getSquad() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const matchID = urlParams.get("team");
        setSquadUsed(true);
        fetch("https://soccer.sportmonks.com/api/v2.0/squad/season/"+season+"/team/"+matchID+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=player")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Squad:", result);
            setSquadO(result.data);
        })
        .catch(error => console.log('error', error));
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

    function setFavoritter() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const matchID = urlParams.get("team");
        if (favorit === false && document.getElementById("favorit")) {
            document.getElementById("favorit").classList.add("favorit-active");
            document.getElementById("favorit-o").classList.remove("display");
            document.getElementById("favorit").classList.add("display");
            if (localStorage.getItem("favoritter")) {
                var storage = JSON.parse(localStorage.getItem("favoritter"));
                const elementPush = {
                    "id": matchID,
                    "image": logo,
                    "name": team_name,
                    "liga": nat_team
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
                    "id": matchID,
                    "image": logo,
                    "name": team_name,
                    "liga": nat_team
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
                    if (storage[u].id + "" === matchID) {
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

    function getTabel(liga) {
        setTabelOUsed(true);
        fetch("https://soccer.sportmonks.com/api/v2.0/standings/season/"+liga+"?api_token="+"kvgDywRFDSqPhS9iYQynEci42JvyVtqLpCXBJlBHrH5v8Br8RtrEayi94Ybf"+"&include=standings.league,standings.team,")
        .then(response => response.json())
        .then(function (result) {
            console.log("Sportmonks - Standings:", result);
            if (result.data) {
                setTabelO(result.data);
                setTableType("1");
            }
        })
        .catch(error => console.log('error', error));
    }

    function getGroups() {
        if (tabelType !== "") {
            return tabelO.map((item) => {
                if (item.name === "League A" || item.name === "League B" || item.name === "League C" || item.name === "League D") {
                    var mstime = new Date().getTime();
                    var randomNumber = Math.floor(Math.random() * 512);
                    var randomId = mstime+"-"+randomNumber;
                    return (
                        <li key={item.name + "first"}>
                            <li key={item.name + "-name"} className="tabel-item">{item.name}</li>
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

    return (
        <>
        <Head>
            <title>Hold - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
        <div className="match-figure">
            <div className="info-figure1"></div>
            <div className="info-figure2"></div>
        </div>
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
                            <h1 className="match-h1">{team_name}</h1>
                            <p className="match-p team-p">{nat_team}</p>
                        </div>
                        <div className="match-img-con">
                            {logo && <Image layout="fill" objectFit="cover" src={logo} alt="" className="match-img" />}
                        </div>
                    </div>
                </div>
                <div className="match-info" id="team_match">
                    <div className="match-odds-nav" style={{padding: "0px", paddingBottom: "15px", marginTop: "-15px"}}>
                        <button className="match-odds-nav-element-active" id="navOversigt" onClick={() => {setNav("oversigt")}}>Oversigt</button>
                        <button className="match-odds-nav-element" id="navResultater" onClick={() => {setNav("resultater")}}>Resultater</button>
                        <button className="match-odds-nav-element" id="navKommende" onClick={() => {setNav("kommende")}}>Kommende</button>
                        <button className="match-odds-nav-element" id="navTrup" onClick={() => {setNav("trup")}}>Trup</button>
                        <button className="match-odds-nav-element" id="navStatistikker" onClick={() => {setNav("statistikker")}}>Statistikker</button>
                        <button className="match-odds-nav-element" id="navTabel" onClick={() => {setNav("tabel")}}>Tabel</button>
                    </div>
                    <div className="team-indhold" id="oversigt">
                        <div className="team-indhold-side">
                            <div className="team-kampe-section" id="seneste" style={{marginBottom: "0px"}}>
                                <p className="team-kampe-h1">Resultater</p>
                                <div className="stage-kampe" id="latest">
                                    <div className="match-loader display" id="stage-loader1"></div>
                                    <ul>
                                        {senesteFive.slice(0,5).map((item) => {
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
                                
                                            var wherearewe = "";
                                            if (item.league_id === 271) {
                                                wherearewe = "Danmark / Super Liga"
                                            } else if (item.league_id === 2) {
                                                wherearewe = "Verden / Champions League"
                                            } else if (item.league_id === 5) {
                                                wherearewe = "Europa / Europa League"
                                            } else if (item.league_id === 8) {
                                                wherearewe = "England / Premier League"
                                            } else if (item.league_id === 82) {
                                                wherearewe = "Tyskland / Bundesliga"
                                            } else if (item.league_id === 301) {
                                                wherearewe = "Frankrig / Ligue 1"
                                            } else if (item.league_id === 384) {
                                                wherearewe = "Italien / Serie A"
                                            } else if (item.league_id === 564) {
                                                wherearewe = "Spanien / La Liga"
                                            } else if (item.league_id === 720) {
                                                wherearewe = "Europa / VM Kvalifikation Europa"
                                            } else if (item.league_id === 1325) {
                                                wherearewe = "Europa / EM Kvalifikation"
                                            } else if (item.league_id === 1326) {
                                                wherearewe = "Europa / EM"
                                            } else if (item.league_id === 2286) {
                                                wherearewe = "Europa / Conference League"
                                            } else if (item.league_id === 732) {
                                                wherearewe = "Verden / VM"
                                            } else if (item.league_id === 1082) {
                                                wherearewe = "Verden / Venskabskamp"
                                            } else if (item.league_id === 1125) {
                                                wherearewe = "Verden / OL"
                                            } else if (item.league_id === 1398) {
                                                wherearewe = "Verden / Audi Cup"
                                            } else {
                                                wherearewe = "Mindre liga"
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
                                        <div onClick={() => {setNav("resultater")}} className="team-kampe-hold">
                                            <p className="team-kampe-p">Se alle resultater.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="team-kampe-section" style={{marginBottom: "0px"}}>
                                <p className="team-kampe-h1">Kommende</p>
                                <div className="stage-kampe" id="latest">
                                    <div className="match-loader display" id="stage-loader2"></div>
                                    <ul>
                                        {kommendeFive.slice(0,5).map((item) => {
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
                                
                                            var wherearewe = "";
                                            if (item.league_id === 271) {
                                                wherearewe = "Danmark / Super Liga"
                                            } else if (item.league_id === 2) {
                                                wherearewe = "Verden / Champions League"
                                            } else if (item.league_id === 5) {
                                                wherearewe = "Europa / Europa League"
                                            } else if (item.league_id === 8) {
                                                wherearewe = "England / Premier League"
                                            } else if (item.league_id === 82) {
                                                wherearewe = "Tyskland / Bundesliga"
                                            } else if (item.league_id === 301) {
                                                wherearewe = "Frankrig / Ligue 1"
                                            } else if (item.league_id === 384) {
                                                wherearewe = "Italien / Serie A"
                                            } else if (item.league_id === 564) {
                                                wherearewe = "Spanien / La Liga"
                                            } else if (item.league_id === 720) {
                                                wherearewe = "Europa / VM Kvalifikation Europa"
                                            } else if (item.league_id === 1325) {
                                                wherearewe = "Europa / EM Kvalifikation"
                                            } else if (item.league_id === 1326) {
                                                wherearewe = "Europa / EM"
                                            } else if (item.league_id === 2286) {
                                                wherearewe = "Europa / Conference League"
                                            } else if (item.league_id === 732) {
                                                wherearewe = "Verden / VM"
                                            } else if (item.league_id === 1082) {
                                                wherearewe = "Verden / Venskabskamp"
                                            } else if (item.league_id === 1125) {
                                                wherearewe = "Verden / OL"
                                            } else if (item.league_id === 1398) {
                                                wherearewe = "Verden / Audi Cup"
                                            } else {
                                                wherearewe = "Mindre liga"
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
                                        <div onClick={() => {setNav("kommende")}} className="team-kampe-hold">
                                            <p className="team-kampe-p">Se alle kommende kampe.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="team-indhold-side">
                            <div className="team-kampe-section" style={{marginBottom: "0px"}}>
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
                                    {mostgoals.slice(0,5).map((item, index) => {
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
                            <div className="team-kampe-section" style={{marginBottom: "0px"}}>
                                {getGroups()}
                            </div>
                        </div>
                    </div>
                    <div className="team-indhold" id="resultater">
                        <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Resultater</p>
                            <div className="stage-kampe" id="latest">
                                <ul id="resultater15">
                                    {senesteFive.slice(0,15).map((item) => {
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

                                        var starting_at_year = new Date(starting_at).getFullYear();
                                        var yearClass = "display-not";
                                        if (starting_at_year !== new Date().getFullYear()) {
                                            yearClass = "team-kampe-minut";
                                        }
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <div className="time-con">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <p className={yearClass}>{starting_at_year}</p>
                                                                </div>
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
                                <ul className="display-not" id="resultateralle">
                                    {senesteFive.map((item) => {
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

                                        var starting_at_year = new Date(starting_at).getFullYear();
                                        var yearClass = "display-not";
                                        if (starting_at_year !== new Date().getFullYear()) {
                                            yearClass = "team-kampe-minut";
                                        }
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <div className="time-con">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <p className={yearClass}>{starting_at_year}</p>
                                                                </div>
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
                                    <div className="team-kampe-hold" onClick={() => {document.getElementById("resultater15").classList.add("display-not");document.getElementById("resultateralle").classList.remove("display-not");document.getElementById("sealle").innerHTML = "Tilbage til toppen";window.scrollTo(0, 0);}}>
                                        <p className="team-kampe-p" id="sealle">Se alle resultater</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="team-indhold" id="kommende">
                        <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Kommende</p>
                            <div className="stage-kampe" id="latest">
                                <ul id="kommende15">
                                    {kommendeFive.slice(0,15).map((item) => {
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
                            
                                        var wherearewe = "";
                                        if (item.league_id === 271) {
                                            wherearewe = "Danmark / Super Liga"
                                        } else if (item.league_id === 2) {
                                            wherearewe = "Verden / Champions League"
                                        } else if (item.league_id === 5) {
                                            wherearewe = "Europa / Europa League"
                                        } else if (item.league_id === 8) {
                                            wherearewe = "England / Premier League"
                                        } else if (item.league_id === 82) {
                                            wherearewe = "Tyskland / Bundesliga"
                                        } else if (item.league_id === 301) {
                                            wherearewe = "Frankrig / Ligue 1"
                                        } else if (item.league_id === 384) {
                                            wherearewe = "Italien / Serie A"
                                        } else if (item.league_id === 564) {
                                            wherearewe = "Spanien / La Liga"
                                        } else if (item.league_id === 720) {
                                            wherearewe = "Europa / VM Kvalifikation Europa"
                                        } else if (item.league_id === 1325) {
                                            wherearewe = "Europa / EM Kvalifikation"
                                        } else if (item.league_id === 1326) {
                                            wherearewe = "Europa / EM"
                                        } else if (item.league_id === 2286) {
                                            wherearewe = "Europa / Conference League"
                                        } else if (item.league_id === 732) {
                                            wherearewe = "Verden / VM"
                                        } else if (item.league_id === 1082) {
                                            wherearewe = "Verden / Venskabskamp"
                                        } else if (item.league_id === 1125) {
                                            wherearewe = "Verden / OL"
                                        } else if (item.league_id === 1398) {
                                            wherearewe = "Verden / Audi Cup"
                                        } else {
                                            wherearewe = "Mindre liga"
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

                                        var starting_at_year = new Date(starting_at).getFullYear();
                                        var yearClass = "display-not";
                                        if (starting_at_year !== new Date().getFullYear()) {
                                            yearClass = "team-kampe-minut";
                                        }
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <div className="time-con">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <p className={yearClass}>{starting_at_year}</p>
                                                                </div>
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
                                <ul className="display-not" id="kommendealle">
                                    {kommendeFive.map((item) => {
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
                            
                                        var wherearewe = "";
                                        if (item.league_id === 271) {
                                            wherearewe = "Danmark / Super Liga"
                                        } else if (item.league_id === 2) {
                                            wherearewe = "Verden / Champions League"
                                        } else if (item.league_id === 5) {
                                            wherearewe = "Europa / Europa League"
                                        } else if (item.league_id === 8) {
                                            wherearewe = "England / Premier League"
                                        } else if (item.league_id === 82) {
                                            wherearewe = "Tyskland / Bundesliga"
                                        } else if (item.league_id === 301) {
                                            wherearewe = "Frankrig / Ligue 1"
                                        } else if (item.league_id === 384) {
                                            wherearewe = "Italien / Serie A"
                                        } else if (item.league_id === 564) {
                                            wherearewe = "Spanien / La Liga"
                                        } else if (item.league_id === 720) {
                                            wherearewe = "Europa / VM Kvalifikation Europa"
                                        } else if (item.league_id === 1325) {
                                            wherearewe = "Europa / EM Kvalifikation"
                                        } else if (item.league_id === 1326) {
                                            wherearewe = "Europa / EM"
                                        } else if (item.league_id === 2286) {
                                            wherearewe = "Europa / Conference League"
                                        } else if (item.league_id === 732) {
                                            wherearewe = "Verden / VM"
                                        } else if (item.league_id === 1082) {
                                            wherearewe = "Verden / Venskabskamp"
                                        } else if (item.league_id === 1125) {
                                            wherearewe = "Verden / OL"
                                        } else if (item.league_id === 1398) {
                                            wherearewe = "Verden / Audi Cup"
                                        } else {
                                            wherearewe = "Mindre liga"
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

                                        var starting_at_year = new Date(starting_at).getFullYear();
                                        var yearClass = "display-not";
                                        if (starting_at_year !== new Date().getFullYear()) {
                                            yearClass = "team-kampe-minut";
                                        }
                                        return (
                                            <li key={item.id}>
                                                <div className="team-match">
                                                    <div className="stage-indhold-down">
                                                        <Link href={gameURL}>
                                                            <div className="team-kampe-hold">
                                                                <div className="time-con">
                                                                    <p className={timeClass}>{starting_at_date_str}.{starting_at_month_str}</p>
                                                                    <p className={yearClass}>{starting_at_year}</p>
                                                                </div>
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
                                    <div className="team-kampe-hold" onClick={() => {document.getElementById("kommende15").classList.add("display-not");document.getElementById("kommendealle").classList.remove("display-not");document.getElementById("seallekommende").innerHTML = "Tilbage til toppen";window.scrollTo(0, 0);}}>
                                        <p className="team-kampe-p" id="seallekommende">Se alle kommende kampe</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="team-indhold" id="trup">
                        <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Trup</p>
                            <div className="team-trup-section" id="latest">
                                <div className="trup-section">
                                    <p className="trup-h1">Målmænd</p>
                                    <ul>
                                        {squadO.map((item) => {
                                            if (item.position_id === 1) {
                                                var number = item.number;
                                                var numberText = "";
                                                if (number > 0) {
                                                    numberText = number + ". ";
                                                }
                                                return (
                                                    <li key={item.player_id}>
                                                        <Link href={"/stage/spiller?id=" + item.player_id}>
                                                            <div className="bench-element">
                                                                <div className="bench-left">
                                                                    <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                    <Image width="18px" height="18px" src={logo} alt="" className="bench-img-logo" />
                                                                    <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                        <p className="bench-h1">{numberText}{item.player.data.fullname}</p>
                                                                        <p className="bench-h2">{item.player.data.nationality}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    );
                                            } else {
                                                return;
                                            }
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="trup-section">
                                    <p className="trup-h1">Forsvarsspiller</p>
                                    <ul>
                                        {squadO.map((item) => {
                                            if (item.position_id === 2) {
                                                var number = item.number;
                                                var numberText = "";
                                                if (number > 0) {
                                                    numberText = number + ". ";
                                                }
                                                return (
                                                    <li key={item.player_id}>
                                                        <Link href={"/stage/spiller?id=" + item.player_id}>
                                                            <div className="bench-element">
                                                                <div className="bench-left">
                                                                    <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                    <Image width="18px" height="18px" src={logo} alt="" className="bench-img-logo" />
                                                                    <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                        <p className="bench-h1">{numberText}{item.player.data.fullname}</p>
                                                                        <p className="bench-h2">{item.player.data.nationality}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    );
                                            } else {
                                                return;
                                            }
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="team-trup-section" id="latest">
                                <div className="trup-section">
                                    <p className="trup-h1">Midtbanespiller</p>
                                    <ul>
                                        {squadO.map((item) => {
                                            if (item.position_id === 3) {
                                                var number = item.number;
                                                var numberText = "";
                                                if (number > 0) {
                                                    numberText = number + ". ";
                                                }
                                                return (
                                                    <li key={item.player_id}>
                                                        <Link href={"/stage/spiller?id=" + item.player_id}>
                                                            <div className="bench-element">
                                                                <div className="bench-left">
                                                                    <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                    <Image width="18px" height="18px" src={logo} alt="" className="bench-img-logo" />
                                                                    <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                        <p className="bench-h1">{numberText}{item.player.data.fullname}</p>
                                                                        <p className="bench-h2">{item.player.data.nationality}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    );
                                            } else {
                                                return;
                                            }
                                            }
                                        )}
                                    </ul>
                                </div>
                                <div className="trup-section">
                                    <p className="trup-h1">Angrebsspiller</p>
                                    <ul>
                                        {squadO.map((item) => {
                                            if (item.position_id === 4) {
                                                var number = item.number;
                                                var numberText = "";
                                                if (number > 0) {
                                                    numberText = number + ". ";
                                                }
                                                return (
                                                    <li key={item.player_id}>
                                                        <Link href={"/stage/spiller?id=" + item.player_id}>
                                                            <div className="bench-element">
                                                                <div className="bench-left">
                                                                    <Image width="18px" height="18px" src={item.player.data.image_path} alt="" className="bench-img-image" />
                                                                    <Image width="18px" height="18px" src={logo} alt="" className="bench-img-logo" />
                                                                    <div className="bench-info" style={{paddingLeft: "11px"}}>
                                                                        <p className="bench-h1">{numberText}{item.player.data.fullname}</p>
                                                                        <p className="bench-h2">{item.player.data.nationality}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    );
                                            } else {
                                                return;
                                            }
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="team-indhold" id="statistikker">
                        {/* <div className="team-kampe-section" id="seneste">
                            <p className="team-kampe-h1">Statistikker</p>
                        </div> */}
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
                    </div>
                    <div className="team-indhold" id="tabel">
                        <div className="team-indhold-side">
                            <div className="team-kampe-section" style={{marginBottom: "0px"}}>
                                {getGroups()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageTeam; 