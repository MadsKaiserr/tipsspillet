import { useState, useEffect } from 'react';
import axios from "axios";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { getKupon, getString } from "../services/algo.js";
import StageHeader from '../layout/stageheader';
import Height from '../components/height';
import { getUser } from "../services/authService";
import cookie from 'js-cookie'
 
function StageNotifikationer () {

    const [items, setItems] = useState([]);

    const [loadingText, setLoadingText] = useState("Indlæser...");
    const [errorText, setErrorText] = useState("Der blev ikke fundet nogle notifikationer...")

    useEffect(() => {
        if (cookie.get("activeGame") && cookie.get("activeGame") !== "") {
            var activeGame = cookie.get("activeGame");
            const URL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/gruppesession?game=" + activeGame;
    
            const requestConfigen = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
            axios.get(URL, requestConfigen).then(response => {
                console.log("AWS - Notifikationer:", response);
                for (var i in response.data.players) {
                    if (response.data.players[i].player === getUser().email) {
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

    const [nav, setNav] = useState("generelt");

    return (
        <>
            <Head>
                <title>Notifikationer - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="op-container" style={{background: "var(--surface)"}}>
                {nav === "generelt" && <div className="op-content">
                    <p className="op-h1">Notifikationer</p>
                    <p className="op-h2">Aktive gruppespils notifikationer</p>
                    <div className="nt-content">
                        <div className="match-loader display" id="stage-loader1"></div>
                        {items.slice(0).reverse().map(noti => {
                            return (
                                <li key={noti.id}>
                                    <div className="noti-section">
                                        <div className="noti-left">
                                            {noti.type === "bet_place" && <><p className="noti-sec-h1">Du har placeret en kupon</p>
                                            <p className="noti-sec-p">Du har gennemført et køb af en kupon med en potentiel udbetaling på <span className="noti-span">{parseInt(noti.indsats * noti.fullProb)} kr.</span></p></>}
                                            {noti.type === "bet_won" && <><p className="noti-sec-h1">Du har <span style={{color: "var(--green)"}}>vundet</span> en kupon</p>
                                            <p className="noti-sec-p">Du har vundet følgende kupon, og modtaget en udbetaling på <span className="noti-span">{noti.udbetaling} kr.</span></p></>}
                                            {noti.type === "bet_lose" && <><p className="noti-sec-h1">Du har <span style={{color: "var(--red)"}}>tabt</span> en kupon</p>
                                            <p className="noti-sec-p">Du har tabt følgende kupon med <span className="noti-span">{noti.odds} væddemål.</span></p></>}
                                            <p className="noti-sec-dato">{new Date(noti.date).getDate().toString().padStart(2, '0') + "/" + (new Date(noti.date).getMonth() + 1).toString().padStart(2, '0') + " - " + new Date(noti.date).getHours().toString().padStart(2, '0') + ":" + new Date(noti.date).getMinutes().toString().padStart(2, '0')}</p>
                                        </div>
                                        <ul>
                                            {noti.kupon.map((item) => {
                                                var randomNumber = Math.floor(Math.random() * 512);
                                                var randomId = new Date().getTime()+"-"+randomNumber;
                                                return (
                                                    <li key={item.id + "-" + randomId} className="gruppespil-li">
                                                        <div className="gruppespil-kupon">
                                                            <div className="kupon-top">
                                                                <p className="kupon-header-p">{item.type}</p>
                                                            </div>
                                                            <ul>
                                                                {item.bets.map((element) => {
                                                                    var randomNumber = Math.floor(Math.random() * 512);
                                                                    var randomId = new Date().getTime()+"-"+randomNumber;
                                                                    return (
                                                                        <li key={randomId} className="display">
                                                                            <Link href={"/stage/match?game=" + element.game}>
                                                                                <div className="kupon-container">
                                                                                    <div className="kupon-divider-first"></div>
                                                                                    <div className="bet-top">
                                                                                        <p className="kupon-top-p">Dit væddemål</p>
                                                                                        <p className="kupon-top-p">{new Date(element.bet_date*1000).getDate().toString().padStart(2, '0') + "/" + (new Date(element.bet_date*1000).getMonth() + 1).toString().padStart(2, '0') + " - " + new Date(element.bet_date*1000).getHours().toString().padStart(2, '0') + ":" + new Date(element.bet_date*1000).getMinutes().toString().padStart(2, '0')}</p>
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
                                                                        {noti.type === "bet_place" &&  <p className="kupon-confirm-p">Potentiel udbetaling:</p>}
                                                                        {noti.type === "bet_won" &&  <p className="kupon-confirm-p"><span style={{color: "var(--green)", fontWeight: "500"}}>Vundet</span> udbetaling:</p>}
                                                                        {noti.type === "bet_lose" &&  <p className="kupon-confirm-p"><span style={{color: "var(--red)", fontWeight: "500"}}>Tabt</span> udbetaling:</p>}
                                                                        <p className="kupon-confirm-h1">{(item.indsats * item.fullProb).toFixed(2)} kr.</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })}
                    </div>
                </div>}
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
 
export default StageNotifikationer;