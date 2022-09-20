import * as React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from './layout/header';
import Link from 'next/link'
import axios from "axios";
import jwtDecode from "jwt-decode";
import Height from './components/height';
import cookie from 'js-cookie'
import Router, { useRouter } from 'next/router'
import { getUser } from "./services/authService";
 
function Gruppesession ({data}) {
    const router = useRouter()
    const [tableArray, setTableArray] = useState([]);

    const [activeGame, setActiveGame] = useState([]);

    const [varighed, setVarighed] = useState("0");
    const [gameName, setGameName] = useState("Indlæser...");
    const [gamePlayers, setGamePlayers] = useState("Indlæser...");
    const [gameStart, setGameStart] = useState("Indlæser...");
    const [kuponer, setKuponer] = useState("Indlæser...");
    const [synlighed, setSynlighed] = useState("");
    const [startAm, setStartAm] = useState(0);

    useEffect(() => {
        console.log("AWS - Gruppesession:", data)
        setActiveGame(data);
        setGameName(data.name);
        setGamePlayers(data.players.length);
        setGameStart(data.start_amount + " kr.");
        setSynlighed(data.synlighed);
        setVarighed(data.varighed);
        setStartAm(data.start_amount);

        function getTopN(arr, n) {
            var clone = arr.slice(0);
            clone.sort(function(x, y) {
                if (x.info.money === y.info.money) return 0;
                else if (parseInt(x.info.money) < parseInt(y.info.money)) return 1;
                else return -1;
            });
            return clone.slice(0, n);
        }

        var n = data.players.length;
        var topScorers = getTopN(data.players, n);
        topScorers.forEach(function(item) {
            setTableArray(tableArray => [...tableArray, item]);
        });
        for (var u in data.players) {
            if (data.players[u].player === getUser() ? getUser().email : "") {
                if (data.players[u].player === getUser() ? getUser().email : "") {
                    localStorage.setItem("notifikationer", data.players[u].info.notifikationer.length);
                }
            }
        }

        var startValue = parseInt(data.start_amount);
        var gevinstVar = 0;
        var antalKuponer = 0;
        for (var i in data.players) {
            var kapital = data.players[i].info.money;
            gevinstVar = gevinstVar + (kapital - startValue);

            var playerKuponer = data.players[i].odds.length;
            antalKuponer = antalKuponer + playerKuponer;
            var finalKuponer = antalKuponer + "";
            if (data.players[i].player === getUser() ? getUser().rolle : "") {
                localStorage.setItem("notifikationer", data.players[i].info.notifikationer.length);
            }
        }
        setKuponer(finalKuponer);
    }, [])

    function tilmeld() {
        if (getUser()) {
            var yourIndex = activeGame["players"].findIndex(obj => obj.player === getUser().email);

            var varighedDate = new Date(varighed).getTime();
            var nowDate = new Date().getTime();
    
            if ((yourIndex === -1 && varighedDate > nowDate) && getUser().rolle) {
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
                
                if (getUser() ? getUser().rolle : "") {
                    medlemsskab = getUser() ? getUser().rolle : "";
                    userEmail = getUser() ? getUser().email : "";
                    username = getUser() ? getUser().username : "";
                } else {
                    medlemsskab = "none";
                    userEmail = "Ukendt";
                    username = "Ukendt";
                }
    
                const tilmeldBody = {
                    "tilmeldId": activeGame["id"],
                    "updateItValue": {
                        "player": userEmail,
                        "username": username,
                        "info": {
                            "money": moneys,
                            "notifikationer": [],
                            "medlemsskab": medlemsskab
                        }, 
                        "odds": []
                    }
                }
    
                axios.patch(tilmeldUrl, tilmeldBody, tilmeldConfig).then(response => {
                    console.log("AWS - Gruppespil:", response)
                    cookie.set("activeGame", activeGame["id"], {expires: 24});
                    localStorage.setItem("activeGame", activeGame["id"]);
                    localStorage.setItem("playerIndex", response.data.Item.Attributes.players.findIndex(obj => obj.player === getUser() ? getUser().email : ""));
                    router.push("/stage");
                }).catch(error => {
                    console.log(error);
                })
            } else {
                if (yourIndex !== -1) {
                    setNotiMessage("error", "Deltager allerede", "Det ser ud til, at du allerede deltager i dette gruppespil.");
                } else if (varighedDate < nowDate) {
                    setNotiMessage("error", "Gruppespil slut", "Gruppespil er desværre allerede færdiggjort");
                } else if (!getUser().rolle) {
                    router.push("/signup");
                }
            }
        } else {
            router.push("/signup");
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
                <title>Gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <Height />
            <div className="gruppespil-container">
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
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">{gameName && <>{gameName}</>}</h1>
                            <button className="gruppesession-btn">INVITATION</button>
                            <p className="gruppespil-p">Du er blevet inviteret til {gameName && <>{gameName}</>}. For at tilmelde dig gruppespillet, skal du klikke på &quot;Tilmeld&quot; nedenfor.</p>
                        </div>
                        <div className="gruppeinvite">
                            <div className="gruppeinvite-info">
                                <p className="gruppeinvite-p">ANTAL SPILLERE</p>
                                <p className="gruppeinvite-h1">{gamePlayers && <>{gamePlayers}</>}</p>
                            </div>
                            <div className="gruppeinvite-info">
                                <p className="gruppeinvite-p">STARTBELØB</p>
                                <p className="gruppeinvite-h1">{gameStart && <>{gameStart}</>}</p>
                            </div>
                            <div className="gruppeinvite-info">
                                <p className="gruppeinvite-p">ANTAL KUPONER</p>
                                <p className="gruppeinvite-h1">{kuponer && <>{kuponer}</>}</p>
                            </div><br />
                            <button className="gruppeinvite-btn" onClick={() => {tilmeld()}}>TILMELD</button>
                        </div>
                    </div>
                    <div className="gruppespil-info">
                        <div className="gruppespil-title">
                            <h1 className="gruppespil-h1">Spildeltagere</h1>
                        </div>
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
                                    if (item.player === getUser() ? getUser().email : "") {
                                        showMe = " gruppespil-row-active";
                                    }

                                    const queryString = window.location.search;
                                    const urlParams = new URLSearchParams(queryString);

                                    return (
                                        <li key={item.player}>
                                            <Link href={"/stage/gruppespil/spiller?spiller="+item.player+"&game="+urlParams.get('game')}>
                                                <div className={"gruppespil-table-row"+showMe}>
                                                    <p className="gruppespil-table-place gruppetable-place">{index + 1}</p>
                                                    <div className={medlemsskab}></div>
                                                    <p className="gruppespil-table-h1 gruppetable-el-navn">{item.username && <>{item.username}</>}</p>
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-anv-data">{item.odds.length}</p>
                                                    {profitHtml && <>{profitHtml}</>}
                                                    <p className="gruppespil-table-p gruppetable-number" id="table-av-data">{aktive && <>{aktive}</>}</p>
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
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    const category = query.game;
    const requestConfig = {
        headers: {
            "x-api-key": process.env."utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        }
    }
    var resp;
    var data = {};
    if (category) {
        resp = await axios.get("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + category, requestConfig);
        var data = resp.data;
    }
    if (!data) {
        return {
          notFound: true,
        }
    }
    return {
        props: { data },
    }
}
 
export default Gruppesession;