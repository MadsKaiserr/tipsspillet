import * as React from 'react';
import { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import Head from 'next/head'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import cookie from 'js-cookie'
import Height from '../components/heightLight';
import { getUser } from "../services/authService";
 
function StageIndstillinger ({data}) {

    const [ogusernameField, setogUsernameField] = useState("Indlæser...");
    const [ogemailField, setogEmailField] = useState("Indlæser...");
    const [ognavn, setogNavn] = useState("Indlæser...")

    const [message, setMessage] = useState("");

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [navn, setNavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [handlinger, setHandlinger] = useState([]);

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
                setogNavn(navn);
                setogUsernameField(usernameField);
                setMessage("Profiloplysninger opdateret!");
                setHandlinger(response.data.Item.Attributes.handlinger);
            }).catch(error => {
                console.log(error);
            })
        } else {
            setMessage("Det er mindre end 7 dage siden du sidst opdaterede dine oplysninger. Vent til " + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getDate() + "/" + (new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getMonth() + 1) + "/" + new Date(handlinger[handlinger.findIndex(obj => obj.type === "ProfilChange" && ((new Date().getTime() - obj.iat) / 1000 / 60 / 60 / 24) < 7)].iat + 1000 * 60 * 60 * 24 * 7).getFullYear() + " før du prøver igen.")
        }
    }

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <div className="op-container">
                <div className="op-top">
                    {nav === "generelt" && <><div className="op-top-element-active">
                        <div className="op-top-identifier">1</div>
                        <p className="op-top-p">Generelt</p>
                    </div>
                    <div className="op-top-element">
                        <div className="op-top-identifier">2</div>
                        <p className="op-top-p">Notifikationer</p>
                    </div>
                    <div className="op-top-element">
                        <div className="op-top-identifier">3</div>
                        <p className="op-top-p">Abonnement</p>
                    </div></>}
                </div>
                {nav === "generelt" && <div className="op-content">
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
                        <div className="op-form-element">
                            <p className="op-form-p">Kodeord</p>
                            <input type="password" value={"******"} disabled className="op-input" />
                        </div>
                    </div>
                </div>}
                {message !== "" && <p className="og-msg">{message}</p>}
                {edited && <button className="wc-btn" onClick={() => updateProfile()}>Opdater profil</button>}
                {!edited && <button className="wc-btn-off">Opdater profil</button>}
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