import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { resetUserSession, setUserSession } from "./services/authService";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import FacebookLogin from 'react-facebook-login';
import cookie from 'js-cookie'
import PrimaryLogo from './img/logo-primary.png';
import { Gradient } from './services/Gradient.js'
import { useRouter } from 'next/router'
 
function Signup () {
    const router = useRouter()

    const [message, setMessage] = useState("");

    const [box1, setBox1] = useState(false);
    const [box2, setBox2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    useEffect(() => {
        if (box1) {
            document.getElementById("box1").classList.add("signup-checked");
            document.getElementById("box1-icon").classList.add("display");
        } else {
            document.getElementById("box1").classList.remove("signup-checked");
            document.getElementById("box1-icon").classList.remove("display");
        }
    }, [box1])

    useEffect(() => {
        if (box2) {
            document.getElementById("box2").classList.add("signup-checked");
            document.getElementById("box2-icon").classList.add("display");
        } else {
            document.getElementById("box2").classList.remove("signup-checked");
            document.getElementById("box2-icon").classList.remove("display");
        }
    }, [box2])

    const [box3, setBox3] = useState(false);
    const [box4, setBox4] = useState(false);

    useEffect(() => {
        if (box3) {
            document.getElementById("box3").classList.add("signup-checked");
            document.getElementById("box3-icon").classList.add("display");
        } else {
            document.getElementById("box3").classList.remove("signup-checked");
            document.getElementById("box3-icon").classList.remove("display");
        }
    }, [box3])

    useEffect(() => {
        if (box4) {
            document.getElementById("box4").classList.add("signup-checked");
            document.getElementById("box4-icon").classList.add("display");
        } else {
            document.getElementById("box4").classList.remove("signup-checked");
            document.getElementById("box4-icon").classList.remove("display");
        }
    }, [box4])

    const [fornavn, setFornavn] = useState("");
    const [email, setEmail] = useState("");
    const [kodeord, setKodeord] = useState("");
    const [kodeordVali, setKodeordVali] = useState(false);
    const [username, setUsername] = useState("");
    const [fbEvent, setFbEvent] = useState("");
    const [fbEventLogo, setFbEventLogo] = useState(0);

    useEffect(() => {
        setMessage("");
    }, [fornavn, email, kodeord, username])

    useEffect(() => {
        if (kodeord.length >= 8) {
            document.getElementById("passTegn").className = "login-req-element-active";
        } else {
            document.getElementById("passTegn").className = "login-req-element";
        }

        var hasNumber = false;
        var hasUpper = false;
        var hasLower = false;
        for (var i = 0; i < kodeord.length; i++) {
            if (parseInt(kodeord[i]) === 0 || parseInt(kodeord[i]) === 1 || parseInt(kodeord[i]) === 2 || parseInt(kodeord[i]) === 3 || parseInt(kodeord[i]) === 4 || parseInt(kodeord[i]) === 5 || parseInt(kodeord[i]) === 6 || parseInt(kodeord[i]) === 7 || parseInt(kodeord[i]) === 8 || parseInt(kodeord[i]) === 9) {
                hasNumber = true;
            }
            if (kodeord[i] === kodeord[i].toUpperCase()) {
                hasUpper = true;
            }
            if (kodeord[i] === kodeord[i].toLowerCase()) {
                hasLower = true;
            }
        }

        if (hasUpper && hasLower) {
            document.getElementById("passBig").className = "login-req-element-active";
        } else {
            document.getElementById("passBig").className = "login-req-element";
        }

        if (hasNumber) {
            document.getElementById("passTal").className = "login-req-element-active";
        } else {
            document.getElementById("passTal").className = "login-req-element";
        }
        if (hasNumber && hasUpper && hasLower && kodeord.length >= 8) {
            setKodeordVali(true);
        } else {
            setKodeordVali(false);
        }
    }, [kodeord])

    useEffect(() => {
        const pass = document.getElementById("kodeord");
        pass.addEventListener('focusin', (event) => {
            if (document.getElementById("login-req")) {
                document.getElementById("login-req").classList.add("display-flex");
            }
        });
          
        pass.addEventListener('focusout', (event) => {
            if (document.getElementById("login-req")) {
                document.getElementById("login-req").classList.remove("display-flex");
            }
        });
    }, [])

    const signupURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/signup";

    const signupHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        var requestBody = {
            username: username,
            fornavn: fornavn,
            email: email.toLowerCase(),
            password: kodeord,
            rolle: "none",
            nyhedsbrev: false,
            type: "email"
        }

        if (box2) {
            requestBody.nyhedsbrev = true;
        }

        if (fornavn !== "" && username !== "" && email !== "") {
            if (!kodeordVali) {
                setMessage("Dit kodeord skal matche kravene")
                setLoading(false);
            } else {
                if (box1) {
                    axios.post(signupURL, requestBody, requestConfig).then(response => {
                        console.log("AWS - Opret konto:", response);
                        resetUserSession();
    
                        const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";
                        const loginConfig = {
                            headers: {
                                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                            }
                        }
                
                        const loginBody = {
                            email: email.toLowerCase(),
                            password: kodeord,
                            type: "email"
                        }
                
                        axios.post(loginURL, loginBody, loginConfig).then(response => {
                            console.log("AWS - Login:", response);
                            setUserSession(response.data.user, response.data.token);
                            document.getElementById("info1").classList.add("display-not");
                            document.getElementById("info2").classList.remove("display-not");
                            window.scrollTo(0, 0)
                        }).catch(error => {
                            console.log(error);
                            setMessage(error);
                            setLoading(false);
                        })
                    }).catch(error => {
                        if (error.response.status === 401 || error.response.status === 403) {
                            setMessage(error.response.data.message);
                            setLoading(false);
                        } else {
                            setMessage("Backend server is down")
                            setLoading(false);
                        }
                    })
                } else {
                    setMessage("For at oprette en konto kræver det du accepterer vores betingelser")
                    setLoading(false);
                }
            }
        } else {
            setMessage("Udfyld venligst alle felter");
            setLoading(false);
        }
    }

    const fbResponse = (event) => {
        if (event.name !== undefined && event.email !== undefined) {
            setFbEvent(JSON.stringify(event))
            setFbEventLogo(event.id);
            setMessage("");
            document.getElementById("loginForm").classList.add("display-not");
            document.getElementById("fbForm").classList.remove("display-not");
            setEmail(event.email);
            setFornavn(event.name);
        }
    }

    const fbSignupHandler = (event) => {
        event.preventDefault();

        const requestConfig = {
            headers: {
                "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
            }
        }

        var requestBody = {
            username: username,
            navn: fornavn,
            fb_logo_id: fbEventLogo,
            email: email.toLowerCase(),
            rolle: "none",
            nyhedsbrev: false,
            type: "facebook"
        }

        if (box4) {
            requestBody.nyhedsbrev = true;
        }

        if (username !== "") {
            if (box3) {
                axios.post(signupURL, requestBody, requestConfig).then(response => {
                    console.log("AWS - Opret konto:", response);
                    resetUserSession();

                    const loginURL = "https://1ponivn4w3.execute-api.eu-central-1.amazonaws.com/api/login";
                    const loginConfig = {
                        headers: {
                            "x-api-key": "utBfOHNWpj750kzjq0snL4gNN1SpPTxH8LdSLPmJ"
                        }
                    }
            
                    const loginBody = {
                        email: email.toLowerCase(),
                        type: "facebook"
                    }
            
                    axios.post(loginURL, loginBody, loginConfig).then(response => {
                        console.log("AWS - Login:", response);
                        cookie.set("fbLogin", fbEvent, {expires: 7})
                        setUserSession(response.data.user, response.data.token);
                        document.getElementById("info1").classList.add("display-not");
                        document.getElementById("info2").classList.remove("display-not");
                        window.scrollTo(0, 0)
                    }).catch(error => {
                        console.log(error);
                        setMessage(error);
                        setLoading2(false);
                    })
                }).catch(error => {
                    if (error.response.status === 401 || error.response.status === 403) {
                        setMessage(error.response.data.message);
                        setLoading2(false);
                        if (error.response.data.message === "Der er allerede oprettet en bruger med denne email") {
                            document.getElementById("loginForm").classList.remove("display-not");
                            document.getElementById("fbForm").classList.add("display-not");
                        }
                    } else {
                        setMessage("Backend server is down")
                        setLoading2(false);
                    }
                })
            } else {
                setMessage("For at oprette en konto kræver det du accepterer vores betingelser")
                setLoading2(false);
            }
        } else {
            setMessage("Udfyld venligst dit brugernavn");
            setLoading2(false);
        }
    }

    function access() {
        router.push("/signup/abonnement");
    }

    function setPriceActive(type) {
        document.getElementById("basic-btn").className = "login-form-btn";
        document.getElementById("plus-btn").className = "login-form-btn";
        document.getElementById("premium-btn").className = "login-form-btn";
        document.getElementById(type+"-btn").className = "login-form-btn-active";

        document.getElementById("basic-icon").classList.remove("display-not");
        document.getElementById("plus-icon").classList.remove("display-not");
        document.getElementById("premium-icon").classList.remove("display-not");
        document.getElementById("basic-check").classList.add("display-not");
        document.getElementById("plus-check").classList.add("display-not");
        document.getElementById("premium-check").classList.add("display-not");
        document.getElementById(type+"-icon").classList.add("display-not");
        document.getElementById(type+"-check").classList.remove("display-not");
    }

    useEffect(() => {
        const gradient = new Gradient()
        gradient.initGradient('#gradient-canvas')
    }, [])

    return (
        <>
            <Head>
                <title>Opret konto på Tipsspillet</title>
                <link rel="canonical" href="https://www.tipsspillet.dk/signup" />
                <meta name="description" content="Opret konto på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
                <meta name="author" content="Mads Kaiser" />
                <meta name="keywords" content="tipsspillet opret konto, opret konto,signup,tipsspillet signup,lav konto,konto,min konto" />
                <meta itemProp="name" content="Tipsspillet Opret Konto" />
                <meta itemProp="description" content="Opret konto på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
                <meta property="og:title" content="Opret konto - Tipsspillet" />
                <meta property="og:url" content="https://www.tipsspillet.dk/signup" />
                <meta property="og:description" content="Opret konto på Danmarks eneste gratis betting platform - Bet for virtuelle penge mod familie og venner." />
            </Head>
            <div className="route-thirds">
                <div className="signup-tilbage" onClick={() => window.open("/", "_SELF")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" fill="var(--black)" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                    </svg>
                    <p className="signup-tilbage-p">Tilbage til forsiden</p>
                </div>
                <div className="route-thirds-element-1" id="third">
                    <div className="signup-popup" id="info1">
                        {message !== "" && <p className="form-error">{message}</p>}
                        <div className="cg-info">
                            <h1 className="cg-h1">Opret din konto</h1>
                            <h2 className="cg-h2">Kom igang på Tipsspillet</h2>
                        </div>
                        <form onSubmit={signupHandler} className="cg-form" id="loginForm">
                            <input type="text" className="cg-input" onChange={event => setFornavn(event.target.value)} placeholder="Fulde navn" />
                            <input type="text" className="cg-input" onChange={event => setUsername(event.target.value)} placeholder="Brugernavn" />
                            <input type="text" className="cg-input" onChange={event => setEmail(event.target.value)} placeholder="Email" />
                            <div className="login-form-p">
                                <div className="login-req" id="login-req">
                                    <div className="login-req-element" id="passTegn">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        <p className="login-req-p">Mindst 8 tegn</p>
                                    </div>
                                    <div className="login-req-element" id="passTal">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        <p className="login-req-p">Mindst 1 tal</p>
                                    </div>
                                    <div className="login-req-element" id="passBig">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="login-req-check" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                        <p className="login-req-p">Mindst 1 stort og småt bogstav</p>
                                    </div>
                                </div>
                            </div>
                            <input className="cg-input" id="kodeord" type="password" onChange={event => setKodeord(event.target.value)} placeholder="Kodeord" />
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box1" onClick={() => {if (box1) {setBox1(false)}else{setBox1(true)}}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={"box1-icon"} className="setup-icon" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <p className="login-check-p">Jeg accepterer Tipsspillet&apos;s <Link href="/betingelser" className="login-form-dotted"><span className="login-form-dotted">brugsbetingelser</span></Link> og <Link href="/privatliv" className="login-form-dotted"><span className="login-form-dotted">privatlivspolitik</span></Link></p>
                            </div>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box2" onClick={() => {if (box2) {setBox2(false)}else{setBox2(true)}}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={"box2-icon"} className="setup-icon" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <p className="login-check-p">Jeg vil gerne modtage rabatkuponer, nyheder og tips til betting</p>
                            </div>
                            <div className="form-btn">
                                {message !== "" && <p className="form-error">{message}</p>}
                                <button value="Login" className="main-btn-login" style={{width: "100%", marginTop: "15px"}} type="submit">{loading && <div className="loader" id="loader"></div>}{!loading && <>Opret konto</>}</button>
                            </div>
                            <FacebookLogin
                                appId="1252645385555497"
                                autoLoad={false}
                                fields="name,email"
                                callback={fbResponse}
                                disableMobileRedirect={true}
                                version="2.5"
                                textButton="Opret konto med Facebook"
                                redirectUri="https://www.tipsspillet.dk/"
                                cssClass="facebook-button-class"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="facebook-icon" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>}
                            />
                        </form>
                        <form onSubmit={fbSignupHandler} className="login-form display-not" id="fbForm">
                            <input type="text" className="cg-input" onChange={event => setUsername(event.target.value)} placeholder="Brugernavn" />
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box3" onClick={() => {if (box3) {setBox3(false)}else{setBox3(true)}}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={"box3-icon"} className="setup-icon" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <p className="login-check-p">Jeg accepterer Tipsspillet&apos;s <Link href="/betingelser" className="login-form-dotted"><span className="login-form-dotted">brugsbetingelser</span></Link> og <Link href="/privatliv" className="login-form-dotted"><span className="login-form-dotted">privatlivspolitik</span></Link></p>
                            </div>
                            <div className="signup-check">
                                <div className="signup-checkbox" id="box4" onClick={() => {if (box4) {setBox4(false)}else{setBox4(true)}}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id={"box4-icon"} className="setup-icon" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                    </svg>
                                </div>
                                <p className="login-check-p">Jeg vil gerne modtage rabatkuponer, nyheder og tips til betting</p>
                            </div>
                            <div className="form-btn">
                                {message !== "" && <p className="form-error">{message}</p>}
                                <button value="Login" className="main-btn-login" style={{width: "100%"}} type="submit">{loading2 && <div className="loader" id="loader"></div>}{!loading2 && <>Opret konto med facebook</>}</button>
                            </div>
                        </form>
                    </div>
                    <div className="signup-popup display-not" id="info2">
                        <Link href="/"><Image className="signup-logo" alt="Tipsspillet logo" src={PrimaryLogo} height="55px" width="55px" /></Link>
                        <div className="login-text" style={{paddingTop: "30px"}}>
                            <h2 className="login-text-h1">Din konto er nu oprettet!&#128640;</h2>
                        </div>
                        <div className="login-form">
                            <p className="tak-p">Tak for du vil være med til at teste beta-versionen af Tipsspillet! Det betyder meget!</p>
                            <p className="tak-p">Da vi stadig er i beta-test, kan der forekomme fejl, mangler mm., og vi vil derfor være taknemmelige, hvis du kunne anmelde fejl, og komme med generel feedback, som kunne hjælpe os på vej til en fremtidigt lancering af hjemmesiden. Dette gøres på kommentar knappen nederst i højre hjørne på siden med kampe.</p>
                            <p className="tak-p">Flere ligaer, odds, funktioner mm. er på vej</p>
                            <button className="nav-btn-default" style={{marginLeft: "0px", marginTop: "5px"}} onClick={() => {access()}}>Fortsæt<div className="nav-in-before"></div><span className="nav-in">Begynd at spille</span></button>
                        </div>
                    </div>
                    <p className="footer-copyright" style={{position: "absolute", bottom: "5px", opacity: "0.3"}}>©2022 Alle rettigheder forbeholdes | Mads Kaiser</p>
                </div>
                <div className="route-thirds-element-2">
                    <canvas className="canvas-container-signup" id="gradient-canvas" data-transition-in></canvas>
                </div>
            </div>
        </>
    )
}
 
export default Signup;