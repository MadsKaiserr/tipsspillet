import * as React from 'react';
import { useState, useEffect } from 'react';
import FacebookLogin from 'react-facebook-login';
import Head from 'next/head'
import StageHeader from '../layout/stageheader';
import axios from "axios";
import cookie from 'js-cookie'
import Height from '../components/heightLight';
 
function StageIndstillinger ({data}) {

    const [user, setUser] = useState("");
    const [usernameField, setUsernameField] = useState("Indlæser...");
    const [emailField, setEmailField] = useState("Indlæser...");
    const [oprettelseText, setOprettelseText] = useState("Indlæser...");
    const [navn, setNavn] = useState("Indlæser...")
    const [facebook, setFacebook] = useState(false);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favoritter")));
    }, []);

    useEffect(() => {
        setUser(JSON.stringify(data));
        setUsernameField(data["username"]);
        setEmailField(data["email"]);
        setNavn(data["navn"]);
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

    const fbResponse = (event) => {
        console.log(event);
        // cookie.set("fbLogin", JSON.stringify(event))

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

    return (
        <>
            <Head>
                <title>Indstillinger - Tipsspillet</title>
                <meta name="robots" content="noindex" />
            </Head>
            <StageHeader />
            <Height />
            <div className="set">
                <div className="set-wrapper">
                    <h1 className="set-h1">Min profil</h1>
                    <h2 className="set-h2">Administrer din profil og konto</h2>
                    <p className="login-form-p" style={{paddingTop: "20px"}}>Fulde navn</p>
                    <input 
                        value={navn}
                        onChange={event => setNavn(event.target.value)} 
                        type="text" 
                        className="cg-input" 
                    />
                    <p className="login-form-p">Brugernavn</p>
                    <input 
                        value={usernameField}
                        onChange={event => setUsernameField(event.target.value)} 
                        type="text" 
                        className="cg-input" 
                    />
                    <p className="login-form-p">Email</p>
                    <input 
                        value={emailField}
                        onChange={event => setEmailField(event.target.value)} 
                        type="email" 
                        className="cg-input" 
                    />
                    <p className="login-form-p">Kodeord</p>
                    <input 
                        value={"********"}
                        type="password" 
                        className="cg-input" 
                        disabled
                    /><br />
                    <p className="login-form-p">Oprettet: <span style={{fontWeight: "300"}}>{oprettelseText}</span></p>
                    <button className="find-btn" style={{background: "var(--primary)"}}>Opdater profil</button>
                </div>
                <div className="set-wrapper" style={{paddingTop: "60px"}}>
                    <h1 className="set-h1">Indstillinger</h1>
                    <h2 className="set-h2">Notifikationer, konto mm.</h2>
                    {/* <FacebookLogin
                            appId="1252645385555497"
                            autoLoad={false}
                            fields="name,email"
                            callback={fbResponse}
                            disableMobileRedirect={true}
                            version="2.5"
                            textButton="Log ind med Facebook"
                            redirectUri="https://www.tipsspillet.dk/"
                            cssClass="facebook-button-class-active"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="facebook-icon" style={{fill: "#fff"}} viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>}
                    /> */}
                    <br /><button className="find-btn" style={{background: "var(--red)"}}>Slet profil</button>
                </div>
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