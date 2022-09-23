import { useState, useEffect } from 'react';
import { getUser, resetUserSession } from "../services/authService";
import jwtDecode from "jwt-decode";
import tlogo from './../img/logo-primary.png';

import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import logo from '../img/long-logo-primary.png';
import flag from '../img/danmark.png';
import england from '../img/england.png';
 
function StageHeader () {

    useEffect(() => {
        if (localStorage.getItem("aktive-spil-suspend") === "true") {
            document.getElementById("main-error").classList.add("display-flex");
            document.getElementById("main-error-p").innerHTML = "Dit aktive spil er suspenderet.";
        }
        if (localStorage.getItem("notifikationer")) {
            document.getElementById("notital").classList.add("display-flex");
            sestNotifikationer(localStorage.getItem("notifikationer"));
        } else {
            document.getElementById("notital").classList.remove("display-flex");
            sestNotifikationer("0");
        }

        window.addEventListener("scroll", function(){
            if (document.getElementById("nav-bar")) {
                var header = document.getElementById("nav-bar");
                header.classList.toggle("normalHeader", window.scrollY >0);
            }
            if (document.getElementById("nav-small-bar")) {
                var header2 = document.getElementById("nav-small-bar");
                header2.classList.toggle("sticky-small", window.scrollY > 250);
            }
        })
    }, [])
    const [auth, setAuth] = useState("");

    useEffect(() => {
        setAuth(getUser() ? getUser() : {});
    }, [])

    const [notifikationer, sestNotifikationer] = useState("");

    function logout() {
        resetUserSession();
        window.open("/", "_self");
    }

    function sideMenu() {
        document.getElementById("sidemenu").classList.add("display-flex");
    }

    function closeMenu() {
        document.getElementById("sidemenu").classList.remove("display-flex");
    }

    return (
        <>
            <div className="nav-bar-stage" id="nav-small-bar">
                <div className="nav-container-top-stage">
                    <div className="nav-flag-container">
                        <div className="nav-flag-section">
                            <Image width="32px" height="32px" src={flag} alt="Danmarks flag" className="nav-flag" onClick={() => {document.getElementById("userDropdownFlag").classList.toggle("display");}} />
                            <div className="user-dropdownFlag" id="userDropdownFlag">
                                <div className="user-elementFlag">
                                    <Image width="22px" height="22px" src={flag} alt="Danmark" className="user-flag-icon" />
                                    <p className="user-element-p">Dansk</p>
                                </div>
                                <div className="user-elementFlag">
                                    <Image width="22px" height="22px" src={england} alt="England" className="user-flag-icon" />
                                    <p className="user-element-p">Engelsk</p>
                                </div>
                            </div>
                        </div>
                        <div className="nav-search">
                            <Link href="/stage/search">
                                <div className="search-sc">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-short-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                    <p className="search-sc-p">Søg i hold, ligaer og lande</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <Link href="/stage">
                        <div className="inline-flex" style={{alignItems: "center"}}>
                            <div className="header-inline">
                                <Image width="35px" height="35px" src={tlogo} alt="Tipsspillet logo" className="footer-i" />
                                <p className="logo-erstat">Tipsspillet</p>
                            </div>
                            <Image width="150px" height="60px" src={logo} alt="Tipsspillet Logo" className="main-logo middle-logo" />
                        </div>
                    </Link>
                    <div className="nav-container-stage-right">
                        <div className="nav-profile">
                            <div className="nav-error" id="main-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-error-img" viewBox="0 0 16 16" id="errorIcon">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <p className="nav-error-p" id="main-error-p">Din konto er suspenderet.</p>
                                <Link href="#"><a className="nav-error-a">Find ud af hvorfor</a></Link>
                            </div>
                            <div className="nav-error">
                                <p className="nav-info-p">Alpha - V. 1.1.0</p>
                            </div>
                            <Link href="/stage/indstillinger">
                                <div className="nav-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                    </svg>
                                </div>
                            </Link>
                            <Link href="/stage/notifikationer">
                                <div className="nav-link">
                                    <div className="noti-icon" id="notital">{notifikationer}</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                    </svg>
                                </div>
                            </Link>
                            <div className="nav-profile-btn" onClick={() => {document.getElementById("userDropdown").classList.toggle("display"); document.getElementById("profileArrow").classList.toggle("deg180");}}>
                                <div className="nav-profile-pic">{auth !== "" && <>{(auth.username).slice(0,1)}</>}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" id="profileArrow" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                            <div className="user-dropdown" id="userDropdown">
                                <div className="user-info">
                                    <div className="user-logo-tem">
                                        {typeof window !== 'undefined' && <>
                                            {localStorage.getItem("fbLogin") && <Image layout="fill" src={"http://graph.facebook.com/"+ JSON.parse(localStorage.getItem("fbLogin")).id +"/picture?type=square"} />}
                                            {!localStorage.getItem("fbLogin") && <>{auth !== "" && <>{(auth.username).slice(0,1)}</>}</>}
                                        </>}
                                    </div>
                                    <div className="user-info-desc">
                                        <p className="user-name">{auth !== "" && <>{auth.username}</>}</p>
                                        <p className="user-email">{auth !== "" && <>{auth.email}</>}</p>
                                    </div>
                                </div>
                                <div className="user-divider"></div>
                                <Link href="/stage/indstillinger">
                                    <div className="user-element">
                                        <p className="user-element-p">Din profil</p>
                                    </div>
                                </Link>
                                <div className="user-element" onClick={() => logout()}>
                                    <p className="user-element-p">Log ud</p>
                                </div>
                            </div>
                            <div className="nav-icons">
                                <Link href="/stage/search">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </svg>
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-ham-ham" onClick={() => {sideMenu()}} viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                            </div>
                            <div className="sidemenu" id="sidemenu">
                                <div className="side-nav-container-top-stage">
                                    <div className="nav-flag-container">
                                        <div className="nav-flag-section">
                                            <Image width="32px" height="32px" src={flag} alt="Danmarks flag" className="nav-flag" onClick={() => {document.getElementById("userDropdownFlag").classList.toggle("display");}} />
                                            <div className="user-dropdownFlag" id="userDropdownFlag">
                                                <div className="user-elementFlag">
                                                    <Image width="22px" height="22px" src={flag} alt="Danmark" className="user-flag-icon" />
                                                    <p className="user-element-p">Dansk</p>
                                                </div>
                                                <div className="user-elementFlag">
                                                    <Image width="22px" height="22px" src={england} alt="England" className="user-flag-icon" />
                                                    <p className="user-element-p">Engelsk</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="nav-search">
                                            <Link href="/stage/search">
                                                <div className="search-sc">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="nav-short-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                                    </svg>
                                                    <p className="search-sc-p">Søg i hold, ligaer og lande</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link href="/stage">
                                        <div>
                                            <div className="ab-left">
                                                <Image width="150px" height="60px" src={logo} alt="Tipsspillet Logo" className="main-logo middle-logo" />
                                            </div>
                                            <div className="header-inline">
                                                <Image width="35px" height="35px" src={tlogo} alt="Tipsspillet logo" className="footer-i" />
                                                <p className="logo-erstat">Tipsspillet</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="nav-container-stage-right">
                                        <div className="nav-profile">
                                            <div className="nav-error" id="main-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="nav-error-img" viewBox="0 0 16 16" id="errorIcon">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                </svg>
                                                <p className="nav-error-p" id="main-error-p">Din konto er suspenderet.</p>
                                                <Link href="#"><a className="nav-error-a">Find ud af hvorfor</a></Link>
                                            </div>
                                            <div className="nav-error">
                                                <p className="nav-info-p">Alpha - V. 1.1.0</p>
                                            </div>
                                            <Link href="/stage/indstillinger">
                                                <div className="nav-link">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                                                    </svg>
                                                </div>
                                            </Link>
                                            <Link href="/stage/notifikationer">
                                                <div className="nav-link">
                                                    <div className="noti-icon" id="notital">{notifikationer}</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="bell-icon" viewBox="0 0 16 16">
                                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                                                    </svg>
                                                </div>
                                            </Link>
                                            <div className="nav-profile-btn" onClick={() => {document.getElementById("userDropdown").classList.toggle("display"); document.getElementById("profileArrow").classList.toggle("deg180");}}>
                                                <div className="nav-profile-pic"></div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="profile-icon" id="profileArrow" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                                </svg>
                                            </div>
                                            <div className="user-dropdown" id="userDropdown">
                                                <div className="user-info">
                                                    <div className="user-logo-tem">
                                                        {typeof window !== 'undefined' && <>
                                                            {localStorage.getItem("fbLogin") && <Image layout="fill" src={"http://graph.facebook.com/"+ JSON.parse(localStorage.getItem("fbLogin")).id +"/picture?type=square"} />}
                                                            {!localStorage.getItem("fbLogin") && <>{auth !== "" && <>{(auth.username).slice(0,1)}</>}</>}
                                                        </>}
                                                    </div>
                                                    <div className="user-info-desc">
                                                        <p className="user-name">{auth !== "" && <>{auth.username}</>}</p>
                                                        <p className="user-email">{auth !== "" && <>{auth.email}</>}</p>
                                                    </div>
                                                </div>
                                                <div className="user-divider"></div>
                                                <div className="user-element">
                                                    <p className="user-element-p">Din profil</p>
                                                </div>
                                                <div className="user-element" onClick={() => logout()}>
                                                    <p className="user-element-p">Log ud</p>
                                                </div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="sidemenu-ham" onClick={() => {closeMenu()}} viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="sidemenu-click" onClick={() => closeMenu()}></div>
                                <div className="sidemenu-fill">
                                    <Link href="/stage/search">
                                        <div className="sidemenu-search" onClick={() => {closeMenu();}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="sidemenu-icon" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                            </svg>
                                            <p className="sidemenu-h2">Søg i klubber, lande eller ligaer</p>
                                        </div>
                                    </Link>
                                    <div className="sidemenu-topmenu">
                                        <Link href="/stage/indstillinger">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                            </svg>
                                        </Link>
                                        <Link href="/stage/notifikationer">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                            </svg>
                                        </Link>
                                        <Link href="/stage/indstillinger">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => closeMenu()} className="sidemenu-topmenu-icon" viewBox="0 0 16 16">
                                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="sidemenu-div">
                                        <div className="sidemenu-element">
                                            <Link href="/stage"><a className="sidemenu-p" onClick={() => closeMenu()}>Lav kupon</a></Link>
                                            <Link href="/stage/gruppespil"><a className="sidemenu-p" onClick={() => closeMenu()}>Gruppespil</a></Link>
                                            <Link href="/priser"><a className="sidemenu-p" onClick={() => closeMenu()}>Abonnement</a></Link>
                                            <Link href="/stage/faq"><a className="sidemenu-p" onClick={() => closeMenu()}>Spørgsmål og svar</a></Link>
                                            <p onClick={() => logout()} className="sidemenu-p">Log ud</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-container-bottom" id="nav-bar">
                    <div className="nav-link-container">
                        <Link href="/stage/"><a className="nav-p-stage">Lav kupon</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/stage/gruppespil"><a className="nav-p-stage">Gruppespil</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/stage/faq"><a className="nav-p-stage">FAQ</a></Link>
                    </div>
                    <div className="nav-link-container">
                        <Link href="/priser"><a className="nav-p-stage">Abonnement</a></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default StageHeader;