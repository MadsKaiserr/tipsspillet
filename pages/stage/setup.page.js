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
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var GetRes = urlParams.get("rel");
        if (GetRes) {
            next("hold");
        } else {
            setFreemium(true);
        }
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
            for (var q in response.data.newGruppespil) {
                if (new Date(response.data.newGruppespil[q].varighed).getTime() > new Date().getTime()) {
                    newArray.push(response.data.newGruppespil[q])
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

    const [freemium, setFreemium] = useState(false);

    return (
        <>
            <Head>
                <title>Hurtig opsætning - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            {freemium && <div className="wc-container" id="wc-container">
                <div className="wc-wrapper">
                    <div className="wc-top">
                        <div className="wc-circles">
                            <div className="wc-cir1"><div className="wc-cir2"><div className="wc-cir3"></div></div></div>
                        </div>
                        <p className="wc-h1">Yayy! <span style={{color: "var(--primary)", fontWeight: "600"}}>Gratis</span> abonnement.</p>
                        <div className="wc-trans"></div>
                    </div>
                    <div className="wc-content">
                        <p className="wc-h2">Gratis Plus abonnement i hele Test-Perioden</p>
                        <p className="wc-h4" style={{paddingTop: "10px"}}>For at vise vores taknemlighed, vil vi udlodde gratis Plus abonnement til alle testere på Tipsspillet. Det vil sige du nu kan oprette egne gruppespil, se yderligere statistikker og meget mere!</p>
                        <p className="wc-h4" style={{paddingBottom: "15px"}}>Hvis du er interesseret i at støtte os, kan du opgradere til Premium på abonnement-siden.</p>
                    </div>
                    <button className="wc-btn" onClick={() => {setFreemium(false); cookie.set("freemium", "true")}}>Indløs</button>
                </div>
            </div>}
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
                            <div className="setup-search" style={{marginBottom: "10px"}}>
                                <input type="text" placeholder="Søg i gruppespil" className="setup-input" onChange={event => setGruppespilSearchStr(event.target.value)} />
                            </div>
                            <div className="td-wrapper">
                            <div className="td-modifier">
                                <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}}>
                                    <p className="td-modifier-p modifier-mod" id="td-navn">NAVN</p>
                                    <p className="td-modifier-p modifier-mod" id="td-synlighed">SYNLIGHED</p>
                                    <p className="td-modifier-p modifier-mod" id="td-spillere">SPILLERE</p>
                                    <p className="td-modifier-p modifier-mod" id="td-admin">ADMINISTRATOR</p>
                                </div>
                            </div>
                            <div className="match-loader display" id="stage-loader1"></div>
                            <ul className="td-table" style={{maxHeight: "400px", overflowY: "auto"}}>
                                {gruppespilsearch.map((item) => {
                                    var returnable = <li key={item.id} className="tl-element">
                                        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center"}} onClick={() => window.open("/gruppesession?game=" + item.id + "&res=setup", "_self")}>
                                            <div className="tl-wrapper" id="td-navn">
                                                <div className="tl-img">
                                                    {item.name.slice(0,1)}
                                                </div>
                                                <p className="td-modifier-p" style={{fontWeight: "500"}}>{item.name}</p>
                                            </div>
                                            <p className="td-modifier-p" id="td-synlighed">{item.synlighed}</p>
                                            <div className="tl-wrapper" id="td-spillere">
                                                <p className="td-modifier-p" style={{paddingLeft: "8px"}} id="td-spillere">{item.player_count}</p>
                                            </div>
                                            <p className="td-modifier-p" id="td-admin">{item.admin}</p>
                                        </div>
                                    </li>;
                                    return returnable;
                                })}
                            </ul>
                        </div>
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
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
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
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.id, item.name, item.logo_path, item.land, item.type)}}>
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
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.season_id, item.name, item.logo_path, item.land, item.type)}}>
                                                        <button id={"klub-" + item.season_id + item.type} className="setup-checkbox setup-checkbox-active">
                                                            <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.season_id + item.type} className="setup-icon display" viewBox="0 0 16 16">
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
                                                    <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.season_id, item.name, item.logo_path, item.land, item.type)}}>
                                                        <button id={"klub-" + item.season_id + item.type} className="setup-checkbox" >
                                                            <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.season_id + item.type} className="setup-icon" viewBox="0 0 16 16">
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
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.season_id, item.name, item.logo_path, item.land, item.type)}}>
                                                            <button id={"klub-" + item.season_id + item.type} className="setup-checkbox setup-checkbox-active">
                                                                <svg xmlns="http://www.w3.org/2000/svg" id={"icon-" + item.season_id + item.type} className="setup-icon display" viewBox="0 0 16 16">
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
                                                        <li key={item.name + item.logo_path} className="setup-hit" onClick={() => {addFavorite(item.season_id, item.name, item.logo_path, item.land, item.type)}}>
                                                            <button id={"klub-" + item.season_id + item.type} className="setup-checkbox" >
                                                                <svg xmlns="http://www.w3.org/2000/svg"  id={"icon-" + item.season_id + item.type} className="setup-icon" viewBox="0 0 16 16">
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