import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { resetUserSession, setUserSession } from "./services/authService";
import Link from 'next/link'
import Head from 'next/head'
import Height from './components/height';
import Image from 'next/image'
import FacebookLogin from 'react-facebook-login';
import cookie from 'js-cookie'
import PrimaryLogo from './img/logo-primary.png';
import { Gradient } from './services/Gradient.js'
import { useRouter } from 'next/router'
 
function Login () {
    const router = useRouter()

    const [box1, setBox1] = useState(false);

    useEffect(() => {
        if (box1) {
            document.getElementById("box1").classList.add("signup-checked");
            document.getElementById("box1-icon").classList.add("display");
        } else {
            document.getElementById("box1").classList.remove("signup-checked");
            document.getElementById("box1-icon").classList.remove("display");
        }
    }, [box1])

    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";

    const loginHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        setMessage("");

        if(email.trim() === "" || kodeord.trim() === "") {
            setMessage("Udfyld alle felter");
            setLoading(false);
        } else {
            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody = {
                email: email,
                password: kodeord,
                type: "email"
            }
    
            axios.post(loginURL, requestBody, requestConfig).then(response => {
                console.log("AWS - Login:", response);
                setUserSession(response.data.user, response.data.token);
                window.open("/stage", "_self");
            }).catch(error => {
                console.log(error);
                setMessage("Forkert email eller kodeord");
                setLoading(false);
            })
        }
    }

    const fbResponse = (event) => {
        console.log(event);
        if (!event.status) {
            const requestConfig = {
                headers: {
                    "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                }
            }
    
            const requestBody = {
                email: event.email,
                type: "facebook"
            }
    
            axios.post(loginURL, requestBody, requestConfig).then(response => {
                console.log("AWS - Login:", response);
                setUserSession(response.data.user, response.data.token);
                cookie.set("fbLogin", JSON.stringify(event), {expires: 7})
                if (response.data.user.type === "facebook") {
                    if (!response.data.user.fb_logo_id) {
                        const loginURL2 = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/user";
                        const requestConfig2 = {
                            headers: {
                                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                            }
                        }
                
                        const requestBody2 = {
                            fb_logo_id: event.id,
                            name: event.name,
                            email: event.email
                        }
                
                        axios.patch(loginURL2, requestBody2, requestConfig2).then(response => {
                            console.log("AWS - Update user:", response);
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                }
                window.open("/stage", "_self");
            }).catch(error => {
                console.log(error);
                setMessage(error.response.data.message);
            })
        } else {
            setMessage("Serverfejl")
        }
    }

    return (
        <>
            <Head>
                <title>Log ind på Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/login" />
                <meta name="description" content="Log ind på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet log ind, log ind,login,tipsspillet login,lav konto,konto,min konto" />
                <meta itemProp="name" content="Tipsspillet Log Ind" />
                <meta itemProp="description" content="Log ind på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
                <meta property="og:title" content="Log ind - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/login" />
                <meta property="og:description" content="Log ind på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
            </Head>
            <div className="match-figure" style={{top: "0px"}}>
                <div className="info-figure1"></div>
                <div className="info-figure2"></div>
            </div>
            <div className="signup-container">
                <div className="signup-tilbage" onClick={() => window.open("/", "_SELF")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="var(--black)" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    <p className="signup-tilbage-p">Tilbage til forsiden</p>
                </div>
                <div className="signup-id">
                    <div><Image width="55px" height="55px" src={PrimaryLogo} alt="Tipsspillet Logo" className="main-logo" /></div>
                    <a className="signup-logo-h1">tipsspillet</a>
                </div>
                <div className="signup-section">
                    <div className="signup-popup" id="info1">
                        {message !== "" && <p className="form-error">{message}</p>}
                        <div className="cg-info">
                            <h1 className="login-h1">Log ind på din profil</h1>
                        </div>
                        <FacebookLogin
                            appId="1252645385555497"
                            autoLoad={false}
                            fields="name,email"
                            callback={fbResponse}
                            disableMobileRedirect={true}
                            version="2.5"
                            textButton="Log ind med Facebook"
                            redirectUri="https://www.tipsspillet.dk/"
                            cssClass="facebook-button-class"
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="facebook-icon" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>}
                        />
                        <p className="signup-eller">Eller</p>
                        <form onSubmit={loginHandler} className="cg-form" id="loginForm">
                            <input type="text" className="cg-input" onChange={event => setEmail(event.target.value)} placeholder="Email" />
                            <input className="cg-input" id="kodeord" type="password" onChange={event => setKodeord(event.target.value)} placeholder="Kodeord" />
                            <div className="signup-check" style={{marginTop: "0px"}} onClick={() => {if (box1) {setBox1(false)}else{setBox1(true)}}}>
                                <div className="signup-checkbox" id="box1">
                                    <svg xmlns="http://www.w3.org/2000/svg" id={"box1-icon"} className="setup-icon" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <p className="login-check-p">Husk denne enhed i 30 dage</p>
                            </div>
                            <div className="form-btn">
                                {message !== "" && <p className="form-error">{message}</p>}
                                <button value="Login" className="main-btn-login" style={{width: "100%", marginTop: "15px"}} type="submit">{loading && <div className="loader" id="loader"></div>}{!loading && <>Log ind</>}</button>
                            </div>
                            <p className="login-form-label">Har du ikke en konto? <Link href="/signup"><a className="login-link">Opret konto</a></Link></p>
                        </form>
                    </div>
                </div>
                <p className="footer-copyright" style={{position: "absolute", bottom: "5px", opacity: "0.5", width: "100%", left: "0"}}>©2022 Alle rettigheder forbeholdes | Mads Kaiser</p>
            </div>
        </>
    )
}
 
export default Login;