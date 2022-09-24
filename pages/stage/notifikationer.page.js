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

    // function getNoti() {
    //     return (
    //         <ul className="ntd-content">
    //             {items.slice(0).reverse().map(noti => {
    //                 var dato_string = "";
    //                 var dato_time_string = "";
    //                 var dato_day;
    //                 var dato_month;
    //                 var dato_year;

    //                 var dato_minutes;
    //                 var dato_hours;
    //                 if (noti.date !== undefined) {
    //                     dato_minutes = new Date(noti.date).getMinutes();
    //                     dato_hours = new Date(noti.date).getHours();
    //                     dato_time_string = dato_hours + ":" + dato_minutes;

    //                     var today_day = new Date().getDate();
    //                     var today_month = new Date().getMonth();
    //                     var today_year = new Date().getFullYear();
    //                     dato_day = new Date(noti.date).getDate();
    //                     dato_month = new Date(noti.date).getMonth();
    //                     dato_year = new Date(noti.date).getFullYear();
    //                     if (today_day === dato_day && today_month === dato_month && today_year === dato_year) {
    //                         dato_string = "I dag, " + dato_time_string;
    //                     } else if ((today_day - 1) === dato_day && today_month === dato_month && today_year === dato_year) {
    //                         dato_string = "I går, " + dato_time_string;
    //                     } else if ((today_day - 2) === dato_day && today_month === dato_month && today_year === dato_year) {
    //                         dato_string = "I forgårs, " + dato_time_string;
    //                     } else {
    //                         dato_string = dato_day + "/" + dato_month + " - " + dato_time_string;
    //                     }
    //                 }

    //                 return (
    //                     <li className="ntd-element-active" key={noti.id}>
    //                         <p className="ntd-element-h1">{noti.h1}</p>
    //                         <p className="ntd-element-p">{dato_string} - {noti.sender}</p>
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     );
    // }

    return (
        <>
        <Head>
            <title>Notifikationer - Tipsspillet</title>
            <meta name="robots" content="noindex" />
        </Head>
        <StageHeader />
        <Height />
            <div className="noti-main">
                <div className="ntd-top">
                    <div className="ntd-text">
                        <p className="ntd-h1">Notifikationer</p>
                        <p className="ntd-a">Alle læst</p>
                    </div>
                    <div className="ntd-nav">
                        <div className="ntd-nav-elements">
                            <p className="ntd-nav-element-active">Profil</p>
                            <p className="ntd-nav-element">Gruppespil</p>
                            <p className="ntd-nav-element">Arkiv</p>
                        </div>
                        <Link href="/stage/indstillinger">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{cursor: "pointer"}} width="14px" height="14px" fill="var(--softBlack)" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="spil-loader display" id="stage-loader1"></div>
                <ul className="ntd-content">
                    {items.slice(0).reverse().map(noti => {
                        var dato_string = "";
                        var dato_time_string = "";
                        var dato_day;
                        var dato_month;
                        var dato_year;

                        var dato_minutes;
                        var dato_hours;
                        if (noti.date !== undefined) {
                            dato_minutes = new Date(noti.date).getMinutes();
                            dato_hours = new Date(noti.date).getHours();
                            dato_time_string = dato_hours + ":" + dato_minutes;

                            var today_day = new Date().getDate();
                            var today_month = new Date().getMonth();
                            var today_year = new Date().getFullYear();
                            dato_day = new Date(noti.date).getDate();
                            dato_month = new Date(noti.date).getMonth();
                            dato_year = new Date(noti.date).getFullYear();
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
                            <li className="ntd-element-active" key={noti.id}>
                                <p className="ntd-element-h1">{noti.h1}</p>
                                <p className="ntd-element-p">{dato_string} - {noti.sender}</p>
                            </li>
                        );
                    })}
                </ul>
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