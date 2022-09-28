import {useEffect, useState} from 'react';
import FaqSite from '../components/faq';
import axios from "axios";
import jwtDecode from "jwt-decode";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { getUser } from "../services/authService";
import { getSearch } from '../services/search';
 
function Setup () {
    const router = useRouter()

    useEffect(() => {
        apiCall();
    }, [])

    const [ligasearchStr, setLigaSearchStr] = useState("");

    const [klubsearchStr, setKlubSearchStr] = useState("");

    const [gruppespilsearch, setGruppespilSearch] = useState([]);
    const [gruppespilsearchStr, setGruppespilSearchStr] = useState("");

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (gruppespilsearchStr === "") {
            setGruppespilSearch(gruppespil);
        } else {
            var dupli = gruppespil;
            var newDupli = [];
            for (var y in dupli) {
                if ((dupli[y].name.toLowerCase()).includes(gruppespilsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                } else if ((dupli[y].admin.toLowerCase()).includes(gruppespilsearchStr.toLowerCase())) {
                    newDupli.push(dupli[y]);
                }
            }
            setGruppespilSearch(newDupli);
        }
    }, [gruppespilsearchStr])

    const [gruppespil, setGruppespil] = useState([]);

    const [loading, setLoading] = useState("Indlæser...");

    useEffect(() => {
        if (loading !== "Indlæser...") {
            document.getElementById("stage-loader1").classList.remove("display");
        }
    }, [loading])

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
                    newArray.push(response.data.allGruppespil[q])
                }
            }
            setGruppespilSearch(newArray);
            setGruppespil(newArray)
            setLoading("");
        }).catch(error => {
            console.log("Fejl ved indhentning af data" + error)
        })
    }

    const [items, setItems] = useState(getSearch());

    useEffect(() => {
        var array = items;
        //Arsenal
        array.splice(items.findIndex(obj => obj.id === 19), 1);
        array.unshift({
            "name": "Arsenal",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/19/19.png",
            "type": "hold",
            "url": "/stage/team?team=9734",
            "land": "England",
            "season_id": 19734,
            "id": 19
        })

        //Chelsea
        array.splice(items.findIndex(obj => obj.id === 18), 1);
        array.unshift({
            "name": "Chelsea",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/18/18.png",
            "type": "hold",
            "url": "/stage/team?team=19734",
            "land": "England",
            "season_id": 19734,
            "id": 18
        })

        //Liverpool
        array.splice(items.findIndex(obj => obj.id === 8 && obj.type === "hold"), 1);
        array.unshift({
            "name": "Liverpool",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/8/8.png",
            "type": "hold",
            "url": "/stage/team?team=19734",
            "land": "England",
            "season_id": 19734,
            "id": 8
        })

        //Brøndby
        array.splice(items.findIndex(obj => obj.id === 293), 1);
        array.unshift({
            "name": "Brøndby",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/5/293.png",
            "type": "hold",
            "url": "/stage/team?team=19686",
            "land": "Denmark",
            "season_id": 19686,
            "id": 293
        })

        //FCK
        array.splice(items.findIndex(obj => obj.id === 85), 1);
        array.unshift({
            "name": "København",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/21/85.png",
            "type": "hold",
            "url": "/stage/team?team=19686",
            "land": "Denmark",
            "season_id": 19686,
            "id": 85
        })

        //United
        array.splice(items.findIndex(obj => obj.id === 14), 1);
        array.unshift({
            "name": "Manchester United",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/14/14.png",
            "type": "hold",
            "url": "/stage/team?team=19734",
            "land": "England",
            "season_id": 19734,
            "id": 14
        })

        //Danmark
        array.splice(items.findIndex(obj => obj.id === 18583), 1);
        array.unshift({
            "name": "Denmark",
            "logo_path": "https://cdn.sportmonks.com/images/soccer/teams/23/18583.png",
            "type": "landshold",
            "url": "/stage/team?team=19273",
            "land": "Denmark",
            "season_id": 19273,
            "id": 18583
        })
    }, [])

    function addFavorite(id, name, image, liga, type) {
        if (favorites.findIndex(obj => obj.id === id) >= 0) {
            var duppel = favorites;
            duppel.splice((favorites.findIndex(obj => obj.id === id)), 1);
            setFavorites(duppel);
            document.getElementById("klub-" + id + type).classList.remove("setup-checkbox-active");
            document.getElementById("icon-" + id + type).classList.remove("display");
        } else {
            setFavorites([...favorites, {
                "id": id,
                "name": name,
                "image": image,
                "liga": liga,
                "type": type
            }]);
            document.getElementById("klub-" + id + type).classList.add("setup-checkbox-active");
            document.getElementById("icon-" + id + type).classList.add("display");
        }
    }

    function next(index) {
        if (index === "ligaer") {
            document.getElementById("hold").classList.remove("display");
            document.getElementById("ligaer").classList.add("display");
        } else if (index === "done") {
            document.getElementById("loadingScreen").classList.remove("display-not");
            if (favorites.length > 0) {
                const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/favorit";

                const requestConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                const requestBody = {
                    "data": favorites,
                    "email": getUser().email
                }
                axios.post(signupURL, requestBody, requestConfig).then(response => {
                    console.log("AWS - Favoritter:", response);
                    router.push("/stage")
                }).catch(error => {
                    console.log(error);
                })
            } else {
                router.push("/stage")
            }
        } else if (index === "hold") {
            document.getElementById("gruppespil").classList.remove("display");
            document.getElementById("hold").classList.add("display");
        }
    }

    function pullGruppespil(id) {
        document.getElementById("pull-" + id).classList.toggle("display");
        document.getElementById("gruppespil-" + id).classList.toggle("gruppespil-active");
    }

    function tilmeld(id) {
        var activeIndex = gruppespil.findIndex(obj => obj.id === id);
        var activeGame = gruppespil[activeIndex];
        if (activeIndex >= 0) {
            console.log("INNDEE")
            var yourIndex = activeGame["players"].findIndex(obj => obj.player === getUser().email);

            var varighedDate = new Date(gruppespil[activeIndex].varighed).getTime();
            var nowDate = new Date().getTime();
    
            if ((yourIndex === -1 && varighedDate > nowDate) && getUser() ? getUser().email : "") {
                console.log(activeGame)
                const tilmeldUrl = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession";
    
                const tilmeldConfig = {
                    headers: {
                        "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                    }
                }
    
                var moneys = parseInt(activeGame["start_amount"]);
                var medlemsskab;
                var userEmail;
                var username;
                
                if (getUser() ? getUser().email : "") {
                    medlemsskab = getUser() ? getUser().rolle : "";
                    userEmail = getUser() ? getUser().email : "";
                    username = getUser() ? getUser().username : "";
                } else {
                    medlemsskab = "none";
                    userEmail = "Ukendt";
                    username = "Ukendt";
                }

                var fbLogo = "";
                if (cookie.get("fbLogin")) {
                    fbLogo = JSON.parse(cookie.get("fbLogin")).id;
                }
    
                const tilmeldBody = {
                    "tilmeldId": activeGame["id"],
                    "updateItValue": {
                        "player": userEmail,
                        "username": username,
                        "fb_logo_id": fbLogo,
                        "info": {
                            "money": moneys,
                            "notifikationer": [],
                            "medlemsskab": medlemsskab
                        }, 
                        "odds": []
                    }
                }
    
                axios.patch(tilmeldUrl, tilmeldBody, tilmeldConfig).then(response => {
                    console.log("AWS - Gruppespil:", response);
                    next("hold")
                    cookie.set("activeGame", activeGame["id"], {expires: 24});
                    localStorage.setItem("activeGame", activeGame["id"]);
                    localStorage.setItem("playerIndex", response.data.Item.Attributes.players.findIndex(obj => obj.player === getUser().email));
                }).catch(error => {
                    console.log(error);
                })
            } else {
                if (yourIndex !== -1) {
                    setNotiMessage("error", "Deltager allerede", "Det ser ud til, at du allerede deltager i dette gruppespil.");
                } else if (varighedDate < nowDate) {
                    setNotiMessage("error", "Gruppespil slut", "Gruppespil er desværre allerede færdiggjort");
                } else if (!getUser() ? getUser().email : "") {
                    router.push("/signup")
                }
            }
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

    return (
        <>
            <Head>
                <title>Hurtig opsætning - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="main-loader display-not" id="loadingScreen"><div className="main-site-loader"></div></div>
            <div className="setup-container">
                <div className="setup-content">
                    <div className={messageType} id="errorCon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="triangle" viewBox="0 0 16 16" id="errorIcon">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div className="error-text">
                            <p className="error-container-h1" id="errorConH">Ingen væddemål</p>
                            <p className="error-container-p" id="errorConP">Du har ikke placeret nogle væddemål. Placer ét eller flere væddemål, for at lave din kuppon.</p>
                        </div>
                    </div>
                    <div className="setup-text">
                        <div className="setup-top">
                            <div className="setup-divider"></div>
                            <h2 className="setup-h2">Hurtig opsætning</h2>
                        </div>
                    </div>
                    <div className="setup-wrapper display" id="gruppespil">
                        <h1 className="setup-h1">Vælg dit første gruppespil</h1>
                        <div className="setup-element">
                            <div className="setup-search">
                                <input type="text" placeholder="Søg i gruppespil" className="setup-input" onChange={event => setGruppespilSearchStr(event.target.value)} />
                            </div>
                            <div className="td-wrapper" style={{paddingTop: "15px"}}>
                                <div className="td-modifier">
                                    <p className="td-modifier-p modifier-mod" id="td-navn">NAVN</p>
                                    <p className="td-modifier-p modifier-mod" id="td-synlighed">SYNLIGHED</p>
                                    <p className="td-modifier-p modifier-mod" id="td-spillere">SPILLERE</p>
                                    <p className="td-modifier-p modifier-mod" id="td-admin">ADMINISTRATOR</p>
                                </div>
                                <div className="match-loader display" id="stage-loader1"></div>
                                <ul className="td-table">
                                    {gruppespilsearch.map((item) => {
                                        return (
                                            <li key={item.id} className="tl-element" id={"gruppespil-" + item.id} style={{flexDirection: "column", alignItems: "flex-start", paddingLeft: "20px"}} onClick={() => {pullGruppespil(item.id)}}>
                                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                                    <div className="tl-wrapper" id="td-navn">
                                                        <div className="tl-img">
                                                            {item.name.slice(0,1)}
                                                        </div>
                                                        <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                                    </div>
                                                    <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                                    <p className="td-modifier-p" id="td-spillere">{item.players.length}</p>
                                                    <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                                </div>
                                                <div className="setup-hit-pull" id={"pull-" + item.id}>
                                                    <div className="pull-stats">
                                                        <div className="pull-stat">
                                                            <p className="pull-h1">{item.players.length}</p>
                                                            <div className="pull-stat-bottom">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                                </svg>
                                                                <p className="pull-stat-p">Tilmeldte</p>
                                                            </div>
                                                        </div>
                                                        <div className="pull-stat">
                                                            <p className="pull-h1">{item.admin}</p>
                                                            <div className="pull-stat-bottom">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                                </svg>
                                                                <p className="pull-stat-p">Administrator</p>
                                                            </div>
                                                        </div>
                                                        <div className="pull-stat">
                                                            <p className="pull-h1">{item.varighed}</p>
                                                            <div className="pull-stat-bottom">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                                                </svg>
                                                                <p className="pull-stat-p">Slutdato</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="setup-hit-p" style={{paddingBottom: "5px"}}>Tilmeldte</p>
                                                    <ul className="pull-tilmeldte">
                                                        {item.players.map((player) => {
                                                            return (
                                                                <li key={player.player} className="tilmeldte-element">
                                                                    <div className="tilmeldte-pb">
                                                                        {!player.fb_logo_id && <>{player.username !== "" && <>{(player.username).slice(0,1)}</>}</>}
                                                                        {player.fb_logo_id && <Image src={"http://graph.facebook.com/"+player.fb_logo_id+"/picture?type=square"} layout="fill" />}
                                                                    </div>
                                                                    <div className="tilmeldte-wrapper">
                                                                        <p className="setup-p">{player.username}</p>
                                                                        <p className="setup-pp">{player.player}</p>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    <div className="pull-cta">
                                                        <button className="setup-btn" onClick={() => {tilmeld(item.id)}}>Tilmeld</button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            {/* <div className="setup-hit-wrapper">
                                <div className="setup-inline" id="setup-1">
                                    <p className="setup-p-fat">NAVN</p>
                                </div>
                                <div className="setup-hit-wrapper" style={{justifyContent: "flex-end"}}>
                                    <div className="setup-inline" id="setup-2">
                                        <p className="setup-p">SPILLERE</p>
                                    </div>
                                    <div className="setup-inline" id="setup-3">
                                        <p className="setup-p">ADMIN</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="setup-hits" style={{maxHeight: "600px"}}>
                                <div className="match-loader display" id="stage-loader1"></div>
                                {gruppespilsearch.map((item) => {
                                    return (
                                        <li key={item.id} className="setup-hit" id={"gruppespil-" + item.id} style={{flexDirection: "column", alignItems: "flex-start", paddingLeft: "20px"}} onClick={() => {pullGruppespil(item.id)}}>
                                            <div className="setup-hit-wrapper">
                                                <div className="setup-inline" id="setup-1">
                                                    <p className="setup-p-fat">{item.name}</p>
                                                </div>
                                                <div className="setup-hit-wrapper" style={{justifyContent: "flex-end"}}>
                                                    <div className="setup-inline" id="setup-2">
                                                        <p className="setup-p">{item.players.length}</p>
                                                    </div>
                                                    <div className="setup-inline" id="setup-3">
                                                        <p className="setup-p">{item.admin}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="setup-hit-pull" id={"pull-" + item.id}>
                                                <div className="pull-stats">
                                                    <div className="pull-stat">
                                                        <p className="pull-h1">{item.players.length}</p>
                                                        <div className="pull-stat-bottom">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                                            </svg>
                                                            <p className="pull-stat-p">Tilmeldte</p>
                                                        </div>
                                                    </div>
                                                    <div className="pull-stat">
                                                        <p className="pull-h1">{item.admin}</p>
                                                        <div className="pull-stat-bottom">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                                            </svg>
                                                            <p className="pull-stat-p">Administrator</p>
                                                        </div>
                                                    </div>
                                                    <div className="pull-stat">
                                                        <p className="pull-h1">{item.varighed}</p>
                                                        <div className="pull-stat-bottom">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="pull-icon" viewBox="0 0 16 16">
                                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                                            </svg>
                                                            <p className="pull-stat-p">Slutdato</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="setup-hit-p" style={{paddingBottom: "5px"}}>Tilmeldte</p>
                                                <ul className="pull-tilmeldte">
                                                    {item.players.map((player) => {
                                                        return (
                                                            <li key={player.player} className="tilmeldte-element">
                                                                <div className="tilmeldte-pb">{player.username !== "" && <>{(player.username).slice(0,1)}</>}</div>
                                                                <div className="tilmeldte-wrapper">
                                                                    <p className="setup-p">{player.username}</p>
                                                                    <p className="setup-pp">{player.player}</p>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                                <div className="pull-cta">
                                                    <button className="setup-btn" onClick={() => {tilmeld(item.id)}}>Tilmeld</button>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul> */}
                        </div>
                        <div className="setup-cta">
                            <Link href="/stage"><a className="nav-btn-outline">Forlad opsætning</a></Link>
                            <button className="setup-btn" id="tilmeldNext" onClick={() => {next("hold")}}>Spring gruppespil over</button>
                        </div>
                        <div className="setup-mobile-cta">
                            <button className="main-btn-default" style={{width: "100%", borderRadius: "300px", padding: "12px 0px", backgroundColor: "var(--third)", color: "var(--primary)"}} onClick={() => {next("hold")}}>Spring over</button>
                        </div>
                    </div>
                    <div className="setup-wrapper" id="hold">
                        <h1 className="setup-h1">Vælg dine favorithold</h1>
                        <div className="setup-element">
                            <div className="setup-search">
                                <input type="text" placeholder="Søg" className="setup-input" onChange={event => setKlubSearchStr(event.target.value)} />
                            </div>
                            <ul className="setup-hits">
                                {items.map((item) => {
                                    if (item.type === "hold" || item.type === "landshold") {
                                        if (klubsearchStr === "") {
                                            if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox">
                                                            <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        } else {
                                            if ((item.name.toLowerCase()).includes(klubsearchStr.toLowerCase())) {
                                                if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox" >
                                                                <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            }
                                        }
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="setup-cta">
                            <Link href="/stage"><a className="nav-btn-outline">Forlad opsætning</a></Link>
                            <button className="setup-btn" onClick={() => {next("ligaer")}}>Fortsæt</button>
                        </div>
                        <div className="setup-mobile-cta">
                            <button className="main-btn-default" style={{width: "100%", borderRadius: "300px", padding: "12px 0px"}} onClick={() => {next("ligaer")}}>Fortsæt</button>
                        </div>
                    </div>
                    <div className="setup-wrapper" id="ligaer">
                        <h1 className="setup-h1">Vælg dine favorit ligaer</h1>
                        <div className="setup-element">
                            <div className="setup-search">
                                <input type="text" placeholder="Søg" className="setup-input" onChange={event => setLigaSearchStr(event.target.value)} />
                            </div>
                            <ul className="setup-hits">
                                {items.map((item) => {
                                    if (item.type === "liga") {
                                        if (ligasearchStr === "") {
                                            if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                        <button id={"klub-" + item.id + item.type} className="setup-checkbox" >
                                                            <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                            </svg>
                                                        </button>
                                                        <div className="setup-hit-wrapper">
                                                            <div className="setup-img">
                                                                <Image layout="fill" src={item.logo_path} />
                                                            </div>
                                                            <p className="setup-p">{item.name}</p>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        } else {
                                            if ((item.name.toLowerCase()).includes(ligasearchStr.toLowerCase())) {
                                                if (favorites.findIndex(obj => obj.id === item.id && obj.type === item.type) >= 0) {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox setup-checkbox-active">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.id + item.type} className="setup-icon display" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.liga, item.type)}}>
                                                            <button id={"klub-" + item.id + item.type} className="setup-checkbox" >
                                                                <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.id + item.type} className="setup-icon" viewBox="0 0 16 16">
                                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                                </svg>
                                                            </button>
                                                            <div className="setup-hit-wrapper">
                                                                <div className="setup-img">
                                                                    <Image layout="fill" src={item.logo_path} />
                                                                </div>
                                                                <p className="setup-p">{item.name}</p>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            }
                                        }
                                    }
                                })}
                            </ul>
                        </div>
                        <div className="setup-cta">
                            <button className="setup-btn" onClick={() => {next("done")}}>Afslut opsætning</button>
                        </div>
                        <div className="setup-mobile-cta">
                            <button className="main-btn-default" style={{width: "100%", borderRadius: "300px", padding: "12px 0px"}} onClick={() => {next("done")}}>Afslut opsætning</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ res, req }) {
    const sendRedirectLocation = (location) => {
        res.writeHead(302, {
            Location: location,
        });
        res.end();
        return { props: {} };
    };
    if (!req.cookies.auth) {
        sendRedirectLocation('/signup')
    }
    return {
        props: { },
    }
}
 
export default Setup;