import * as React from 'react';
import { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import Head from 'next/head'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import Link from 'next/link'
import cookie from 'js-cookie'
import Height from '../components/heightLight';
import { getUser } from "../services/authService";
import { set } from 'nprogress';
 
function StageIndstillinger ({data}) {

    useEffect(() => {
        if (document.getElementById("loader1")) {
            document.getElementById("loader1").classList.add("display-not");
        }
        if (document.getElementById("loader2")) {
            document.getElementById("loader2").classList.add("display-not");
        }
        // window.addEventListener("scroll", function(){
        //     if (document.getElementById("price-input")) {
        //         document.getElementById("price-input").classList.toggle("price-fixed", window.scrollY > 305);
        //     }
        // })
    }, [])

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [plusPrice, setPlusPrice] = useState(29);
    const [premiumPrice, setPremiumPrice] = useState(39);
    const [abonnement, setAbonnement] = useState("none");
    const [rolleExp, setRolleExp] = useState(0);
    const [rolleIat, setRolleIat] = useState(0);

    const handlePlus = async e => {
        
    }

    const handlePremium = async e => {
        
    }

    const [ogusernameField, setogUsernameField] = useState("Indlæser...");
    const [ogemailField, setogEmailField] = useState("Indlæser...");
    const [ognavn, setogNavn] = useState("Indlæser...")

    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [navn, setNavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [handlinger, setHandlinger] = useState([]);
    const [progress, setProgress] = useState(0);
    const [dayProgress, setDayProgress] = useState(0);

    const [nav, setNav] = useState("generelt");

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favoritter")));
    }, []);

    useEffect(() => {
        setUser(JSON.stringify(data));
        setUsernameField(data["username"]);
        setEmailField(data["email"]);
        setNavn(data["navn"]);
        setogEmailField(data["email"]);
        setogNavn(data["navn"]);
        setogUsernameField(data["username"]);
        setHandlinger(data["handlinger"]);
        setNotiDyst(data.notifikationer.dyst);
        setNotiInvi(data.notifikationer.invi);
        setNotiKupon(data.notifikationer.kupon);
        setNotiDystOG(data.notifikationer.dyst);
        setNotiInviOG(data.notifikationer.invi);
        setNotiKuponOG(data.notifikationer.kupon);
        setRolleExp(data.rolle_exp * 1000);
        setRolleIat(data.rolle_iat * 1000);
        setAbonnement(getUser().rolle);
        setProgress(parseInt(((new Date().getTime() - (data.rolle_iat * 1000))/((data.rolle_exp*1000) - (data.rolle_iat*1000)))*100));
        setDayProgress(parseInt(((data.rolle_exp*1000)-new Date().getTime())/1000/60/60/24))
        if (data.type === "facebook") {
            setFacebook(true);
        }

        const year = new Date(data["oprettelse"]).getFullYear();
        const month = new Date(data["oprettelse"]).getMonth();
        const day = new Date(data["oprettelse"]).getDate();
        setOprettelseText(day + "/" + month + "/" + year);
    }, [])

    const fbResponse = (event) => {
        console.log(event);
        // cookie.set("fbLogin", JSON.stringify(event), {expires: 7})

        // const requestConfig = {
        //     headers: {
        //         "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        //     }
        // }

        // const requestBody = {
        //     email: event.email,
        //     type: "facebook"
        // }

        // axios.post(loginURL, requestBody, requestConfig).then(response => {
        //     console.log("AWS - Login:", response);
        //     setUserSession(response.data.user, response.data.token);
        //     if (response.data.user.type === "facebook") {
        //         if (!response.data.user.fb_logo_id) {
        //             const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user";
        //             const requestConfig2 = {
        //                 headers: {
        //                     "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
        //                 }
        //             }
            
        //             const requestBody2 = {
        //                 fb_logo_id: event.id,
        //                 name: event.name,
        //                 email: event.email
        //             }
            
        //             axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
        //                 console.log("AWS - Update user:", response);
        //             }).catch(error => {
        //                 console.log(error);
        //             })
        //         }
        //     }
        //     window.open("/stage", "_self");
        // }).catch(error => {
        //     console.log(error);
        // })
    }

    useEffect(() => {
        if ((usernameField !== ogusernameField) || (emailField !== ogemailField) || (navn !== ognavn)) {
            setEdited(true)
        } else {
            setEdited(false)
        }
    }, [usernameField, emailField, navn])

    const [edited, setEdited] = useState(false);

    function updateProfile() {
        setLoading(true);
        if (handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7) < 0) {
            const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/updateuser";
            const requestConfig2 = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody2 = {
                name: navn,
                email: getUser().email,
                username: usernameField,
                handlinger: handlinger
            }
    
            axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
                console.log("AWS - Update user:", response);
                setLoading(false);
                setogNavn(navn);
                setogUsernameField(usernameField);
                setMessage("Profiloplysninger opdateret!");
                setModal(true);
                setHandlinger(response.data.Item.Attributes.handlinger);
            }).catch(error => {
                console.log(error);
                setMessage("Der skete en fejl. Prøv igen senere, eller kontakt os");
                setLoading(false);
            })
        } else {
            setLoading(false);
            setMessage("Det er mindre end 7 dage siden du sidst opdaterede dine oplysninger. Vent til " + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getDate() + "/" + (new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getMonth() + 1) + "/" + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getFullYear() + " før du prøver igen.")
        }
    }

    const [editedNoti, setEditedNoti] = useState(false);

    const [notiDystOG, setNotiDystOG] = useState(false);
    const [notiKuponOG, setNotiKuponOG] = useState(false);
    const [notiInviOG, setNotiInviOG] = useState(false);
    const [notiDyst, setNotiDyst] = useState(false);
    const [notiKupon, setNotiKupon] = useState(false);
    const [notiInvi, setNotiInvi] = useState(false);

    useEffect(() => {
        if (notiDyst !== notiDystOG || notiKuponOG !== notiKupon || notiInviOG !== notiInvi) {
            setEditedNoti(true);
        } else {
            setEditedNoti(false);
        }
    }, [notiDyst, notiKupon, notiInvi])

    function updateNotifikationer() {
        setLoading(true);
        if (editedNoti) {
            const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/notifikationer";
            const requestConfig2 = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody2 = {
                email: getUser().email,
                notifikationer: {
                    "invi": notiInvi,
                    "kupon": notiKupon,
                    "dyst": notiDyst
                }
            }
    
            axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
                console.log("AWS - Update indstillinger:", response);
                setLoading(false);
                setNotiDystOG(notiDyst);
                setNotiInviOG(notiInvi);
                setNotiKuponOG(notiKupon);
                setMessage("Indstillinger opdateret!");
                setModal(true);
            }).catch(error => {
                console.log(error);
                setMessage("Der skete en fejl. Prøv igen senere, eller kontakt os");
                setLoading(false);
            })
        }
    }

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            {modal && <div className="modal-test">
                <div className="modal-con">
                    <p className="con-modal-p">Dine indstillinger blev opdateret</p>
                    <div className="modal-wrapper">
                        <button className="con-modal-btn" onClick={() => setModal(false)}>Okay</button>
                    </div>
                </div>
            </div>}
            <div className="op-container">
                <div className="is-top">
                    {nav === "generelt" && <><p className="is-top-p-active">Generelt</p>
                    <p className="is-top-p" onClick={() => setNav("notifikationer")}>Notifikationer</p>
                    <p className="is-top-p" onClick={() => setNav("abonnement")}>Abonnement</p></>}
                    {nav === "notifikationer" && <><p className="is-top-p" onClick={() => setNav("generelt")}>Generelt</p>
                    <p className="is-top-p-active">Notifikationer</p>
                    <p className="is-top-p" onClick={() => setNav("abonnement")}>Abonnement</p></>}
                    {nav === "abonnement" && <><p className="is-top-p" onClick={() => setNav("generelt")}>Generelt</p>
                    <p className="is-top-p" onClick={() => setNav("notifikationer")}>Notifikationer</p>
                    <p className="is-top-p-active">Abonnement</p></>}
                </div>
                {nav === "generelt" && <><div className="op-content">
                    <p className="op-h1">Generelt</p>
                    <p className="op-h2">Generelle brugerindstillinger</p>
                    <div className="op-form">
                        <div className="op-form-element">
                            <p className="op-form-p">Fulde navn</p>
                            <input type="text" value={navn} onChange={event => setNavn(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Brugernavn</p>
                            <input type="text" value={usernameField} onChange={event => setUsernameField(event.target.value)} className="op-input" />
                        </div>
                        <div className="op-form-element">
                            <p className="op-form-p">Email</p>
                            <input type="text" value={emailField} onChange={event => setEmailField(event.target.value)} className="op-input" />
                        </div>
                    </div>
                </div>
                {message !== "" && <p className="og-msg">{message}</p>}
                {edited && <button className="wc-btn" onClick={() => updateProfile()}>{loading && <div className="loader" id="loader"></div>}{!loading && <>Opdater profil</>}</button>}
                {!edited && <button className="wc-btn-off">Opdater profil</button>}
                </>}
                {nav === "notifikationer" && <><div className="op-content">
                    <p className="op-h1">Notifikationer</p>
                    <p className="op-h2">Indstillinger for notifikationer</p>
                    <div className="op-form">
                        {notiDyst && <div className="op-form-tick" onClick={() => setNotiDyst(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Præmiedyster</p>
                                <p className="op-form-by">Få besked hver gang vi offentliggør en ny præmiedyst</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiDyst && <div className="op-form-tick-off" onClick={() => setNotiDyst(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Præmiedyster</p>
                                <p className="op-form-by">Få besked hver gang vi offentliggør en ny præmiedyst</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {notiKupon && <div className="op-form-tick" onClick={() => setNotiKupon(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Kuponer</p>
                                <p className="op-form-by">Ved placering af kuponer, vundet og tabte kuponer</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiKupon && <div className="op-form-tick-off" onClick={() => setNotiKupon(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Kuponer</p>
                                <p className="op-form-by">Ved placering af kuponer, vundet og tabte kuponer</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {notiInvi && <div className="op-form-tick" onClick={() => setNotiInvi(false)}>
                            <div className="form-flex">
                                <p className="op-form-p">Invitationer</p>
                                <p className="op-form-by">Få besked om invitationer fra venner</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                        {!notiInvi && <div className="op-form-tick-off" onClick={() => setNotiInvi(true)}>
                            <div className="form-flex">
                                <p className="op-form-p">Invitationer</p>
                                <p className="op-form-by">Få besked om invitationer fra venner</p>
                            </div>
                            <div className="form-tick">
                                <div className="form-tick-btn"></div>
                            </div>
                        </div>}
                    </div>
                </div>
                {message !== "" && <p className="og-msg">{message}</p>}
                {editedNoti && <button className="wc-btn" style={{marginTop: "30px"}} onClick={() => updateNotifikationer()}>{loading && <div className="loader" id="loader"></div>}{!loading && <>Opdater indstillinger</>}</button>}
                {!editedNoti && <button className="wc-btn-off" style={{marginTop: "30px"}}>Opdater indstillinger</button>}
                </>}
                {nav === "abonnement" && <><div className="op-content" style={{maxWidth: "950px", minHeight: "750px"}}>
                    <p className="op-h1">Abonnement</p>
                    <p className="op-h2">Indstillinger for abonnement</p>
                    <div className="op-form">
                        <div className="is-section">
                            <p className="is-h1">{dayProgress} dage til næste betaling</p>
                            <div className="plan-progress">
                                <div className="plan-user" style={{width: progress + "%"}}></div>
                            </div>
                            <div className="plan-progress-id">
                                <p className="is-p">{new Date(rolleIat).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleIat).getMonth() + 1).toString().padStart(2, '0')}</p>
                                <p className="is-p">{new Date(rolleExp).getDate().toString().padStart(2, '0') + "/" + (new Date(rolleExp).getMonth() + 1).toString().padStart(2, '0')}</p>
                            </div>
                        </div>
                        <div className="st-plans-con">
                            <div className="st-plan-element">
                                <div className="st-plan-element-top">
                                    <div className="plan-prices">
                                        <p className="st-plan-element-prisp">kr</p>
                                        <p className="st-plan-element-pris">0</p>
                                        <p className="st-plan-element-prisp" style={{fontSize: "13px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ for evigt</p>
                                    </div>
                                    <h5 className="st-plan-element-identifier">Basic version</h5>
                                    <p className="st-plan-element-binding">Prøv dig ad med Basic abonnement helt gratis.</p>
                                </div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i 2 spil ad gangen</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Opret gruppespil i alle ligaer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Udvidet statistikker</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Ingen reklamer</p>
                                    </div>
                                </div>
                                {abonnement === "none" && <button className="square-btn-default plan-btn-off" style={{fontSize: "13px"}}>Nuværende</button>}
                                {abonnement !== "none" && <button className="square-btn-default plan-btn" style={{fontSize: "13px"}}>Nedgrader</button>}
                            </div>
                            <div className="st-plan-element">
                                <div className="st-plan-element-top">
                                    <div className="plan-prices">
                                        <p className="st-plan-element-prisp">kr</p>
                                        <p className="st-plan-element-pris">{plusPrice}</p>
                                        {plusPrice === 29 && <div className="st-plan-spar">Spar 25%</div>}
                                        {plusPrice === 19 && <div className="st-plan-spar">Spar 50%</div>}
                                        <p className="st-plan-element-prisp" style={{fontSize: "13px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ måned</p>
                                    </div>
                                    <h5 className="st-plan-element-identifier">Plus version</h5>
                                    <p className="st-plan-element-binding">Til fodboldentusiaster og administratorere af gruppespil.</p>
                                </div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i 5 spil ad gangen</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Opret private gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i præmieturneringer*</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Plus abonnement statistikker</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk-off">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Ingen reklamer</p>
                                    </div>
                                </div>
                                {abonnement === "none" && <button className="square-btn-default plan-btn" style={{fontSize: "13px"}} onClick={handlePlus}>{loading1 && <div className="loader" id="loader1"></div>}{!loading1 && <>Opgrader</>}</button>}
                                {abonnement === "premium" && <button className="square-btn-default plan-btn" style={{fontSize: "13px"}} onClick={handlePlus}>{loading1 && <div className="loader" id="loader1"></div>}{!loading1 && <>Nedgrader</>}</button>}
                                {abonnement === "plus" && <button className="square-btn-default plan-btn-off" style={{fontSize: "13px"}}>Nuværende</button>}
                            </div>
                            <div className="st-plan-element">
                                <div className="st-plan-element-top">
                                    <div className="plan-prices">
                                        <p className="st-plan-element-prisp">kr</p>
                                        <p className="st-plan-element-pris">{premiumPrice}</p>
                                        {premiumPrice === 39 && <div className="st-plan-spar">Spar 34%</div>}
                                        {premiumPrice === 29 && <div className="st-plan-spar">Spar 50%</div>}
                                        <p className="st-plan-element-prisp" style={{fontSize: "13px", width: "100%", opacity: "0.9", marginTop: "auto", marginBottom: "10px"}}>/ måned</p>
                                    </div>
                                    <h5 className="st-plan-element-identifier">Premium version</h5>
                                    <p className="st-plan-element-binding">Til bettingeksperter, dedikerede spillere og administratorere.</p>
                                </div>
                                <div className="plan-element-perks">
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i <span className="st-plan-element-perk-desc-active">uendelige</span> spil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i venners gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Opret <span className="st-plan-element-perk-desc-active">offentlige</span> og <span className="st-plan-element-perk-desc-active">private</span> gruppespil</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Deltag i <i><span className="st-plan-element-perk-desc-active">alle</span></i> præmieturneringer</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc"><span className="st-plan-element-perk-desc-active">Alle</span> udvidet statistikker</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Gratis betting tips</p>
                                    </div>
                                    <div className="plan-element-perk">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="st-plan-element-perk-icon" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                        </svg>
                                        <p className="st-plan-element-perk-desc">Ingen reklamer</p>
                                    </div>
                                </div>
                                {abonnement === "none" && <button className="square-btn-default plan-btn" style={{fontSize: "13px"}} onClick={handlePremium}>{loading2 && <div className="loader" id="loader1"></div>}{!loading1 && <>Opgrader</>}</button>}
                                {abonnement === "plus" && <button className="square-btn-default plan-btn" style={{fontSize: "13px"}} onClick={handlePremium}>{loading2 && <div className="loader" id="loader1"></div>}{!loading1 && <>Opgrader</>}</button>}
                                {abonnement === "premium" && <button className="square-btn-default plan-btn-off" style={{fontSize: "13px"}}>Nuværende</button>}
                            </div>
                        </div>
                    </div>
                </div>
                </>}
            </div>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
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
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const requestConfig = {
        headers: {
            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
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