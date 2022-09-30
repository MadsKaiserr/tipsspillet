import * as React from 'react';
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from './layout/header';
import Link from 'next/link'
import axios from "axios";
import Spacer from './components/spacer';
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { getUser } from "./services/authService";
import Back from './components/back';
 
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
    const [gameId, setGameId] = useState("");

    const [forbrug, setForbrug] = useState(0);
    const [winRate, setWinRate] = useState(0);

    function getPlayer(player) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (cookie.get("auth")) {
            window.open("/stage/gruppespil/spiller?spiller="+player+"&game="+urlParams.get('game'), "_self")
        } else {
            window.open("/signup", "_self")
        }
    }

    useEffect(() => {
        console.log("AWS - Gruppesession:", data)
        setActiveGame(data);
        setGameName(data.name);
        setGamePlayers(data.players.length);
        setGameStart(data.start_amount + " kr.");
        setSynlighed(data.synlighed);
        setVarighed(data.varighed);
        setStartAm(data.start_amount);
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var GetgameId = urlParams.get("game");
        setGameId(GetgameId);

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

        var startValue = parseInt(data.start_amount);
        var gevinstVar = 0;
        var antalKuponer = 0;
        var antalVundet = 0;
        var getForbrug = 0;
        for (var i in data.players) {
            var kapital = data.players[i].info.money;
            gevinstVar = gevinstVar + (kapital - startValue);

            var playerKuponer = data.players[i].odds.length;
            antalKuponer = antalKuponer + playerKuponer;
            var finalKuponer = antalKuponer + "";
            if (data.players[i].player === getUser() ? getUser().rolle : "") {
                localStorage.setItem("notifikationer", data.players[i].info.notifikationer.length);
            }
            for (var q in data.players[i].odds) {
                if (data.players[i].odds[q].vundet === 2) {
                    antalVundet = antalVundet + 1;
                }
                getForbrug = getForbrug + data.players[i].odds[q].indsats;
            }
        }
        setWinRate((antalVundet/antalKuponer)*100)
        setKuponer(finalKuponer);
        setForbrug(getForbrug);
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
                    console.log("AWS - Gruppespil:", response)
                    cookie.set("activeGame", activeGame["id"], {expires: 24});
                    localStorage.setItem("activeGame", activeGame["id"]);
                    localStorage.setItem("playerIndex", response.data.Item.Attributes.players.findIndex(obj => obj.player === getUser().email));
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

    function opretHandler() {
        if (getUser()) {
            if (getUser().rolle !== "none") {
                window.open("/stage/opret", "_self");
            } else {
                window.open("/priser", "_self");
            }
        } else {
            window.open("/signup", "_self");
        }
    }

    return (
        <>
            <Head>
                <title>Gruppespil - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header />
            <Spacer />
            <div className="gs-container">
                <Back />
                <div className="gs-wrapper">
                    {synlighed === "dyst" && <>
                        <div className="gruppespil-section" style={{justifyContent: "center", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                            <h1 className="gs-main-h1">{gameName}</h1>
                            <div className="gruppespil-info-info" style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "30px"}}>
                                <div className="gruppespil-info-element" style={{width: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0px"}}>
                                    <p className="gruppespil-info-element-p">Startbeløb</p>
                                    <p className="gruppespil-info-element-h1">{gameStart}</p>
                                </div>
                                <div className="gruppespil-info-element" style={{width: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0px"}}>
                                    <p className="gruppespil-info-element-p">Spillere</p>
                                    <p className="gruppespil-info-element-h1">{gamePlayers}</p>
                                </div>
                                <div className="gruppespil-info-element" style={{width: "100px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", margin: "0px"}}>
                                    <p className="gruppespil-info-element-p">Antal Kuponer</p>
                                    <p className="gruppespil-info-element-h1">{kuponer}</p>
                                </div>
                            </div>
                            <button className="gruppeinvite-btn" onClick={() => {tilmeld()}}>Tilmeld</button>
                        </div>
                        <div className="gruppespil-section" style={{border: "0px", marginTop: "20px", justifyContent: "center", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
                            <div className="top-container">
                                <div className="top-element">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Andenplads</p>
                                    <p className="top-h2">3 mdr. Premium abonnemnet</p>
                                </div>
                                <div className="top-element-big">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Førsteplads</p>
                                    <p className="top-h2">Gavekort til Intersport - 300 kr.</p>
                                </div>
                                <div className="top-element">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Tredjeplads</p>
                                    <p className="top-h2">1 måned plus abonnement</p>
                                </div>
                            </div>
                            <div className="top-container-mobile">
                                <div className="top-element">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Førsteplads</p>
                                    <p className="top-h2">Gavekort til Intersport - 300 kr.</p>
                                </div>
                                <div className="top-element">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Andenplads</p>
                                    <p className="top-h2">3 mdr. Premium abonnemnet</p>
                                </div>
                                <div className="top-element">
                                    <div className="top-img"></div>
                                    <p className="top-h1">Tredjeplads</p>
                                    <p className="top-h2">1 måned plus abonnement</p>
                                </div>
                            </div>
                        </div>
                    </>}
                    <div className="gruppespil-section" style={{border: "0px", marginTop: "20px"}}>
                        <h2 className="gs-h1">{gameName}</h2>
                        <h3 className="gs-h3"><p className="gs-h3-span">{synlighed === "dyst" && <>Præmiedyst</>}{synlighed !== "dyst" && <>{synlighed}</>}</p><div className="gs-h3-divider"></div><p className="gs-h3-span">Pulje</p></h3>
                        <div className="gruppespil-info" style={{paddingTop: "30px"}}>
                            <div className="ant-container">
                                <div className="ant-element">
                                    <div className="ant-visual">
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "20%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "35%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "50%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "80%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "100%"}}></div>
                                        </div>
                                    </div>
                                    <div className="ant-info">
                                        <p className="ant-h2">Antal kuponer</p>
                                        <div className="ant-info-price">
                                            <p className="ant-h1">{kuponer}</p>
                                        </div>
                                        <p className="ant-p">Samlet antal <span className="ant-p-a">kuponer</span> fra gruppespillets <br />medlemmer</p>
                                    </div>
                                </div>
                                <div className="ant-element">
                                    <div className="ant-visual">
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar-red" style={{height: "60%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar-red" style={{height: "70%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar-red" style={{height: "50%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar-red" style={{height: "30%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar-red" style={{height: "15%"}}></div>
                                        </div>
                                    </div>
                                    <div className="ant-info">
                                        <p className="ant-h2">Samlet forbrug</p>
                                        <div className="ant-info-price">
                                            <p className="ant-h1">{forbrug} kr.</p>
                                        </div>
                                        <p className="ant-p">Samlet <span className="ant-p-a">forbrug</span> fra gruppespillets <br />medlemmer</p>
                                    </div>
                                </div>
                                <div className="ant-element">
                                    <div className="ant-visual">
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "20%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "35%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "50%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "80%"}}></div>
                                        </div>
                                        <div className="ant-visual-element">
                                            <div className="ant-visual-bar" style={{height: "100%"}}></div>
                                        </div>
                                    </div>
                                    <div className="ant-info">
                                        <p className="ant-h2">Gevinst rate</p>
                                        <div className="ant-info-price">
                                            <p className="ant-h1">{winRate}%</p>
                                        </div>
                                        <p className="ant-p">Andel af <span className="ant-p-a">kuponer</span> som er vundet af <br />medlemmerne</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gruppespil-info">
                            <div className="gruppespil-title">
                                <h2 className="gs-h2">Spildeltagere</h2>
                                <p className="gs-h4">Klik for at se mere info</p>
                            </div>
                            <div className="tabel-top" style={{padding: "10px 5px", marginTop: "10px"}}>
                                <div className="tabel-top-right">
                                    <div className="tabel-ends">
                                        <p className="tabel-h1" id="gs-pos"></p>
                                        <p className="tabel-h1" id="gs-navn">Navn</p>
                                    </div>
                                </div>
                                <div className="tabel-top-right">
                                    <div className="tabel-ends">
                                        <p className="tabel-h1" id="gs-kuponer">Væddemål</p>
                                        <p className="tabel-h1" id="gs-kapital">Kapital</p>
                                        <p className="tabel-h1" id="gs-aktive">Aktive væddemål</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tabel-container">
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

                                        var aktive = 0;
                                        for (var w in item.odds) {
                                            if (item.odds[w].calculated === "false") {
                                                aktive = aktive + 1;
                                            }
                                        }

                                        return (
                                            <li key={item.player}>
                                                <div className={"tabel-element"} style={{borderLeft: "4px solid var(--primary)", padding: "10px 1px"}} onClick={() => getPlayer(item.player)}>
                                                    <div className="tabel-top-right">
                                                        <div className="tabel-ends">
                                                            <p className="tabel-p" id="gs-pos" style={{textAlign: "center"}}>{index + 1}</p>
                                                            <p className="tabel-h1" id="gs-navn">{item.username && <>{item.username}</>}</p>
                                                        </div>
                                                    </div>
                                                    <div className="tabel-top-right">
                                                        <div className="tabel-ends">
                                                            <p className="tabel-p" id="gs-kuponer">{item.odds.length}</p>
                                                            <p className="tabel-p" id="gs-kapital">{profitHtml && <>{profitHtml}</>}</p>
                                                            <p className="tabel-p" id="gs-aktive">{aktive && <>{aktive}</>}</p>
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
                        <div className="gruppespil-info">
                            <div className="gruppespil-title">
                                <h2 className="gs-h2">Inviter venner</h2>
                                <p className="gs-h4">Klik for at kopiere</p>
                            </div>
                            <div className="inv-container">
                                <div className="inv-element-a" onClick={() => {navigator.clipboard.writeText("https://www.tipsspillet.dk/gruppesession?game=" + activeGame + "&type=invite"); document.getElementById("copied").classList.remove("display-not"); setTimeout(function (){
                                    document.getElementById("copied").classList.add("display-not")
                                }, 1000);}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="var(--primary)" viewBox="0 0 16 16">
                                        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                                    </svg>
                                    <p className="inv-p-a">{gameId}</p>
                                    <div className="invite-copied display-not" id="copied">Kopieret</div>
                                </div>
                                <div className="inv-element">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="var(--softBlack)" viewBox="0 0 16 16">
                                        <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                    </svg>
                                    <p className="inv-p">Del invitationslink</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gruppespil-section" style={{border: "0px", marginTop: "20px"}}>
                        <h1 className="gs-h1">Lav dit eget gruppespil</h1>
                        <h3 className="gs-h3"><p className="gs-h3-span">Deltag gratis</p><div className="gs-h3-divider"></div><p className="gs-h3-span">Opret gruppespil med Plus eller Premium</p></h3>
                        <p className="find-h1" style={{paddingTop: "15px"}}>Opret et gruppespil</p>
                            <p className="find-p">Opret dit eget gruppespil, og inviter familie og venner til kamp.</p>
                        <button className="find-btn" onClick={() => {opretHandler()}}>Opret gruppespil</button>
                        <div className="td-divider">
                            <div className="td-line"></div>
                                <p className="td-or">Eller</p>
                            <div className="td-line"></div>
                        </div>
                        <p className="find-h1">Find nye gruppespil</p>
                        <p className="find-p">Tilmeld dig offentlige eller private gruppespil, og spil mod familie og venner.</p>
                        <Link href="/gruppespil"><button className="find-btn">Find gruppespil</button></Link>
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
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
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