import * as React from 'react';
import { useState, useEffect } from 'react';
import { Router, useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import Bin from '../img/bin.png';
import Height from '../components/heightLight';
import Heart from '../img/heart.png';
 
function StageIndstillinger ({data}) {

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [fornavn, setFornavn] = useState("Indlæser...")
    const [efternavn, setEfternavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favoritter")));
    }, []);

    useEffect(() => {
        setUser(JSON.stringify(data));
        setUsernameField(data["username"]);
        setEmailField(data["email"]);
        setFornavn(data["fornavn"]);
        setEfternavn(data["efternavn"]);
        if (data.type === "facebook") {
            setFacebook(true);
        }

        const year = new Date(data["oprettelse"]).getFullYear();
        const month = new Date(data["oprettelse"]).getMonth();
        const day = new Date(data["oprettelse"]).getDate();
        setOprettelseText(day + "/" + month + "/" + year);
    }, [])

    function setNav(type) {
        if (type === "personlig") {
            document.getElementById("personlig").className = "set-nav-element-active";
            document.getElementById("notifikationer").className = "set-nav-element";
            document.getElementById("konto").className = "set-nav-element";
            document.getElementById("abonnement").className = "set-nav-element";

            document.getElementById("personlig-container").classList.remove("display-not");
            document.getElementById("notifikationer-container").classList.add("display-not");
            document.getElementById("konto-container").classList.add("display-not");
            document.getElementById("abonnement-container").classList.add("display-not");
        } else if (type === "notifikationer") {
            document.getElementById("personlig").className = "set-nav-element";
            document.getElementById("notifikationer").className = "set-nav-element-active";
            document.getElementById("konto").className = "set-nav-element";
            document.getElementById("abonnement").className = "set-nav-element";

            document.getElementById("personlig-container").classList.add("display-not");
            document.getElementById("notifikationer-container").classList.remove("display-not");
            document.getElementById("konto-container").classList.add("display-not");
            document.getElementById("abonnement-container").classList.add("display-not");
        } else if (type === "konto") {
            document.getElementById("personlig").className = "set-nav-element";
            document.getElementById("notifikationer").className = "set-nav-element";
            document.getElementById("konto").className = "set-nav-element-active";
            document.getElementById("abonnement").className = "set-nav-element";

            document.getElementById("personlig-container").classList.add("display-not");
            document.getElementById("notifikationer-container").classList.add("display-not");
            document.getElementById("konto-container").classList.remove("display-not");
            document.getElementById("abonnement-container").classList.add("display-not");
        } else if (type === "abonnement") {
            document.getElementById("personlig").className = "set-nav-element";
            document.getElementById("notifikationer").className = "set-nav-element";
            document.getElementById("konto").className = "set-nav-element";
            document.getElementById("abonnement").className = "set-nav-element-active";

            document.getElementById("personlig-container").classList.add("display-not");
            document.getElementById("notifikationer-container").classList.add("display-not");
            document.getElementById("konto-container").classList.add("display-not");
            document.getElementById("abonnement-container").classList.remove("display-not");
        }
    }

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="set">
                <h1 className="set-h1">Indstillinger</h1>
                <div className="set-nav">
                    <p className="set-nav-element-active" id="personlig" onClick={() => setNav("personlig")}>Personlig</p>
                    <p className="set-nav-element" id="notifikationer" onClick={() => setNav("notifikationer")}>Notifikationer</p>
                    <p className="set-nav-element" id="konto" onClick={() => setNav("konto")}>Konto</p>
                    <p className="set-nav-element" id="abonnement" onClick={() => setNav("abonnement")}>Abonnement</p>
                </div>
                <div className="set-wrapper">
                    <div className="set-element" id="personlig-container">
                        <div className="set-section">
                            <div className="set-section-left">
                                <p className="set-section-h1">Hold og ligaer du følger</p>
                                <p className="set-section-h2">Find hold over hele verden, og udvælg dine favoritter. Hold du følger vil komme op forrest i kampprogrammet, og ligaer ligeså.</p>
                            </div>
                            <div className="set-section-right">
                                <ul className="set-hits">
                                    {favorites.map((item) => {
                                        return (
                                            <li key={item.name + item.image} className="set-hit">
                                                <div className="setup-hit-wrapper">
                                                    <Image width="25px" height="25px" src={item.image} className="setup-img" />
                                                    <div className="setup-icon-div">
                                                        <Image width="12px" height="12px" src={Heart} />
                                                    </div>
                                                    <p className="setup-p">{item.name}</p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="set-element display-not" id="notifikationer-container">
                        <div className="set-section">
                            <div className="set-section-left">
                                <p className="set-section-h1">Notifikationer i gruppespil</p>
                                <p className="set-section-h2">Vælg hvad der skal blive vist under siden &quot;Notifikationer&quot;.</p>
                            </div>
                            <div className="set-section-right">
                                <ul className="set-noti">
                                    <li className="set-noti-li">
                                        <p className="set-noti-p">Ved indskydelse i interval</p>
                                        <div className="set-noti-li-input">
                                            <div className="set-noti-li-input-btn-active">Ja</div>
                                            <div className="set-noti-li-input-btn">Nej</div>
                                        </div>
                                    </li>
                                    <li className="set-noti-li">
                                        <p className="set-noti-p">Ved oprettelse af væddemål</p>
                                        <div className="set-noti-li-input">
                                            <div className="set-noti-li-input-btn-active">Ja</div>
                                            <div className="set-noti-li-input-btn">Nej</div>
                                        </div>
                                    </li>
                                    <li className="set-noti-li" style={{border: "0px"}}>
                                        <p className="set-noti-p">Ved vundet og tabte væddemål</p>
                                        <div className="set-noti-li-input">
                                            <div className="set-noti-li-input-btn-active">Ja</div>
                                            <div className="set-noti-li-input-btn">Nej</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="set-element display-not" id="konto-container">
                    </div>
                    <div className="set-element display-not" id="abonnement-container">
                        <div className="set-section">
                            <div className="set-section-left" style={{width: "100%"}}>
                                <p className="set-section-h1">Nuværende abonnement</p>
                                <p className="set-section-h2">Administrer dit abonnement, afbryd, sæt på pause eller opret nyt.</p>
                                <div className="set-payment">
                                    <div className="set-payment-element">
                                        <div className="set-payment-top">
                                            <div className="set-payment-top-left">
                                                <p className="set-payment-h1">Basic version</p>
                                                <p className="set-payment-h2">For evigt</p>
                                            </div>
                                            <div className="set-prices">
                                                <p className="set-element-prisp" style={{marginTop: "6.5px"}}>kr</p>
                                                <p className="set-element-pris">0</p>
                                                <p className="set-element-prisp" style={{fontSize: "11px", width: "100%", opacity: "0.9", marginTop: "11px"}}>/ for evigt</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="set-payment-element">
                                        <div className="set-payment-top">
                                            <div className="set-payment-top-left">
                                                <p className="set-payment-h1">Plus version</p>
                                                <div className="plan-spar" style={{marginTop: "40px", marginRight: "20px"}}>Spar 50%</div>
                                                <p className="set-payment-h2">Om måneden</p>
                                            </div>
                                            <div className="set-prices">
                                                <p className="set-element-prisp" style={{marginTop: "6.5px"}}>kr</p>
                                                <p className="set-element-pris">19</p>
                                                <p className="set-element-prisp" style={{fontSize: "11px", width: "100%", opacity: "0.9", marginTop: "11px"}}>/ måned</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="set-payment-element">
                                        <div className="set-payment-top">
                                            <div className="set-payment-top-left">
                                                <p className="set-payment-h1">Premium version</p>
                                                <div className="plan-spar" style={{marginTop: "40px", marginRight: "20px"}}>Spar 50%</div>
                                                <p className="set-payment-h2">Om måneden</p>
                                            </div>
                                            <div className="set-prices">
                                                <p className="set-element-prisp" style={{marginTop: "6.5px"}}>kr</p>
                                                <p className="set-element-pris">29</p>
                                                <p className="set-element-prisp" style={{fontSize: "11px", width: "100%", opacity: "0.9", marginTop: "11px"}}>/ måned</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/priser"><p className="faq-btn" style={{maxWidth: "200px", marginTop: "20px", animation: "none", opacity: "1"}}>Opgrader abonnement</p></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const requestConfig = {
        headers: {
            "x-api-key": process.env.AWS_API
        }
    }
    var resp;
    var data = {};
    if (req.cookies.email) {
        resp = await axios.get("https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user?user=" + req.cookies.email, requestConfig);
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
 
export default StageIndstillinger;