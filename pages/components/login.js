import * as React from 'react';
import { useState, useEffect } from 'react';
import { remLogin } from "../services/login";
import { setUserSession } from "../services/authService";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';
import Link from 'next/link'
 
function Login () {

    useEffect(() => {
        if (document.getElementById("loader")) {
            document.getElementById("loader").classList.add("display-not");
        }
    }, [])

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
        localStorage.setItem("fbLogin", JSON.stringify(event));

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
            window.open("/stage", "_self");
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="login-container" id="login-container">
                <form className="login-popup" onSubmit={loginHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => remLogin()} className="login-close" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
                    <div className="login-text">
                        <p className="login-text-h1">Log ind på din konto</p>
                    </div>
                    <p className="form-error">{message && <>{message}</>}{!message && <></>}</p>
                    <div className="login-form">
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
                        <p className="login-form-p">Email</p>
                        <input 
                        value={email} 
                        onChange={event => setEmail(event.target.value)} 
                        type="email" 
                        className="login-form-input" 
                        />
                        <p className="login-form-p">Kodeord</p>
                        <input 
                        value={kodeord} 
                        onChange={event => setKodeord(event.target.value)} 
                        type="password" 
                        className="login-form-input" 
                        />
                        <button value="Login" id="loginBTN" className="main-btn-login" style={{width: "100%"}} type="submit">{loading && <div className="loader" id="loader"></div>}{!loading && <>Log ind</>}</button>
                        <p className="login-form-label">Har du ikke en konto? <Link href="/signup" className="login-link"><a className="login-link">Opret konto</a></Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}
 
export default Login;